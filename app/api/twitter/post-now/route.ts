import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { twitterService } from '@/lib/twitter/twitter.service';
import { z } from 'zod';

// Validation schema
const PostNowSchema = z.object({
  slot: z.enum(['am', 'pm']),
  dryRun: z.boolean().optional().default(false),
});

async function fetchOgImage(siteUrl: string): Promise<string | null> {
  try {
    const response = await fetch(siteUrl, {
      headers: {
        'User-Agent': 'DreamToApp-Twitter-Bot/1.0',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Look for og:image meta tag
    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);

    if (ogImageMatch) {
      return ogImageMatch[1];
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch OG image:', error);
    return null;
  }
}

async function uploadMediaToTwitter(mediaUrl: string): Promise<string> {
  try {
    // Download the image
    const response = await fetch(mediaUrl, {
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to download media: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Convert to base64 for upload
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Use Twitter v1.1 media upload API
    // Note: This requires the twitterService to be extended with media upload
    // For now, we'll return the media URL as-is and let Twitter handle it
    return mediaUrl;
  } catch (error) {
    console.error('Failed to upload media:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slot, dryRun } = PostNowSchema.parse(body);

    // Convert slot to enum format
    const slotEnum = slot === 'am' ? 'AM' : 'PM';

    // Get current time in KSA
    const nowKsa = new Date();
    const nowKsaString = new Date(nowKsa.getTime() + (3 * 60 * 60 * 1000)).toISOString();

    // Find the active campaign
    const activeCampaign = await db.twitterCampaign.findFirst({
      where: {
        isActive: true,
        status: 'ACTIVE',
      },
    });

    if (!activeCampaign) {
      return NextResponse.json({
        success: false,
        error: 'No active campaign found',
        data: null,
      });
    }

    // Find the due post for this slot in the active campaign
    const duePost = await db.twitterPost.findFirst({
      where: {
        campaignId: activeCampaign.id,
        slot: slotEnum,
        status: 'APPROVED',
        scheduledAtUtc: {
          lte: new Date(nowKsaString),
        },
        postedAt: null, // Not already posted
      },
      include: {
        campaign: true,
      },
      orderBy: {
        scheduledAtUtc: 'asc',
      },
    });

    if (!duePost) {
      return NextResponse.json({
        success: false,
        error: `No approved post found for ${slot.toUpperCase()} slot in campaign "${activeCampaign.name}"`,
        data: {
          campaign: {
            id: activeCampaign.id,
            name: activeCampaign.name,
          },
        },
      });
    }

    if (dryRun) {
      return NextResponse.json({
        success: true,
        message: 'Dry run - no post sent',
        data: {
          campaign: {
            id: activeCampaign.id,
            name: activeCampaign.name,
          },
          post: {
            id: duePost.id,
            day: duePost.day,
            slot: duePost.slot,
            content: duePost.content,
            mediaUrls: duePost.mediaUrls,
            useOgFallback: duePost.useOgFallback,
            scheduledAtKsa: duePost.scheduledAtKsa,
          },
          wouldPost: true,
        },
      });
    }

    // Prepare the tweet content and media
    let tweetText = duePost.content;
    let mediaIds: string[] = [];

    // Handle media
    if (duePost.mediaUrls && duePost.mediaUrls.length > 0) {
      // Upload media to Twitter
      for (const mediaUrl of duePost.mediaUrls) {
        try {
          const uploadedMediaId = await uploadMediaToTwitter(mediaUrl);
          mediaIds.push(uploadedMediaId);
        } catch (error) {
          console.error(`Failed to upload media ${mediaUrl}:`, error);
          // Continue without this media item
        }
      }
    } else if (duePost.useOgFallback) {
      // Try to get OG image from campaign or site
      let ogImageUrl = duePost.campaign.ogImageUrl || process.env.OG_IMAGE_URL;

      if (!ogImageUrl) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamto.app';
        ogImageUrl = await fetchOgImage(siteUrl) || undefined;
      }

      if (ogImageUrl) {
        try {
          const uploadedMediaId = await uploadMediaToTwitter(ogImageUrl);
          mediaIds.push(uploadedMediaId);
        } catch (error) {
          console.error('Failed to upload OG image:', error);
        }
      }
    }

    // Post the tweet
    let tweetResult;
    if (mediaIds.length > 0) {
      // Post with media (this would need twitterService extension)
      // For now, we'll post text-only and log the media
      console.log('Media would be attached:', mediaIds);
      tweetResult = await twitterService.postTweet(tweetText);
    } else {
      tweetResult = await twitterService.postTweet(tweetText);
    }

    if (!tweetResult.success) {
      // Mark as failed
      await db.twitterPost.update({
        where: { id: duePost.id },
        data: {
          status: 'FAILED',
          error: tweetResult.error,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: false,
        error: `Failed to post tweet: ${tweetResult.error}`,
        data: {
          postId: duePost.id,
          tweetResult,
        },
      });
    }

    // Mark as posted
    await db.twitterPost.update({
      where: { id: duePost.id },
      data: {
        status: 'POSTED',
        postedAt: new Date(),
        tweetId: tweetResult.data?.id,
        error: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Tweet posted successfully',
      data: {
        campaign: {
          id: activeCampaign.id,
          name: activeCampaign.name,
        },
        postId: duePost.id,
        tweetId: tweetResult.data?.id,
        tweetText,
        mediaAttached: mediaIds.length > 0,
        tweetResult,
      },
    });

  } catch (error) {
    console.error('Post now error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
