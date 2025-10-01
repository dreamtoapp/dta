'use server';

import { v2 as cloudinary } from 'cloudinary';
import { OptimizedImage, PaginatedResult } from '@/lib/cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Local type definition for Cloudinary resource
type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  [key: string]: any;
  tags?: string[];
};

// Helper function to get all available folders from Cloudinary for worksample
export async function getAllWorksampleFolders(baseFolder: string = 'website/workSample'): Promise<string[]> {
  try {
    // Validate configuration first
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    const cacheKey = `all_folders_${baseFolder}`;

    // 1) Prefer sub_folders to list immediate children reliably
    try {
      const sub = await cloudinary.api.sub_folders(baseFolder);
      const subfolders: Array<{ name: string; path: string }> = sub.folders || [];
      const names = subfolders
        .map((sf) => sf.path.replace(`${baseFolder}/`, ""))
        .filter((n) => n && !n.includes("/"));
      if (names.length > 0) {
        console.log("[WorksampleActions][AllFolders] sub_folders", { baseFolder, count: names.length });
        return Array.from(new Set(names)).sort();
      }
    } catch (e) {
      console.warn("[WorksampleActions][AllFolders] sub_folders failed, falling back to resources", {
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
      console.warn("[WorksampleActions][AllFolders] resources fallback failed", {
        baseFolder,
        error: (e as Error).message,
      });
    }

    return [];
  } catch (error) {
    console.error('[WorksampleActions][AllFolders] failed:', error);
    return [];
  }
}

// Fetch images by prefix including subfolders (first page only, Admin API → Search fallback)
export async function getWorksampleImagesByPrefix(
  prefixPath: string,
  max: number = 100
): Promise<OptimizedImage[]> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    const res: any = await cloudinary.api.resources({
      type: 'upload',
      prefix: prefixPath,
      max_results: Math.min(Math.max(max, 1), 500),
      resource_type: 'image',
    });
    let resources: CloudinaryResource[] = res.resources || [];

    if (!resources.length) {
      // First try folder:"prefix" which includes subfolders
      try {
        const search1: any = await cloudinary.search
          .expression(`folder:"${prefixPath}" AND resource_type:image`)
          .sort_by('created_at', 'desc')
          .max_results(Math.min(Math.max(max, 1), 500))
          .execute();
        resources = search1.resources || [];
      } catch { }

      // If still empty, try wildcard asset_folder:"prefix/*"
      if (!resources.length) {
        try {
          const search2: any = await cloudinary.search
            .expression(`asset_folder:"${prefixPath}/*" AND resource_type:image`)
            .sort_by('created_at', 'desc')
            .max_results(Math.min(Math.max(max, 1), 500))
            .execute();
          resources = search2.resources || [];
        } catch (se) {
          console.error('[WorksampleActions][ByPrefix][Search] failed', { prefixPath, error: (se as Error).message });
        }
      }
    }

    return resources.map((r) => ({
      public_id: r.public_id,
      optimized_url: cloudinary.url(r.public_id, { width: 400, crop: 'fill', quality: 'auto', fetch_format: 'auto' }),
      tags: r.tags || [],
    }));
  } catch (e) {
    console.error('[WorksampleActions][ByPrefix] failed', { prefixPath, error: (e as Error).message });
    return [];
  }
}

// Paginated images by prefix including subfolders (Admin API → Search fallback)
export async function getWorksampleImagesPaginated(
  prefixPath: string,
  cursor?: string,
  max: number = 24
): Promise<PaginatedResult<OptimizedImage>> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    let resources: CloudinaryResource[] = [];
    let nextCursor: string | null = null;

    try {
      const res: any = await cloudinary.api.resources({
        type: 'upload',
        prefix: prefixPath,
        max_results: Math.min(Math.max(max, 1), 500),
        resource_type: 'image',
        next_cursor: cursor,
      });
      resources = res.resources || [];
      nextCursor = res.next_cursor || null;
    } catch (e) {
      console.warn('[WorksampleActions][Paginated][Admin] failed, trying search', { prefixPath, error: (e as Error).message });

      try {
        const search: any = await cloudinary.search
          .expression(`folder:"${prefixPath}" AND resource_type:image`)
          .sort_by('created_at', 'desc')
          .max_results(Math.min(Math.max(max, 1), 500))
          .execute();
        resources = search.resources || [];
      } catch (se) {
        console.error('[WorksampleActions][Paginated][Search] failed', { prefixPath, error: (se as Error).message });
      }
    }

    const items: OptimizedImage[] = resources.map((r) => ({
      public_id: r.public_id,
      optimized_url: cloudinary.url(r.public_id, { width: 400, crop: 'fill', quality: 'auto', fetch_format: 'auto' }),
      tags: r.tags || [],
    }));

    return {
      items,
      nextCursor,
    };
  } catch (e) {
    console.error('[WorksampleActions][Paginated] failed', { prefixPath, error: (e as Error).message });
    return {
      items: [],
      nextCursor: null,
    };
  }
}

// Get images from a specific worksample folder
export async function getWorksampleImagesFromFolder(
  folderPath: string,
  limit: number = 24
): Promise<OptimizedImage[]> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary configuration is missing');
    }

    const response = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: Math.min(Math.max(limit, 1), 500),
      resource_type: 'image',
    });

    const resources: CloudinaryResource[] = response.resources || [];

    return resources.map((resource) => ({
      public_id: resource.public_id,
      optimized_url: cloudinary.url(resource.public_id, {
        width: 800,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      }),
      tags: resource.tags || [],
      width: resource.width,
      height: resource.height,
      alt: resource.context?.alt || '',
      blurDataURL: resource.context?.caption || '',
    }));
  } catch (error) {
    console.error('[WorksampleActions][FromFolder] failed:', error);
    return [];
  }
}
