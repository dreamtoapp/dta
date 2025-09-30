"use client";

import React from 'react';
import WorkCard, { WorkItem } from './WorkCard';

interface MasonryGridProps {
  items: WorkItem[];
  sentinelRef?: React.RefObject<HTMLDivElement | null>;
  skeletonCount?: number;
  showSkeletons?: boolean;
}

export default function MasonryGrid({ items, sentinelRef, skeletonCount = 8, showSkeletons = false }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {items.map((item, index) => (
        <WorkCard key={item.public_id} item={item} priority={index < 4} />
      ))}
      {showSkeletons && Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={`skeleton-${index}`} className="masonry-item skeleton">
          <div className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"></div>
        </div>
      ))}
      {sentinelRef && <div ref={sentinelRef} className="h-4" />}
    </div>
  );
}
