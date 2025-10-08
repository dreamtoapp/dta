"use client";

import React from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export interface WorkItem {
  public_id: string;
  secure_url?: string;
  fullUrl?: string;
  url?: string;
  width?: number;
  height?: number;
  folder?: string;
  context?: {
    alt?: string;
    caption?: string;
  };
}

interface WorkCardProps {
  item: WorkItem;
  priority?: boolean;
}

export default function WorkCard({ item, priority = false }: WorkCardProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const alt = item.context?.alt || `Work sample ${item.public_id}`;
  const caption = item.context?.caption || '';

  // Prioritize fullUrl, then secure_url, then url - filter out empty strings
  const initialSrc = (item.fullUrl && item.fullUrl.trim()) ||
    (item.secure_url && item.secure_url.trim()) ||
    (item.url && item.url.trim());

  // Current src with fallback
  const [src, setSrc] = React.useState<string | undefined>(initialSrc);
  const isCloudinaryPublicId = false;

  // Validate required properties - skip if image source or dimensions are missing
  if (!src || !item.width || !item.height) {
    return null;
  }

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // Swap to local fallback image once if remote image fails
    if (src !== '/og-image.png') {
      setSrc('/og-image.png');
    }
    setIsLoading(false);
    console.error('[WorkCard] Image failed to load:', src);
  };

  return (
    <div className="group mb-4 break-inside-avoid rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-t-xl">
        {/* Skeleton placeholder while image loads */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="w-full h-full rounded-t-xl rounded-b-none" />
          </div>
        )}

        <Image
          src={src}
          alt={alt}
          width={item.width}
          height={item.height}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      {caption && (
        <div className="p-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{caption}</p>
        </div>
      )}
    </div>
  );
}

// Skeleton component that matches WorkCard structure
export function WorkCardSkeleton() {
  return (
    <div className="mb-4 break-inside-avoid rounded-xl border bg-card shadow-sm">
      <div className="relative overflow-hidden rounded-t-xl">
        {/* Image skeleton with varying heights for natural look */}
        <Skeleton className="w-full aspect-[4/3] rounded-t-xl rounded-b-none" />
      </div>
      <div className="p-3 space-y-2">
        {/* Caption skeleton - only show sometimes for variety */}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
