import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { z } from 'zod';
import { getPageMetadata } from '@/lib/actions/metadataActions';

const QuerySchema = z.object({
  postId: z.string().min(1),
  locale: z.enum(['en', 'ar']).optional().default('en'),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = QuerySchema.parse({
      postId: searchParams.get('postId'),
      locale: (searchParams.get('locale') as 'en' | 'ar') || 'en',
    });

    const post = await db.blogPost.findUnique({ where: { id: parsed.postId } });
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    // 1) Prefer post featured image
    if (post.featuredImage) {
      return NextResponse.json({ success: true, imageUrl: post.featuredImage });
    }

    // 2) Try DB metadata twitter/og image for the post path
    const slug = parsed.locale === 'ar' ? post.slugAr : post.slugEn;
    const pagePath = `/${parsed.locale}/blog/${slug}`;
    try {
      const meta = await getPageMetadata(pagePath);
      if (meta?.ogImage) {
        return NextResponse.json({ success: true, imageUrl: meta.ogImage });
      }
    } catch (error) {
      console.error('Metadata fetch error:', error);
      // ignore metadata fetch errors and continue to fallback
    }

    // 3) Fallback to site OG image
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dreamto.app';
    return NextResponse.json({ success: true, imageUrl: `${siteUrl}/og-image.png` });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}



