import { NextRequest, NextResponse } from 'next/server';
import { bulkUpsertPageMetadata, PageMetadataInput } from '@/lib/actions/metadataActions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items = (body?.items || []) as PageMetadataInput[];
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }
    const result = await bulkUpsertPageMetadata(items);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}


