import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// Validation schemas
const ImportRequestSchema = z.object({
  sourceType: z.enum(['bundled', 'url']),
  source: z.string().min(1),
  campaignName: z.string().min(1),
  campaignDescription: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  totalDays: z.number().int().min(1).max(90).optional().default(45),
  amTime: z.string().optional().default("13:00"), // KSA time
  pmTime: z.string().optional().default("20:30"), // KSA time
  ogImageUrl: z.string().url().optional(),
});

const TwitterPostSchema = z.object({
  day: z.number().int().min(1).max(45),
  time: z.string(),
  target_audience: z.string(),
  content: z.string(),
  mediaUrls: z.array(z.string().url()).optional(),
  mediaAlt: z.string().optional(),
});

const TwitterPostsArraySchema = z.array(TwitterPostSchema);

// Allowed bundled files (security)
const ALLOWED_BUNDLED_FILES = [
  'twitter.json',
  'posts.json',
  'content.json',
];

function sanitizeFilePath(filePath: string): string {
  // Remove any path traversal attempts
  return filePath.replace(/\.\./g, '').replace(/\/+/g, '/').replace(/^\//, '');
}

function isAllowedBundledFile(filePath: string): boolean {
  const sanitized = sanitizeFilePath(filePath);
  const fileName = sanitized.split('/').pop() || '';
  return ALLOWED_BUNDLED_FILES.includes(fileName) && sanitized.startsWith('constant/');
}

async function fetchFromUrl(url: string): Promise<any> {
  if (!url.startsWith('https://')) {
    throw new Error('Only HTTPS URLs are allowed');
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'DreamToApp-Twitter-Import/1.0',
    },
    signal: AbortSignal.timeout(10000), // 10 second timeout
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();

  // Size limit: 1MB
  if (text.length > 1024 * 1024) {
    throw new Error('File too large (max 1MB)');
  }

  return JSON.parse(text);
}

function getBundledFile(filePath: string): any {
  const sanitized = sanitizeFilePath(filePath);

  if (!isAllowedBundledFile(sanitized)) {
    throw new Error(`File not allowed: ${filePath}`);
  }

  try {
    const fullPath = join(process.cwd(), sanitized);
    const content = readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read bundled file: ${error}`);
  }
}

function computeSchedule(startDate: string, day: number, slot: 'AM' | 'PM', amTime: string, pmTime: string) {
  const start = new Date(startDate + 'T00:00:00+03:00'); // KSA timezone
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + (day - 1));

  const isAM = slot === 'AM';
  const timeString = isAM ? amTime : pmTime;
  const [hours, minutes] = timeString.split(':').map(Number);

  const ksaTime = new Date(targetDate);
  ksaTime.setHours(hours, minutes, 0, 0);

  const utcTime = new Date(ksaTime.getTime() - (3 * 60 * 60 * 1000)); // Convert KSA to UTC

  return {
    scheduledAtKsa: ksaTime,
    scheduledAtUtc: utcTime,
    ksaTimeLabel: isAM ? '1:00 ظهرًا' : '8:30 مساءً',
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sourceType,
      source,
      campaignName,
      campaignDescription,
      startDate,
      totalDays,
      amTime,
      pmTime,
      ogImageUrl
    } = ImportRequestSchema.parse(body);

    // Fetch data based on source type
    let rawData: any;
    try {
      if (sourceType === 'bundled') {
        rawData = getBundledFile(source);
      } else {
        rawData = await fetchFromUrl(source);
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: `Failed to load source: ${error}` },
        { status: 400 }
      );
    }

    // Validate JSON structure
    const posts = TwitterPostsArraySchema.parse(rawData);

    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No posts found in source' },
        { status: 400 }
      );
    }

    // Create or update campaign
    const campaign = await db.twitterCampaign.upsert({
      where: { name: campaignName },
      update: {
        description: campaignDescription,
        startDate: new Date(startDate + 'T00:00:00+03:00'),
        totalDays,
        amTime,
        pmTime,
        ogImageUrl,
        updatedAt: new Date(),
      },
      create: {
        name: campaignName,
        description: campaignDescription,
        startDate: new Date(startDate + 'T00:00:00+03:00'),
        totalDays,
        amTime,
        pmTime,
        ogImageUrl,
        status: 'DRAFT',
        isActive: false,
      },
    });

    // Process and upsert posts
    const results = [];
    let createdCount = 0;
    let updatedCount = 0;

    for (const post of posts) {
      const slot: 'AM' | 'PM' = post.time.includes('1:00') ? 'AM' : 'PM';
      const schedule = computeSchedule(startDate, post.day, slot, amTime, pmTime);

      try {
        const upsertResult = await db.twitterPost.upsert({
          where: {
            campaignId_day_slot_cycle: {
              campaignId: campaign.id,
              day: post.day,
              slot,
              cycle: 1,
            },
          },
          update: {
            targetAudience: post.target_audience,
            content: post.content,
            mediaUrls: post.mediaUrls || [],
            mediaAlt: post.mediaAlt || null,
            scheduledAtKsa: schedule.scheduledAtKsa,
            scheduledAtUtc: schedule.scheduledAtUtc,
            ksaTimeLabel: schedule.ksaTimeLabel,
            source: source,
            updatedAt: new Date(),
          },
          create: {
            day: post.day,
            slot,
            targetAudience: post.target_audience,
            content: post.content,
            mediaUrls: post.mediaUrls || [],
            mediaAlt: post.mediaAlt || null,
            scheduledAtKsa: schedule.scheduledAtKsa,
            scheduledAtUtc: schedule.scheduledAtUtc,
            ksaTimeLabel: schedule.ksaTimeLabel,
            source: source,
            status: 'DRAFT',
            useOgFallback: true,
            cycle: 1,
            campaignId: campaign.id,
          },
        });

        results.push({
          day: post.day,
          slot,
          id: upsertResult.id,
          wasCreated: upsertResult.createdAt.getTime() === upsertResult.updatedAt.getTime(),
        });

        if (upsertResult.createdAt.getTime() === upsertResult.updatedAt.getTime()) {
          createdCount++;
        } else {
          updatedCount++;
        }
      } catch (error) {
        console.error(`Failed to process post day ${post.day} ${slot}:`, error);
        results.push({
          day: post.day,
          slot,
          error: `Failed to process: ${error}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Campaign "${campaignName}" imported: ${createdCount} created, ${updatedCount} updated`,
      data: {
        campaign: {
          id: campaign.id,
          name: campaign.name,
          startDate: campaign.startDate,
          totalDays: campaign.totalDays,
          status: campaign.status,
        },
        posts: {
          total: posts.length,
          created: createdCount,
          updated: updatedCount,
          results,
        },
      },
    });

  } catch (error) {
    console.error('Import error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
