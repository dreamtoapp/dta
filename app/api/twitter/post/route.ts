import { NextRequest, NextResponse } from 'next/server';
import { twitterService } from '@/lib/twitter/twitter.service';
import { z } from 'zod';

// Validation schema for the request body
const PostTweetSchema = z.object({
  text: z.string().min(1).max(280),
  imageUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, imageUrl } = PostTweetSchema.parse(body);

    // Upload media if image URL is provided
    let mediaIds: string[] | undefined;
    if (imageUrl) {
      const mediaResult = await twitterService.uploadMedia(imageUrl);

      if (!mediaResult.success) {
        return NextResponse.json(
          { success: false, error: `Media upload failed: ${mediaResult.error}` },
          { status: 400 }
        );
      }

      mediaIds = [mediaResult.data!.media_id_string];
    }

    // Post tweet with optional media
    const result = await twitterService.postTweet(text, mediaIds);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      mediaUploaded: !!mediaIds,
    });
  } catch (error) {
    console.error('Twitter API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

