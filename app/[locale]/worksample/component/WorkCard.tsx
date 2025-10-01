"use client";

import React from 'react';
import Image from 'next/image';

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
  const alt = item.context?.alt || `Work sample ${item.public_id}`;
  const caption = item.context?.caption || '';

  // Prioritize fullUrl, then secure_url, then url - filter out empty strings
  const imageSrc = (item.fullUrl && item.fullUrl.trim()) ||
    (item.secure_url && item.secure_url.trim()) ||
    (item.url && item.url.trim());

  // Validate required properties - skip if image source or dimensions are missing
  if (!imageSrc || !item.width || !item.height) {
    return null;
  }

  return (
    <div className="group mb-4 break-inside-avoid rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-t-xl">
        <Image
          src={imageSrc}
          alt={alt}
          width={item.width}
          height={item.height}
          priority={priority}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
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
