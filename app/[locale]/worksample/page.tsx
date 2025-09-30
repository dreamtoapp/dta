import React from 'react';
import { getAllFolders } from '@/lib/cloudinary';
import { AlertCircle } from 'lucide-react';
import GalleryClient from '@/components/worksample/GalleryClient';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const baseFolder = 'website/workSample';

  let hasCloudinaryError = false;
  let folders: string[] = [];
  let debugArray: any[] = [];
  try {
    folders = await getAllFolders(baseFolder);
    // Debug: call our all-images API and log simplified array { folder, url }
    try {
      const protocol = process.env.VERCEL ? 'https' : 'http';
      const host = process.env.VERCEL_URL || 'localhost:3000';
      const apiUrl = `${protocol}://${host}/api/cloudinary/all-images?folder=${encodeURIComponent(baseFolder)}&cap=1500`;
      const res = await fetch(apiUrl, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : [];
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
        debugArray = items.map((it: any) => ({
          ...it,
          // Optimized Cloudinary URL: auto format/quality + cover fill + sensible width and DPR
          fullUrl: cloudName
            ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:eco,c_fill,w_640,dpr_auto/${encodeURIComponent(it.public_id)}`
            : it.url,
        }));

      } else {
        console.log('[WorkSample][AllImagesAPI] HTTP', res.status);
      }
    } catch (e) {
      console.log('[WorkSample][AllImagesAPI] failed', (e as Error).message);
    }
  } catch (e) {
    hasCloudinaryError = true;
    folders = [];
    debugArray = [];
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {hasCloudinaryError && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-400">Cloudinary Not Configured</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">Gallery may be empty until Cloudinary is configured.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <GalleryClient
          baseFolder={baseFolder}
          initialItems={(debugArray || []).slice(0, 24) as any[]}
          allItems={debugArray as any[]}
          folders={folders}
          pageSize={24}
        />
      </div>
    </div>
  );
}
