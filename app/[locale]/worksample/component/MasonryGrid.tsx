"use client";

import React from 'react';
import WorkCard, { WorkItem, WorkCardSkeleton } from './WorkCard';

interface MasonryGridProps {
  items: WorkItem[];
  skeletonCount?: number;
  showSkeletons?: boolean;
}

export default function MasonryGrid({ items, skeletonCount = 8, showSkeletons = false }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {items.map((item, index) => (
        <WorkCard key={item.public_id} item={item} priority={index < 12} />
      ))}
      {showSkeletons && Array.from({ length: skeletonCount }).map((_, index) => (
        <WorkCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
