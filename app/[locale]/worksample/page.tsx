import React from 'react';
import { Metadata } from 'next';
import { getDynamicMetadata } from '@/app/seo/metadata';
import { getAllWorksampleFolders } from './actions/worksampleActions';
import { AlertCircle } from 'lucide-react';
import GalleryClient from './component/GalleryClient';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/worksample', locale);
}

export default async function Page() {
  const baseFolder = 'website/workSample';

  let hasCloudinaryError = false;
  let folders: string[] = [];
  let debugArray: any[] = [];
  try {
    folders = await getAllWorksampleFolders(baseFolder);
    // Call all-images API
    try {
      const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://www.dreamto.app'
        : 'http://localhost:3000';
      const apiUrl = `${baseUrl}/api/cloudinary/all-images?folder=${encodeURIComponent(baseFolder)}&cap=1500`;
      const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : [];
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
        debugArray = items.map((it: any) => ({
          public_id: it.public_id,
          folder: it.folder,
          tags: it.tags || [],
          // Use width/height from API response, with sensible fallbacks
          width: it.width || 400,
          height: it.height || 300,
          // Optimized Cloudinary URL: auto format/quality + cover fill + sensible width and DPR
          fullUrl: cloudName
            ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:eco,c_fill,w_640,dpr_auto/${encodeURIComponent(it.public_id)}`
            : it.url,
          // Fallback URLs
          secure_url: it.secure_url || it.url,
          url: it.url,
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
