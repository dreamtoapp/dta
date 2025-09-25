import { getImagesFromFolder, getAllFolders } from "@/lib/cloudinary";
import Resize from "./component/Resize";
import ImageWithFallback from "./component/ImageWithFallback.client";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  Grid3X3,
  List,
  Filter,
  Image as ImageIcon,
  ChevronRight,
  Home,
  FolderOpen
} from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "@/components/link";
import MotionDiv from "@/components/MotionDiv";

// Dynamic folder validation
type ValidFolder = string;

// Enhanced loading skeleton component
function ImageSkeleton() {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border-0 shadow-lg bg-card/50 backdrop-blur-sm animate-pulse">
      <div className="relative w-full">
        <Skeleton className="w-full h-[300px] rounded-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
      </div>
    </Card>
  );
}

// Fallback images for when Cloudinary is not configured
const getFallbackImages = (foldername: string) => {
  // Default fallback count for any folder
  const count = 8;

  return Array.from({ length: count }, (_, index) => ({
    public_id: `${foldername}_image_${index + 1}`,
    optimized_url: `https://via.placeholder.com/400x400/cccccc/666666?text=${foldername}+${index + 1}`,
    tags: []
  }));
};

// Generate metadata for the page
export async function generateMetadata({
  params
}: {
  params: Promise<{ foldername: string }>
}): Promise<Metadata> {
  const { foldername } = await params;
  const t = await getTranslations("gallery");

  const title = `${foldername.charAt(0).toUpperCase() + foldername.slice(1)} ${t("title")}`;
  const description = t("galleryDescription", { projectName: foldername });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// Enhanced gallery content component
async function GalleryContent({ foldername }: { foldername: string }) {
  const t = await getTranslations("gallery");
  const baseFolder = `website/workSample/${foldername}`;

  let images;
  let hasCloudinaryError = false;

  try {
    // Debug: Log base folder and env presence without exposing secrets
    console.log("[Cloudinary][Gallery] Fetching images", {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
      hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
      baseFolder,
    });
    images = await getImagesFromFolder(baseFolder);

    // If no images returned, it might be a configuration issue
    if (!images || images.length === 0) {
      hasCloudinaryError = true;
      images = getFallbackImages(foldername);
    }
  } catch (error) {
    hasCloudinaryError = true;
    console.error("[Cloudinary][Gallery] Error fetching images", {
      error: (error as Error).message,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      hasApiKey: Boolean(process.env.CLOUDINARY_API_KEY),
      hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
      baseFolder,
    });
    images = getFallbackImages(foldername);
  }

  return (
    <>
      {/* Enhanced Configuration Warning */}
      {hasCloudinaryError && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                    Cloudinary Not Configured
                  </h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-3">
                    Showing placeholder images. Please set up Cloudinary to see actual gallery images.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-yellow-500/70">
                    <FolderOpen className="w-3 h-3" />
                    <span>Debug: {baseFolder}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </MotionDiv>
      )}



      {/* Enhanced Gallery Grid with Masonry Layout */}
      <div className="flex justify-center">
        <div
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6"
          style={{
            columnGap: '1.5rem',
            columnFill: 'balance',
            maxWidth: '1400px',
            width: '100%'
          }}
        >
          {images.map((image, index) => (
            <MotionDiv
              key={`${image.public_id}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="break-inside-avoid mb-6 inline-block w-full"
            >
              <ImageWithFallback image={image} />
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {images.length === 0 && !hasCloudinaryError && (
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <Card className="max-w-md mx-auto p-8 border-dashed border-2 border-muted">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("noImages")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("noImagesDescription")}
            </p>
          </Card>
        </MotionDiv>
      )}
    </>
  );
}

// Main page component
export default async function Page({
  params
}: {
  params: Promise<{ foldername: string }>
}) {
  const { foldername } = await params;
  const t = await getTranslations("gallery");

  // Get all valid folders dynamically
  const validFolders = await getAllFolders("website/workSample");

  // Validate folder name and return 404 if invalid
  if (!validFolders.includes(foldername)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with Breadcrumbs */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link
                href="/ar"
                className="flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/ar/worksample"
              >
                Portfolio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium capitalize">
                {foldername}
              </span>
            </nav>

            {/* Back Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-background/50 backdrop-blur-sm border-border/50"
            >
              <Link href="/ar/worksample">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </MotionDiv>

        {/* Enhanced Page Title */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <FolderOpen className="w-3 h-3 mr-1" />
              {t("galleryCollection")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {foldername.charAt(0).toUpperCase() + foldername.slice(1)} {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("exploreCollection", { category: foldername })}
            </p>
          </div>
        </MotionDiv>

        {/* Gallery Content */}
        <Suspense fallback={
          <div className="flex justify-center">
            <div
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6"
              style={{
                columnGap: '1.5rem',
                columnFill: 'balance',
                maxWidth: '1400px',
                width: '100%'
              }}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="break-inside-avoid mb-6 inline-block w-full">
                  <ImageSkeleton />
                </div>
              ))}
            </div>
          </div>
        }>
          <GalleryContent foldername={foldername} />
        </Suspense>
      </div>
    </div>
  );
}


