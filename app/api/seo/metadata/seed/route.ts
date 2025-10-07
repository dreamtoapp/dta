import { NextRequest, NextResponse } from 'next/server';
import { bulkUpsertPageMetadata } from '@/lib/actions/metadataActions';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(_req: NextRequest) {
  try {
    const seedPath = path.join(process.cwd(), 'data', 'metadata.seed.json');
    const file = await readFile(seedPath, 'utf-8');
    const items = JSON.parse(file);
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Seed file is empty or invalid' }, { status: 400 });
    }
    const result = await bulkUpsertPageMetadata(items);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json({ success: true, count: items.length });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read seed file' }, { status: 500 });
  }
}


