import { NextResponse } from 'next/server';
import { twitterService } from '@/lib/twitter/twitter.service';

export async function GET() {
  try {
    const result = await twitterService.verifyCredentials();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Twitter credentials verified successfully! Connected as @${result.username}`,
      username: result.username,
    });
  } catch (error) {
    console.error('Twitter Verification Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

