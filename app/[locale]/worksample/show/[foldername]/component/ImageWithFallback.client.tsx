"use client";

import Image from "next/image";
import { useState, useCallback, memo } from "react";
import Resize from "./Resize";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";

interface ImageType {
  public_id: string;
  optimized_url: string;
}

const ImageWithFallback = memo(function ImageWithFallback({ image }: { image: ImageType }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const t = useTranslations("gallery");

  const maxRetries = 2;

  const handleError = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setHasError(false);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [retryCount]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleReload = useCallback(() => {
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
  }, []);



  const imageKey = `${image.public_id}-${retryCount}`;

  return (
    <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <div className="relative w-full overflow-hidden image-container" style={{ aspectRatio: '4/3' }}>
        {hasError ? (
          <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-2xl">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{t("imageUnavailable")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("fallbackImage")}</p>
                <Button
                  onClick={handleReload}
                  size="sm"
                  variant="outline"
                  className="group/btn bg-background/50 backdrop-blur-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2 group-hover/btn:rotate-180 transition-transform duration-500" />
                  {t("reloadImage")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Enhanced Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm z-10 rounded-2xl">
                <div className="relative">
                  <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-t-primary/40 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }} />
                </div>
              </div>
            )}

            <Image
              src={image.optimized_url}
              alt={image.public_id}
              width={400}
              height={300}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={handleError}
              onLoad={handleLoad}
              key={imageKey}
              priority={false}
              style={{ aspectRatio: '4/3' }}
            />
          </>
        )}

        {/* Maximize Button Only */}
        <div className="absolute top-3 right-3">
          <Resize image={image.optimized_url} />
        </div>


      </div>

      {/* Image Info (Optional - can be shown on hover) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
        <div className="text-xs text-muted-foreground truncate">
          {image.public_id.split('/').pop()}
        </div>
      </div>
    </Card>
  );
});

export default ImageWithFallback;
