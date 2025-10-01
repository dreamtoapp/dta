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

  // Filter items by selected folder
  const filteredItems = useMemo(() => {
    if (!isPreloadedMode) return [];
    if (!selected) return allItems;
    // Filter by folder - match items where folder ends with the selected folder name
    return allItems.filter(item => {
      if (!item.folder) return false;
      const folderName = item.folder.split('/').pop() || item.folder;
      return folderName === selected;
    });
  }, [allItems, selected, isPreloadedMode]);

  const preloadedPages = useMemo(() => {
    if (!isPreloadedMode) return [];
    const pages = [];
    for (let i = 0; i < filteredItems.length; i += pageSize) {
      pages.push(filteredItems.slice(i, i + pageSize));
    }
    return pages;
  }, [filteredItems, pageSize, isPreloadedMode]);

  // Initialize selected folder from URL
  useEffect(() => {
    const folderFromUrl = searchParams.get('folder');
    if (folderFromUrl && folders.includes(folderFromUrl)) {
      setSelected(folderFromUrl);
    } else if (folders.length > 0) {
      // Default to first folder from backend
      setSelected(folders[0]);
    }
  }, [searchParams, folders]);

  // Handle folder change
  const onChangeFolder = useCallback((next: string) => {
    if (next === selected) return;

    setSelected(next);
    setPageIndex(0);

    if (isPreloadedMode) {
      // In preloaded mode, filtering happens via useMemo
      console.log('[GalleryClient] folder changed (preloaded)', { next });
    } else {
      // In dynamic mode, reset and fetch new data
      console.debug('[GalleryClient] folder changed (dynamic)', { next });
      setItems([]);
      setHasMore(true);
      setIsLoading(true);
    }

    // Update URL
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('folder', next);
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [selected, isPreloadedMode, searchParams, pathname, router]);

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

  // All folders for filters (no exclusions)
  const allFolders = useMemo(() => {
    return folders;
  }, [folders]);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6">
        <Filters folders={allFolders} value={selected} onChange={onChangeFolder} />
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
