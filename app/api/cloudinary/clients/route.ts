import { NextResponse } from 'next/server';

// Lists images from Cloudinary folder "clients" using the Search API via basic auth.
// Requires env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
export async function GET(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const urlObj = new URL(request.url);
    const debug = urlObj.searchParams.get('debug') === 'true';
    const folderParam = urlObj.searchParams.get('folder');

    if (!cloudName || !apiKey || !apiSecret) {
      const payload = { error: 'Cloudinary credentials missing', have: { cloudName: !!cloudName, apiKey: !!apiKey, apiSecret: !!apiSecret } };
      if (debug) console.error('[cloudinary/clients] env-missing', payload);
      return NextResponse.json(payload, { status: 500 });
    }

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    console.log('url', url);

    // Allow overriding folder via query/env; default to "website/clients"
    const folder = folderParam || process.env.CLOUDINARY_CLIENTS_FOLDER || 'website/clients';
    console.log('folder', folder);
    const body = {
      // Use folder equality (quoted) which matches Cloudinary console structure
      expression: `folder="${folder}" AND resource_type:image`,
      max_results: 20,
    } as const;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Cloudinary API is external; avoid caching in dev.
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      const payload = { error: 'Cloudinary search failed', status: res.status, statusText: res.statusText, request: { url, folder }, response: text };
      console.error('[cloudinary/clients] search-failed', payload);
      return NextResponse.json(payload, { status: 500 });
    }

    const data = await res.json();
    const items = (data.resources || []).map((r: any) => ({
      id: r.public_id,
      url: r.secure_url as string,
      width: r.width as number,
      height: r.height as number,
      format: r.format as string,
      folder: r.folder as string,
      publicId: r.public_id as string,
    }));

    const payload = { folder, count: items.length, items };
    if (debug) console.log('[cloudinary/clients] success', payload);
    return NextResponse.json(payload);
  } catch (err: any) {
    console.error('[cloudinary/clients] exception', err);
    return NextResponse.json({ error: err?.message || 'Unknown error', stack: err?.stack }, { status: 500 });
  }
}


