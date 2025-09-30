"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { WorkItem } from './WorkCard';
import GalleryClient from './GalleryClient';

interface FoldersClientProps {
  baseFolder: string;
  locale: string;
  initialItems: WorkItem[];
  pageSize?: number;
}

export default function FoldersClient({ baseFolder, locale, initialItems, pageSize = 24 }: FoldersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [folders, setFolders] = useState<string[]>([]);
  const [allItems, setAllItems] = useState<WorkItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Extract folders from items
  useEffect(() => {
    const folderSet = new Set<string>();
    initialItems.forEach(item => {
      if (item.folder) {
        const relativePath = item.folder.replace(`${baseFolder}/`, '');
        if (relativePath) {
          folderSet.add(relativePath);
        }
      }
    });
    setFolders(Array.from(folderSet).sort());
    setAllItems(initialItems);
  }, [initialItems, baseFolder]);

  const handleFolderChange = useCallback((folder: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (folder === 'all') {
      newSearchParams.delete('folder');
    } else {
      newSearchParams.set('folder', folder);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  return (
    <div className="w-full">
      <GalleryClient
        baseFolder={baseFolder}
        initialItems={initialItems}
        folders={folders}
        pageSize={pageSize}
        allItems={allItems}
      />
    </div>
  );
}
