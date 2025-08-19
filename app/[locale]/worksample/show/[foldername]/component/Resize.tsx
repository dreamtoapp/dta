"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Expand,
  Download,
  ExternalLink,
  Maximize2,
  X,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Share2,
  Heart
} from "lucide-react";
import { useTranslations } from "next-intl";

function Resize({ image }: { image: string }) {
  const t = useTranslations("gallery");
  const [isLiked, setIsLiked] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => prev + 90);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gallery Image',
        url: image,
      });
    } else {
      navigator.clipboard.writeText(image);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'gallery-image.jpg';
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-background/90 backdrop-blur-sm hover:bg-background border border-border/20 p-3 rounded-full shadow-lg transition-all duration-300 group/btn hover:scale-110"
        >
          <Maximize2 className="w-4 h-4 text-foreground group-hover/btn:scale-110 transition-transform" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-black/95 border-0">
        <DialogTitle className="sr-only">
          {t("enlargedView")}
        </DialogTitle>
        <div className="relative w-full h-full">
          {/* Enhanced Header */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-0">
                <Expand className="w-3 h-3 mr-1" />
                {t("enlargedView")}
              </Badge>
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-xs">
                {Math.round(scale * 100)}%
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-lg p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-background/50"
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-background/50"
                  onClick={handleZoomIn}
                  disabled={scale >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={handleRotate}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t("rotate")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={handleReset}
              >
                {t("reset")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t("share")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                {t("download")}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={() => window.open(image, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("openInNewTab")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background"
                onClick={() => setIsLiked(prev => !prev)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Enhanced Image Container */}
          <div className="relative w-full h-[95vh] bg-black/95 flex items-center justify-center overflow-hidden image-container" style={{ aspectRatio: '4/3' }}>
            <div
              className="relative transition-all duration-300 ease-out"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                cursor: scale > 1 ? 'grab' : 'default'
              }}
            >
              <Image
                src={image}
                alt={t("enlargedView")}
                width={800}
                height={600}
                className="object-contain max-w-none"
                sizes="95vw"
                priority
                quality={95}
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {t("enlargedView")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("enlargedDescription")}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{t("useMouseWheel")}</span>
                  <span>•</span>
                  <span>{t("dragToPan")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 h-10 w-10 p-0 bg-background/90 backdrop-blur-sm hover:bg-background border-0 z-30"
            onClick={() => {
              const closeButton = document.querySelector('[data-radix-dialog-close]') as HTMLButtonElement;
              closeButton?.click();
            }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Resize;
