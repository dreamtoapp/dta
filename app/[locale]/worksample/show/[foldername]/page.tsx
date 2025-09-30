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
import GalleryClient from "../../component/GalleryClient";

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
  const count = 8;
  return Array.from({ length: count }, (_, index) => ({
    public_id: `${foldername}_image_${index + 1}`,
    optimized_url: `https://via.placeholder.com/400x400/cccccc/666666?text=${foldername}+${index + 1}`,
    tags: []
  }));
};

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
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

// Enhanced gallery content component
async function GalleryContent({ foldername }: { foldername: string }) {
  const t = await getTranslations("gallery");
  const baseFolder = `website/workSample/${foldername}`;

  let images;
  let hasCloudinaryError = false;

  try {
    images = await getImagesFromFolder(baseFolder);
    if (!images || images.length === 0) {
      hasCloudinaryError = true;
      images = getFallbackImages(foldername);
    }
  } catch (error) {
    hasCloudinaryError = true;
    images = getFallbackImages(foldername);
  }

  return (
    <>
      {hasCloudinaryError && (
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <Card className="border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Cloudinary Not Configured</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-3">Showing placeholder images. Please set up Cloudinary to see actual gallery images.</p>
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

      {/* Client gallery with infinite scroll & dropdown */}
      <GalleryClient
        baseFolder={baseFolder}
        initialItems={images.map(img => ({
          public_id: img.public_id,
          secure_url: img.optimized_url,
          width: 400,
          height: 400,
          folder: (img as any).folder,
          context: { alt: img.public_id }
        }))}
        folders={[]}
        currentFolderName={foldername}
      />
    </>
  );
}

export default async function Page({
  params
}: {
  params: Promise<{ foldername: string }>
}) {
  const { foldername } = await params;
  const t = await getTranslations("gallery");

  const validFolders = await getAllFolders("website/workSample");
  if (!validFolders.includes(foldername)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/ar" className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/ar/worksample">Portfolio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium capitalize">{foldername}</span>
            </nav>
            <Button asChild variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm border-border/50">
              <Link href="/ar/worksample">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-center mb-12">
          <div className="max-w-2xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
              <FolderOpen className="w-3 h-3 mr-1" />
              {t("galleryCollection")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {foldername.charAt(0).toUpperCase() + foldername.slice(1)} {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("exploreCollection", { category: foldername })}</p>
          </div>
        </MotionDiv>

        <Suspense fallback={
          <div className="flex justify-center">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6" style={{ columnGap: '1.5rem', columnFill: 'balance', maxWidth: '1400px', width: '100%' }}>
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


