"use client";

import React from 'react';
import WorkCard, { WorkItem } from './WorkCard';

interface MasonryGridProps {
  items: WorkItem[];
  sentinelRef?: (node: HTMLDivElement | null) => void;
  skeletonCount?: number;
  showSkeletons?: boolean;
}

export default function MasonryGrid({ items, sentinelRef, skeletonCount = 8, showSkeletons = false }: MasonryGridProps) {
  return (
    <div>
      <section aria-label="work samples" className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {items.map((item, index) => (
          <WorkCard key={item.public_id} item={item} priority={index < 4} />
        ))}
        {showSkeletons && (
          Array.from({ length: skeletonCount }).map((_, idx) => (
            <div key={`s-${idx}`} className="mb-4 break-inside-avoid rounded-xl border bg-card/50 shadow-sm animate-pulse h-[320px]" />
          ))
        )}
      </section>
      {/* Place sentinel OUTSIDE the columns container to ensure proper intersection */}
      <div ref={sentinelRef || undefined} className="h-10 w-full" />
    </div>
  );
}
