"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MasonryGrid from './MasonryGrid';
import Filters from './Filters';
import type { WorkItem } from './WorkCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GalleryClientProps {
  baseFolder: string;
  initialItems: WorkItem[];
  folders: string[];
  pageSize?: number;
  allItems?: WorkItem[]; // optional: when provided, enables preloaded array mode
  currentFolderName?: string; // optional: accepted by callers, not used internally
}

export default function GalleryClient({ baseFolder, initialItems, folders, pageSize = 24, allItems = [] }: GalleryClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State management
  const [pageIndex, setPageIndex] = useState(0);
  const [selected, setSelected] = useState<string>('');

  // Filter items by selected folder
  const filteredItems = useMemo(() => {
    if (!selected) return allItems;
    return allItems.filter(item => {
      if (!item.folder) return false;
      const folderName = item.folder.split('/').pop() || item.folder;
      return folderName === selected;
    });
  }, [allItems, selected]);

  // Paginate filtered items
  const paginatedItems = useMemo(() => {
    const pages = [];
    for (let i = 0; i < filteredItems.length; i += pageSize) {
      pages.push(filteredItems.slice(i, i + pageSize));
    }
    return pages;
  }, [filteredItems, pageSize]);

  // Initialize selected folder from URL
  useEffect(() => {
    const folderFromUrl = searchParams.get('folder');

    // Priority 1: Use folder from URL if it exists in folders array
    if (folderFromUrl && folders.includes(folderFromUrl)) {
      setSelected(folderFromUrl);
      return;
    }

    // Priority 2: If URL has folder but it's not in array yet, wait for folders to load
    if (folderFromUrl && folders.length === 0) {
      return; // Wait for folders to load
    }

    // Priority 3: Default to first folder only if no URL param
    if (!folderFromUrl && folders.length > 0 && !selected) {
      setSelected(folders[0]);
    }
  }, [searchParams, folders, selected]);

  // Handle folder change
  const onChangeFolder = useCallback((next: string) => {
    if (next === selected) return;

    setSelected(next);
    setPageIndex(0);

    // Update URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('folder', next);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [selected, searchParams, pathname, router]);

  // Debug logging
  React.useEffect(() => {
    console.log('[GalleryClient Debug]', {
      selected,
      allItemsCount: allItems.length,
      filteredItemsCount: filteredItems.length,
      paginatedPagesCount: paginatedItems.length,
      currentPageItems: (paginatedItems[pageIndex] || []).length,
      folders: folders.length,
    });
  }, [selected, allItems, filteredItems, paginatedItems, pageIndex, folders]);

  const currentPageItems = paginatedItems[pageIndex] || [];

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6">
        <Filters folders={folders} value={selected} onChange={onChangeFolder} />
      </div>

      {/* Gallery Grid */}
      {currentPageItems.length > 0 ? (
        <MasonryGrid items={currentPageItems} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground text-lg mb-2">No images found</p>
          <p className="text-sm text-muted-foreground">
            {selected ? `No images in "${selected}" folder` : 'Loading...'}
          </p>
        </div>
      )}
    </div>
  );
}
