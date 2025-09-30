"use client";

import React from 'react';
import Image from 'next/image';

export interface WorkItem {
  public_id: string;
  optimized_url: string;
  tags: string[];
  width?: number;
  height?: number;
  alt?: string;
  blurDataURL?: string;
}

interface WorkCardProps {
  item: WorkItem;
  priority?: boolean;
}

export default function WorkCard({ item, priority = false }: WorkCardProps) {
  const { optimized_url, alt, width, height, blurDataURL } = item;
  // Prefer fullUrl if provided from preloaded array; then optimized_url; then url
  const anyItem = item as any;
  const candidateSrc: string | undefined = anyItem.fullUrl || optimized_url || anyItem.url;
  if (!candidateSrc) return null;
  const fallbackBlur =
    blurDataURL ||
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZWVlIi8+PC9zdmc+';

  return (
    <article
      className="mb-4 break-inside-avoid rounded-xl border bg-card shadow-sm overflow-hidden"
      style={{ breakInside: 'avoid' as any }}
    >
      <div className="relative w-full group">
        <Image
          src={candidateSrc}
          alt={alt || item.public_id}
          width={width || 800}
          height={height || 1000}
          unoptimized
          placeholder={'blur'}
          blurDataURL={fallbackBlur}
          priority={priority}
          loading={priority ? 'eager' : undefined}
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </article>
  );
}
