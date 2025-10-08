import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/prisma';
import { twitterService } from '@/lib/twitter/twitter.service';

const BodySchema = z.object({
  postId: z.string().min(1),
  locale: z.enum(['en', 'ar']).optional().default('en'),
});

function clamp(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) : text;
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { postId, locale } = BodySchema.parse(json);

    const post = await db.blogPost.findUnique({
      where: { id: postId },
      include: { category: true },
    });

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    if (post.status !== 'PUBLISHED') {
      return NextResponse.json({ success: false, error: 'Only published posts can be tweeted' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dreamto.app';
    const slug = locale === 'ar' ? post.slugAr : post.slugEn;
    const url = `${siteUrl}/${locale}/blog/${encodeURIComponent(slug)}`;

    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;

    // Professional hashtag formatting - handle hyphens and spaces properly
    const hashtags = (post.tags || []).slice(0, 3).map(t => {
      // Remove spaces AND hyphens, convert to lowercase for hashtag format
      const cleanTag = t.replace(/[\s-]+/g, '').toLowerCase();
      return `#${cleanTag}`;
    }).join(' ');

    // Build professional tweet content
    const baseText = title?.trim() || '';
    const extra = excerpt?.trim() || '';
    let text = baseText;

    // Add excerpt with proper separator
    if (extra) {
      const sep = text ? ' — ' : '';
      text = `${text}${sep}${extra}`;
    }

    // Calculate available space for content (200 - URL length - hashtags - spacing)
    const urlLength = url.length; // Use actual URL length, not estimated
    const hashtagLength = hashtags.length;
    const spacing = hashtags ? 4 : 2; // Newlines for spacing
    const availableSpace = 200 - urlLength - hashtagLength - spacing; // Reduced to 200 for safety

    // Truncate content to fit
    const truncatedText = clamp(text, availableSpace);

    // Professional formatting: content + hashtags + URL
    const tweetContent = hashtags
      ? `${truncatedText}\n\n${hashtags}\n\n${url}`
      : `${truncatedText}\n\n${url}`;

    console.log('Tweet content length:', tweetContent.length);
    console.log('Tweet content preview:', tweetContent.substring(0, 100) + '...');

    // Final validation - ensure tweet doesn't exceed 280 characters
    if (tweetContent.length > 280) {
      console.error('Tweet content exceeds 280 characters:', tweetContent.length);
      return NextResponse.json({
        success: false,
        error: `Tweet content exceeds 280 character limit (${tweetContent.length} characters)`
      }, { status: 400 });
    }

    // Skip media for now to test text-only posting
    let mediaIds: string[] = [];
    console.log('Skipping media upload for testing - posting text-only');

    const result = await twitterService.postTweet(tweetContent, mediaIds);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to post tweet' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { tweetId: result.data?.id, url, locale } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload', details: error.flatten() }, { status: 400 });
    }
    console.error('post-blog error', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}


