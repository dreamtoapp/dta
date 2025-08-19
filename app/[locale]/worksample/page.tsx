import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from '@/components/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFoldersWithCoverImages } from '@/lib/cloudinary';
import { FolderOpen, Image as ImageIcon, ArrowRight, Eye, AlertCircle } from 'lucide-react';
import MotionDiv from '@/components/MotionDiv';

function getLastNode(folderName: string) {
  const parts = folderName.split("/");
  return parts[parts.length - 1];
}

// Fallback data for when Cloudinary is not configured
const fallbackFolders = [
  {
    folderName: "dreamToApp/workSample/flyer",
    coverImage: null,
    itemCount: 56,
    items: []
  },
  {
    folderName: "dreamToApp/workSample/coverage",
    coverImage: null,
    itemCount: 2,
    items: []
  },
  {
    folderName: "dreamToApp/workSample/cnc",
    coverImage: null,
    itemCount: 6,
    items: []
  },
  {
    folderName: "dreamToApp/workSample/character",
    coverImage: null,
    itemCount: 10,
    items: []
  }
];

export default async function Page() {
  const baseFolder = "dreamToApp/workSample";
  const locale = await getLocale();
  const t = await getTranslations("worksample");
  const t2 = await getTranslations("buttons");

  let folders;
  let hasCloudinaryError = false;

  try {
    folders = await getFoldersWithCoverImages(baseFolder);

    // If no folders returned, it might be a configuration issue
    if (!folders || folders.length === 0) {
      hasCloudinaryError = true;
      folders = fallbackFolders;
    }
  } catch (error) {
    console.error("Failed to load folders from Cloudinary:", error);
    hasCloudinaryError = true;
    folders = fallbackFolders;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Configuration Warning */}
      {hasCloudinaryError && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">
                  Cloudinary Not Configured
                </h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">
                  Please set up your Cloudinary environment variables to see actual images.
                  Check CLOUDINARY_SETUP.md for instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <ImageIcon className="w-4 h-4" />
            {t("portfolio")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("heroDescription")}
          </p>
        </MotionDiv>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder, index) => {
            const lastSegment = getLastNode(folder.folderName);
            const galleryUrl = `/${locale}/worksample/show/${lastSegment}`;

            return (
              <MotionDiv
                key={folder.folderName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden image-container" style={{ aspectRatio: '4/3' }}>
                    {folder.coverImage ? (
                      <Image
                        src={folder.coverImage.secure_url}
                        alt={t("coverImage", { folderName: folder.folderName })}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                        style={{ aspectRatio: '4/3' }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-muted">
                        <div className="text-center space-y-2">
                          <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">{t("noImage")}</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {folder.itemCount} {t("items")}
                      </Badge>
                    </div>

                    {/* View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary-foreground"
                      >
                        <Link href={galleryUrl}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t("viewGallery")}
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2 capitalize">
                      {lastSegment}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {t("projectDescription", { projectName: lastSegment })}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                    >
                      <Link href={galleryUrl}>
                        {t2("showMore")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
}
