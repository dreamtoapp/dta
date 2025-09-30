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
  const search = useSearchParams();
  const [items, setItems] = useState<WorkItem[]>(initialItems || []);
  const [isLoading, setIsLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const selected = (search?.get('folder') || 'all');
  const isPreloaded = Array.isArray(allItems) && (allItems?.length || 0) > 0;
  const [localCount, setLocalCount] = useState<number>(Math.max(pageSize, items.length || 0));

  // Pagination state
  const [pages, setPages] = useState<WorkItem[][]>(initialItems && initialItems.length ? [initialItems] : [[]]);
  const [pageIndex, setPageIndex] = useState<number>(0);

  // When using preloaded array, compute filtered set and manage local pagination
  const filteredAll: WorkItem[] = useMemo(() => {
    if (!isPreloaded) return [];
    if (selected === 'all') return allItems as WorkItem[];
    const targetFolder = `${baseFolder}/${selected}`;
    return (allItems as any[]).filter((it) => {
      // Prefer explicit folder field if present; fallback to public_id prefix
      const folder: string | undefined = (it as any).folder;
      if (folder) return folder === targetFolder || folder.startsWith(`${targetFolder}/`);
      const prefix = `${targetFolder}/`;
      return (it.public_id as string).startsWith(prefix);
    }) as WorkItem[];
  }, [isPreloaded, allItems, selected, baseFolder]);

  const fetchNext = useCallback(async () => {
    // Local pagination only using preloaded array
    if (isLoading) return;
    const totalPages = Math.ceil(filteredAll.length / pageSize) || 1;
    if (pageIndex >= totalPages - 1) { setNoMore(true); return; }
    setIsLoading(true);
    const nextIndex = pageIndex + 1;
    const start = nextIndex * pageSize;
    const end = Math.min(start + pageSize, filteredAll.length);
    const nextPageItems = filteredAll.slice(start, end);
    setPages(prev => {
      const clone = [...prev];
      clone[nextIndex] = nextPageItems;
      return clone;
    });
    setPageIndex(nextIndex);
    if (nextIndex >= totalPages - 1) setNoMore(true);
    setIsLoading(false);
  }, [filteredAll, isLoading, pageIndex, pageSize]);

  const goToPrevious = useCallback(() => {
    if (pageIndex <= 0 || isLoading) return;

    // Check if previous page exists and has data
    const prevIndex = pageIndex - 1;
    if (pages[prevIndex] && pages[prevIndex].length > 0) {
      setPageIndex(prevIndex);
    } else {
      // For preloaded mode, reconstruct the previous page
      if (isPreloaded) {
        const start = prevIndex * pageSize;
        const end = Math.min(start + pageSize, filteredAll.length);
        const prevPageItems = filteredAll.slice(start, end);
        if (prevPageItems.length > 0) {
          setPages(prev => {
            const clone = [...prev];
            clone[prevIndex] = prevPageItems;
            return clone;
          });
          setPageIndex(prevIndex);
        }
      }
    }
  }, [pageIndex, isLoading, pages, isPreloaded, pageSize, filteredAll]);

  // No intersection observer: pagination is manual via buttons

  useEffect(() => {
    // Preloaded mode only: reset and initialize pages/items
    setNoMore(false);
    setIsLoading(false);
    setItems([]);
    setPageIndex(0);
    const initial = Math.min(pageSize, filteredAll.length);
    setLocalCount(initial);
    setItems(filteredAll.slice(0, initial));
    const initialPages: WorkItem[][] = [];
    initialPages[0] = filteredAll.slice(0, initial);
    setPages(initialPages);
    if (initial >= filteredAll.length) setNoMore(true);
  }, [filteredAll, pageSize]);

  // Keep visible items in sync when localCount changes in preloaded mode
  useEffect(() => {
    if (!isPreloaded) return;
    setItems(filteredAll.slice(0, localCount));
  }, [isPreloaded, filteredAll, localCount]);

  const onChangeFolder = useCallback((next: string) => {
    // Preloaded mode only: update ?folder= param
    if (next === 'all') {
      console.log('[GalleryClient] select ALL (preloaded)');
    }
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('folder'); else url.searchParams.set('folder', next);
    const nextUrl = `${pathname}?${url.searchParams.toString()}`;
    console.debug('[GalleryClient] change folder (preloaded)', { next, nextUrl });
    router.push(nextUrl);
  }, [router, pathname]);

  const dropdownFolders = useMemo(() => folders, [folders]);

  return (
    <div>
      {dropdownFolders.length > 0 && (
        <Filters folders={dropdownFolders} value={selected} onChange={onChangeFolder} />
      )}
      {filteredAll.length === 0 && (
        <div className="mb-6 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          No items found for this filter.
          <button
            type="button"
            onClick={() => onChangeFolder('all')}
            className="ml-3 inline-flex items-center rounded-md border px-2 py-1 text-xs hover:bg-background"
          >
            Reset
          </button>
        </div>
      )}
      <MasonryGrid items={pages[pageIndex] || []} showSkeletons={isLoading} skeletonCount={12} />
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={pageIndex === 0 || isLoading}
          className="px-4 py-2 rounded border bg-background hover:bg-muted disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">Page {pageIndex + 1}</span>
        <button
          type="button"
          onClick={fetchNext}
          disabled={isLoading || (noMore && !(pages[pageIndex + 1] && pages[pageIndex + 1].length))}
          className="px-4 py-2 rounded border bg-background hover:bg-muted disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
