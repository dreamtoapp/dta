"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const [items, setItems] = useState<WorkItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length >= pageSize);
  const [pageIndex, setPageIndex] = useState(0);
  const [selected, setSelected] = useState<string>('');

  // Refs for intersection observer
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Preloaded mode: use allItems if provided
  const isPreloadedMode = allItems.length > 0;
  const preloadedPages = useMemo(() => {
    if (!isPreloadedMode) return [];
    const pages = [];
    for (let i = 0; i < allItems.length; i += pageSize) {
      pages.push(allItems.slice(i, i + pageSize));
    }
    return pages;
  }, [allItems, pageSize, isPreloadedMode]);

  // Initialize selected folder from URL
  useEffect(() => {
    const folderFromUrl = searchParams.get('folder');
    if (folderFromUrl && folders.includes(folderFromUrl)) {
      setSelected(folderFromUrl);
    } else if (folders.length > 0) {
      setSelected(folders[0]);
    }
  }, [searchParams, folders]);

  // Handle folder change
  const onChangeFolder = useCallback((next: string) => {
    if (next === selected) return;

    if (isPreloadedMode) {
      console.log('[GalleryClient] select ALL (preloaded)');
      setSelected('ALL');
      setItems(allItems);
      setPageIndex(0);
      setHasMore(false);
      return;
    }

    console.debug('[GalleryClient] change folder (preloaded)', { next });
    setSelected(next);
    setItems([]);
    setPageIndex(0);
    setHasMore(true);
    setIsLoading(true);

    // Update URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (next === 'ALL') {
      newSearchParams.delete('folder');
    } else {
      newSearchParams.set('folder', next);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [selected, isPreloadedMode, allItems, searchParams, pathname, router]);

  // Load more items
  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore || isPreloadedMode) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/worksample/images?folder=${selected}&page=${pageIndex + 1}&pageSize=${pageSize}`);
      const data = await response.json();

      if (data.success && data.items) {
        setItems(prev => [...prev, ...data.items]);
        setPageIndex(prev => prev + 1);
        setHasMore(data.items.length >= pageSize);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more items:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, isPreloadedMode, selected, pageIndex, pageSize]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (isPreloadedMode) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore, isPreloadedMode]);

  // Prepare folders for dropdown (exclude current folder)
  const dropdownFolders = useMemo(() => {
    return folders.filter(folder => folder !== selected);
  }, [folders, selected]);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6">
        <Filters folders={dropdownFolders} value={selected} onChange={onChangeFolder} />
      </div>

      {/* Gallery Grid */}
      <div className="w-full">
        {isPreloadedMode ? (
          // Preloaded mode: show specific page
          <MasonryGrid
            items={preloadedPages[pageIndex] || []}
            showSkeletons={false}
            skeletonCount={0}
          />
        ) : (
          // Dynamic loading mode
          <MasonryGrid
            items={items}
            sentinelRef={sentinelRef}
            showSkeletons={isLoading}
            skeletonCount={12}
          />
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && !isPreloadedMode && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* End of results */}
      {!hasMore && items.length > 0 && !isPreloadedMode && (
        <div className="text-center py-8 text-gray-500">
          تم عرض جميع العناصر
        </div>
      )}
    </div>
  );
}
