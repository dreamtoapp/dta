import { v2 as cloudinary } from "cloudinary";

// Validate environment variables
const requiredEnvVars = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Check if all required environment variables are present
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error("❌ Missing Cloudinary environment variables:", missingEnvVars);
  console.error("Please add the following to your .env.local file:");
  console.error("CLOUDINARY_CLOUD_NAME=your_cloud_name");
  console.error("CLOUDINARY_API_KEY=your_api_key");
  console.error("CLOUDINARY_API_SECRET=your_api_secret");
}

// Setup Cloudinary with a name, key, and secret so we can talk to Cloudinary's library
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "", // The name of our Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY || "", // A secret code that says, "We are allowed to use this account"
  api_secret: process.env.CLOUDINARY_API_SECRET || "", // Another secret code to keep it extra safe
});

// Cache for API responses to avoid repeated calls
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// This is the shape of the images we get from Cloudinary
type CloudinaryResource = {
  public_id: string; // The unique name for each image in Cloudinary
  secure_url: string; // The internet link (URL) for the image
  [key: string]: any;
  tags?: string[]; // Any extra info about the image that we might not know yet
};

// This is the shape of a folder, which has a name and a list of images inside
type Folder = {
  folderName: string; // The name of the folder
  items: CloudinaryResource[]; // A list of all the images in this folder
};

// This is a folder, but we also want to know about its cover image and how many items it has
type FolderWithCoverImage = {
  folderName: string; // The name of the folder
  coverImage: CloudinaryResource | null; // The special "cover" image for this folder or nothing (null) if there isn't one
  itemCount: number; // How many images are in the folder
  items: CloudinaryResource[]; // The list of images in the folder
};

// Helper function to get cached data or fetch from API
async function getCachedOrFetch<T>(key: string, fetchFunction: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const data = await fetchFunction();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Validate Cloudinary configuration before making API calls
function validateCloudinaryConfig() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary configuration is incomplete. Please check your environment variables.");
  }
}

// This function gets the details of folders and their cover images
export async function getFoldersWithCoverImages(
  baseFolder: string // The folder we want to look inside
): Promise<FolderWithCoverImage[]> {
  try {
    // Validate configuration first
    validateCloudinaryConfig();

    const cacheKey = `folders_${baseFolder}`;

    return await getCachedOrFetch(cacheKey, async () => {
      // Step 1: Ask Cloudinary for all the images inside the base folder
      const response = await cloudinary.api.resources({
        type: "upload", // We're asking for uploaded images
        prefix: baseFolder, // This tells Cloudinary to only look in this folder
        max_results: 500, // We want to get up to 500 images (but not more)
      });

      // Debug: basic stats (no secrets)
      const total = Array.isArray(response.resources) ? response.resources.length : 0;
      console.log("[Cloudinary][Folders] Admin resources fetched", {
        baseFolder,
        total,
        samplePublicId:
          total > 0 ? (response.resources[0] as any).public_id : undefined,
      });

      // Debug: List immediate subfolders to verify path
      try {
        const sub = await (cloudinary.api as any).sub_folders(baseFolder);
        const subCount = Array.isArray(sub.folders) ? sub.folders.length : 0;
        console.log("[Cloudinary][Folders] Subfolders", {
          baseFolder,
          subCount,
          sampleSub: subCount > 0 ? sub.folders[0]?.path : undefined,
        });
      } catch (e) {
        console.warn("[Cloudinary][Folders] sub_folders debug failed", {
          baseFolder,
          error: (e as Error).message,
        });
      }

      // Step 2: Put the images into groups based on their folder names
      let folders: Record<string, Folder> = {}; // An empty box to store folders

      if (total > 0) {
        (response.resources as CloudinaryResource[]).forEach(
          (item: CloudinaryResource) => {
            const folderName = item.public_id.split("/").slice(0, -1).join("/");
            if (!folders[folderName]) {
              folders[folderName] = { folderName, items: [] };
            }
            folders[folderName].items.push(item);
          }
        );
      } else {
        // Fallback path: enumerate subfolders and fetch first-page resources for each subfolder
        try {
          const sub = await (cloudinary.api as any).sub_folders(baseFolder);
          const subfolders: Array<{ name: string; path: string }> = sub.folders || [];
          console.log("[Cloudinary][Folders] Enumerating subfolders fallback", {
            baseFolder,
            subCount: subfolders.length,
          });

          for (const sf of subfolders) {
            try {
              const res = await cloudinary.api.resources({
                type: "upload",
                prefix: sf.path,
                max_results: 50,
              });
              const items = (res.resources as CloudinaryResource[]) || [];
              if (items.length > 0) {
                folders[sf.path] = { folderName: sf.path, items };
              } else {
                // Search API fallback: some accounts keep folder path separate from public_id
                try {
                  const search = await (cloudinary as any).search
                    .expression(`asset_folder="${sf.path}" AND resource_type:image`)
                    .sort_by("created_at", "desc")
                    .max_results(50)
                    .execute();
                  const sItems = (search.resources as CloudinaryResource[]) || [];
                  if (sItems.length > 0) {
                    folders[sf.path] = { folderName: sf.path, items: sItems };
                  } else {
                    folders[sf.path] = { folderName: sf.path, items: [] };
                  }
                } catch (se) {
                  console.warn("[Cloudinary][Search] Fallback search failed", {
                    path: sf.path,
                    error: (se as Error).message,
                  });
                  folders[sf.path] = { folderName: sf.path, items: [] };
                }
              }
            } catch (e) {
              console.warn("[Cloudinary][Folders] Failed to list resources for subfolder", {
                path: sf.path,
                error: (e as Error).message,
              });
              folders[sf.path] = { folderName: sf.path, items: [] };
            }
          }
        } catch (e) {
          console.warn("[Cloudinary][Folders] sub_folders fallback failed", {
            baseFolder,
            error: (e as Error).message,
          });
        }
      }

      // Step 3: Get all the images that are tagged as "cover"
      const taggedImagesResponse = await cloudinary.api.resources_by_tag("cover");
      const taggedImages = taggedImagesResponse.resources as CloudinaryResource[];

      // Debug: number of cover-tagged assets
      console.log("[Cloudinary][Folders] Cover-tagged assets", {
        baseFolder,
        count: Array.isArray(taggedImages) ? taggedImages.length : 0,
      });

      // Step 4: For each folder, find its cover image or use the first image as a backup
      const result = Object.values(folders).map((folder) => {
        const coverImage =
          taggedImages.find(
            (taggedItem) => taggedItem.public_id.startsWith(folder.folderName) // Look for a tagged "cover" image for this folder
          ) || folder.items[0]; // If there's no cover image, just use the first image in the folder

        // Return the folder details with its cover image, item count, and images
        return {
          folderName: folder.folderName, // The name of the folder
          coverImage: coverImage || null, // The cover image or null if there's no image
          itemCount: folder.items.length, // How many images are in the folder
          items: folder.items, // The list of images in the folder
        };
      });

      // Debug: summarize computed folders
      console.log("[Cloudinary][Folders] Computed folders", result.map((f) => ({
        folderName: f.folderName,
        itemCount: f.itemCount,
        hasCover: Boolean(f.coverImage),
      })));

      return result;
    });
  } catch (error) {
    // If something goes wrong, tell us in the logs and return an empty list
    console.error("Error fetching folder details:", error);
    console.error("This might be due to missing Cloudinary environment variables or API issues.");
    return [];
  }
}

// Helper function to get all available folders from Cloudinary
export async function getAllFolders(baseFolder: string): Promise<string[]> {
  try {
    // Validate configuration first
    validateCloudinaryConfig();

    const cacheKey = `all_folders_${baseFolder}`;

    return await getCachedOrFetch(cacheKey, async () => {
      // 1) Prefer sub_folders to list immediate children reliably
      try {
        const sub = await (cloudinary.api as any).sub_folders(baseFolder);
        const subfolders: Array<{ name: string; path: string }> = sub.folders || [];
        const names = subfolders
          .map((sf) => sf.path.replace(`${baseFolder}/`, ""))
          .filter((n) => n && !n.includes("/"));
        if (names.length > 0) {
          console.log("[Cloudinary][AllFolders] sub_folders", { baseFolder, count: names.length });
          return Array.from(new Set(names)).sort();
        }
      } catch (e) {
        console.warn("[Cloudinary][AllFolders] sub_folders failed, falling back to resources", {
          baseFolder,
          error: (e as Error).message,
        });
      }

      // 2) Fallback: derive folders from resources prefix (works when public_id includes folder path)
      try {
        const response = await cloudinary.api.resources({
          type: "upload",
          prefix: baseFolder,
          max_results: 1000,
        });
        const folders = new Set<string>();
        (response.resources as CloudinaryResource[]).forEach((item: CloudinaryResource) => {
          const folderPath = item.public_id.split("/").slice(0, -1).join("/");
          if (folderPath.startsWith(baseFolder)) {
            const folderName = folderPath.replace(`${baseFolder}/`, "");
            if (folderName && !folderName.includes("/")) {
              folders.add(folderName);
            }
          }
        });
        return Array.from(folders).sort();
      } catch (e) {
        console.warn("[Cloudinary][AllFolders] resources fallback failed", {
          baseFolder,
          error: (e as Error).message,
        });
        return [];
      }
    });
  } catch (error) {
    console.error("Error fetching folders from Cloudinary:", error);
    // Return fallback folders if Cloudinary fails
    return ['flyer', 'coverage', 'cnc', 'character'];
  }
}

// Define the type for the optimized image data you want to return
interface OptimizedImage {
  public_id: string;
  optimized_url: string;
  tags: string[];
}

// Optimized function to get images from a folder with better performance
export async function getImagesFromFolder(
  folderPath: string
): Promise<OptimizedImage[]> {
  try {
    // Validate configuration first
    validateCloudinaryConfig();

    const cacheKey = `images_${folderPath}`;

    return await getCachedOrFetch(cacheKey, async () => {
      // First try Admin API by prefix
      let validResources: CloudinaryResource[] = [];
      try {
        const response = await cloudinary.api.resources({
          type: "upload",
          prefix: folderPath,
          max_results: 100,
          resource_type: "image",
        });
        validResources = (response.resources as CloudinaryResource[]).filter(
          (resource) =>
            resource.public_id.startsWith(`${folderPath}/`) &&
            (resource.format === "jpg" || resource.format === "png" || resource.format === "jpeg" || resource.format === "webp") &&
            !resource.public_id.replace(`${folderPath}/`, "").includes("/")
        );
      } catch { }

      // If none, fall back to Search API by asset_folder
      if (validResources.length === 0) {
        try {
          const search = await (cloudinary as any).search
            .expression(`asset_folder="${folderPath}" AND resource_type:image`)
            .sort_by("created_at", "desc")
            .max_results(100)
            .execute();
          validResources = (search.resources as CloudinaryResource[]) || [];
        } catch (se) {
          console.warn("[Cloudinary][Search] getImagesFromFolder failed", {
            folderPath,
            error: (se as Error).message,
          });
        }
      }

      return validResources.map((resource) => ({
        public_id: resource.public_id,
        optimized_url: cloudinary.url(resource.public_id, {
          width: 400,
          crop: "fill",
          quality: "auto",
          fetch_format: "auto",
        }),
        tags: resource.tags || [],
      }));
    });
  } catch (error) {
    console.error("Cloudinary API Error:", {
      error: (error as Error).message,
      folderPath,
      envConfig: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY ? "***" : "missing",
      },
    });

    // Provide a more helpful error message
    if (error instanceof Error && error.message.includes("configuration")) {
      throw new Error("Cloudinary is not properly configured. Please check your environment variables.");
    }

    throw new Error(`Image loading failed: ${(error as Error).message}`);
  }
}

// Uploads a voice (audio) file to Cloudinary and returns the secure URL
export async function uploadVoiceToCloudinary(fileBuffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", // Cloudinary treats audio as video
        folder: "consultation-voices",
        public_id: filename,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary voice upload error:", error);
          reject(new Error("Voice upload failed"));
        } else if (result && result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
    stream.end(fileBuffer);
  });
}

// Uploads a job application attachment (CV/Portfolio) to Cloudinary and returns the secure URL
export async function uploadJobAttachment(fileBuffer: Buffer, filename: string, applicantName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a sanitized filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = filename.split('.').pop();
    const publicId = `job-applications/${sanitizedName}_${timestamp}.${fileExtension}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Let Cloudinary detect the file type
        folder: "dreamToApp/job-applications",
        public_id: publicId,
        overwrite: false, // Don't overwrite existing files
        tags: ["job-application", "attachment", sanitizedName],
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary job attachment upload error:", error);
          reject(new Error("File upload failed"));
        } else if (result && result.secure_url) {
          console.log("✅ Job attachment uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
    stream.end(fileBuffer);
  });
}

// Uploads an influencer avatar image to Cloudinary and returns the secure URL
export async function uploadInfluencerAvatar(fileBuffer: Buffer, filename: string, influencerName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a sanitized filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sanitizedName = influencerName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = filename.split('.').pop();
    const publicId = `influencers/avatars/${sanitizedName}_${timestamp}.${fileExtension}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "dreamToApp/influencers/avatars",
        public_id: publicId,
        overwrite: false, // Don't overwrite existing files
        tags: ["influencer", "avatar", sanitizedName],
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary influencer avatar upload error:", error);
          reject(new Error("Avatar upload failed"));
        } else if (result && result.secure_url) {
          console.log("✅ Influencer avatar uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
    stream.end(fileBuffer);
  });
}

// Uploads an influencer cover image to Cloudinary and returns the secure URL
export async function uploadInfluencerCoverImage(fileBuffer: Buffer, filename: string, influencerName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a sanitized filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sanitizedName = influencerName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = filename.split('.').pop();
    const publicId = `influencers/covers/${sanitizedName}_${timestamp}.${fileExtension}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "dreamToApp/influencers/covers",
        public_id: publicId,
        overwrite: false, // Don't overwrite existing files
        tags: ["influencer", "cover", sanitizedName],
        transformation: [
          { width: 1200, height: 600, crop: "fill" },
          { quality: "auto", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary influencer cover upload error:", error);
          reject(new Error("Cover image upload failed"));
        } else if (result && result.secure_url) {
          console.log("✅ Influencer cover image uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
    stream.end(fileBuffer);
  });
}

// Uploads a team member image to Cloudinary and returns the secure URL
export async function uploadTeamMemberImage(fileBuffer: Buffer, filename: string, teamMemberName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a sanitized filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const sanitizedName = teamMemberName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileExtension = filename.split('.').pop();
    const publicId = `team-members/${sanitizedName}_${timestamp}.${fileExtension}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "dreamToApp/team-members",
        public_id: publicId,
        overwrite: false, // Don't overwrite existing files
        tags: ["team-member", "employee", sanitizedName],
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary team member image upload error:", error);
          reject(new Error("Team member image upload failed"));
        } else if (result && result.secure_url) {
          console.log("✅ Team member image uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        } else {
          reject(new Error("No result from Cloudinary upload"));
        }
      }
    );
    stream.end(fileBuffer);
  });
}