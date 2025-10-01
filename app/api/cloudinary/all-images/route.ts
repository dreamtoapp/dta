import { NextResponse } from 'next/server';
import { getAllImagesFlat } from '@/lib/cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Ensure this API runs on Node (needed for Cloudinary Admin/Search SDK)
export const runtime = 'nodejs';
// Disable caching for accurate totals while iterating during debug
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function searchAll(prefix: string, cap: number) {
  const results: { public_id: string; optimized_url: string; folder?: string; tags?: string[]; width?: number; height?: number }[] = [];
  let cursor: string | undefined = undefined;
  while (results.length < cap) {
    let builder = (cloudinary as any).search
      .expression(`(folder:"${prefix}" OR asset_folder:"${prefix}/*") AND resource_type:image`)
      .sort_by('created_at', 'desc')
      .max_results(Math.min(100, cap - results.length));
    if (cursor) builder = builder.next_cursor(cursor);
    const page: any = await builder.execute();
    const resources: any[] = page.resources || [];
    if (!resources.length) {
      if (page.next_cursor) { cursor = page.next_cursor; continue; }
      break;
    }
    for (const r of resources) {
      results.push({
        public_id: r.public_id,
        optimized_url: cloudinary.url(r.public_id, { width: 400, crop: 'fill', quality: 'auto', fetch_format: 'auto' }),
        folder: r.asset_folder || (r.public_id?.split('/').slice(0, -1).join('/') || ''),
        tags: r.tags || [],
        width: r.width || 400,
        height: r.height || 300,
      });
    }
    cursor = page.next_cursor || undefined;
    if (!cursor) break;
  }
  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  const capParam = searchParams.get('cap') || '1200';
  const cap = Number.isNaN(Number(capParam)) ? 1200 : Math.max(1, Math.min(5000, parseInt(capParam, 10)));
  if (!folder) return NextResponse.json({ error: 'folder is required' }, { status: 400 });

  try {
    // First try existing helper (Admin/Search mix with dedupe)
    let items: Array<{ public_id: string; optimized_url: string; folder?: string; tags: string[]; width?: number; height?: number }>
      = (await getAllImagesFlat(folder, cap) as any).map((it: any) => ({
        public_id: it.public_id,
        optimized_url: it.optimized_url,
        folder: it.folder,
        tags: Array.isArray(it.tags) ? it.tags : [],
        width: it.width || 400,
        height: it.height || 300,
      }));
    if (!items || items.length === 0) {
      // Fallback to raw Search API loop
      const searchItems = await searchAll(folder, cap);
      items = searchItems.map((it: any) => ({
        public_id: it.public_id,
        optimized_url: it.optimized_url,
        folder: it.folder,
        tags: Array.isArray(it.tags) ? it.tags : [],
        width: it.width || 400,
        height: it.height || 300,
      }));
    }
    const simplified: Array<{ folder: string; url: string; public_id: string; tags: string[]; width?: number; height?: number }> = items.map((it) => ({
      folder: it.folder || (it.public_id?.split('/').slice(0, -1).join('/') || ''),
      url: it.optimized_url,
      public_id: it.public_id,
      tags: Array.isArray(it.tags) ? it.tags : [],
      width: (it as any).width || 400,
      height: (it as any).height || 300,
    }));
    return NextResponse.json({ count: simplified.length, items: simplified });
  } catch (e) {
    console.error('[API][cloudinary][all-images] error', e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}


