"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from '@/components/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface FolderItem {
  folderName: string;
  itemCount: number;
  coverImage?: { secure_url: string } | null;
}

interface FoldersClientProps {
  baseFolder: string; // website/workSample
  locale: string;
  initialItems: FolderItem[];
  pageSize?: number;
}

export default function FoldersClient({ baseFolder, locale, initialItems, pageSize = 24 }: FoldersClientProps) {
  const [items, setItems] = useState<FolderItem[]>(initialItems || []);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const { ref, inView } = useInView({ rootMargin: '800px', triggerOnce: false });

  const getLastNode = (folderName: string) => folderName.split('/').slice(-1)[0];

  const fetchNext = useCallback(async () => {
    if (isLoading || nextCursor === null) return;
    setIsLoading(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const params = new URLSearchParams({ base: baseFolder, limit: String(pageSize) });
      if (nextCursor) params.set('cursor', nextCursor);
      const res = await fetch(`/api/worksample/folders?${params.toString()}`, { signal: controller.signal });
      if (!res.ok) throw new Error('Failed');
      const { items: newItems, nextCursor: nc } = (await res.json()) as { items: FolderItem[]; nextCursor: string | null };
      // de-dup by folderName
      setItems(prev => {
        const seen = new Set(prev.map(i => i.folderName));
        const merged = [...prev];
        for (const it of newItems) if (!seen.has(it.folderName)) merged.push(it);
        return merged;
      });
      setNextCursor(nc);
    } catch { } finally {
      setIsLoading(false);
    }
  }, [baseFolder, pageSize, nextCursor, isLoading]);

  useEffect(() => {
    if (inView && nextCursor !== null) fetchNext();
  }, [inView, fetchNext, nextCursor]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const params = new URLSearchParams({ base: baseFolder, limit: String(pageSize) });
        const res = await fetch(`/api/worksample/folders?${params.toString()}`);
        if (!res.ok) return;
        const { nextCursor: nc } = (await res.json()) as { items: FolderItem[]; nextCursor: string | null };
        if (mounted) setNextCursor(nc);
      } catch { }
    })();
    return () => { mounted = false; abortRef.current?.abort(); };
  }, [baseFolder, pageSize]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((folder, index) => {
          const last = getLastNode(folder.folderName);
          const galleryUrl = `/${locale}/worksample/show/${last}`;
          return (
            <div key={folder.folderName}>
              <div className="group relative overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
                <div className="relative h-48 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  {folder.coverImage?.secure_url ? (
                    <Image
                      src={folder.coverImage.secure_url}
                      alt={last}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                      <div className="text-center space-y-2">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">No image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {folder.itemCount} items
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button asChild size="sm" className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary-foreground">
                      <Link href={galleryUrl}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold capitalize mb-2">{last}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={ref} className="h-8" />
      {isLoading && (
        <div className="py-6 text-center text-muted-foreground">Loading…</div>
      )}
    </div>
  );
}



