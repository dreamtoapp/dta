import { NextResponse } from 'next/server';
import { getAllImagesFlat } from '@/lib/cloudinary';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  const cap = parseInt(searchParams.get('cap') || '600', 10);

  if (!folder) {
    return NextResponse.json({ error: 'Folder parameter is required' }, { status: 400 });
  }

  try {
    const items = await getAllImagesFlat(folder, cap);
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('[API][worksample][images] error', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
