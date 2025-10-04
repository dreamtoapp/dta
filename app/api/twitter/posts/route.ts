import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const GetPostsQuerySchema = z.object({
  campaignId: z.string().optional(),
  campaignName: z.string().optional(),
  status: z.enum(['DRAFT', 'APPROVED', 'POSTED', 'FAILED']).optional(),
  day: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
  slot: z.enum(['AM', 'PM']).optional(),
  cycle: z.string().transform(val => val ? parseInt(val) : undefined).optional(),
  search: z.string().optional(),
  page: z.string().transform(val => val ? parseInt(val) : 1).optional(),
  limit: z.string().transform(val => val ? parseInt(val) : 20).optional(),
});

const UpdatePostSchema = z.object({
  content: z.string().min(1).max(280).optional(),
  status: z.enum(['DRAFT', 'APPROVED', 'POSTED', 'FAILED']).optional(),
  mediaUrls: z.array(z.string().url()).max(4).optional(),
  mediaAlt: z.string().nullable().optional(),
  useOgFallback: z.boolean().optional(),
  error: z.string().nullable().optional(),
});

const DeletePostSchema = z.object({
  id: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = GetPostsQuerySchema.parse(Object.fromEntries(searchParams.entries()));

    const {
      campaignId,
      campaignName,
      status,
      day,
      slot,
      cycle,
      search,
      page = 1,
      limit = 20,
    } = query;

    // Build where clause
    const where: any = {};

    // Campaign filter
    if (campaignId) {
      where.campaignId = campaignId;
    } else if (campaignName) {
      // Find campaign by name
      const campaign = await db.twitterCampaign.findUnique({
        where: { name: campaignName },
        select: { id: true },
      });
      if (campaign) {
        where.campaignId = campaign.id;
      } else {
        return NextResponse.json({
          success: true,
          data: {
            posts: [],
            pagination: { page, limit, total: 0, pages: 0 },
          },
        });
      }
    }

    if (status) where.status = status;
    if (day) where.day = day;
    if (slot) where.slot = slot;
    if (cycle) where.cycle = cycle;

    if (search) {
      where.OR = [
        { content: { contains: search, mode: 'insensitive' } },
        { targetAudience: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count
    const total = await db.twitterPost.count({ where });

    // Get posts with pagination and campaign info
    const posts = await db.twitterPost.findMany({
      where,
      include: {
        campaign: {
          select: {
            id: true,
            name: true,
            startDate: true,
            status: true,
          },
        },
      },
      orderBy: [
        { day: 'asc' },
        { slot: 'asc' },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });

  } catch (error) {
    console.error('Get posts error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const validatedData = UpdatePostSchema.parse(updateData);

    // Check if post exists
    const existingPost = await db.twitterPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Prevent updating posted tweets (except status to FAILED)
    if (existingPost.status === 'POSTED' && validatedData.status !== 'FAILED') {
      return NextResponse.json(
        { success: false, error: 'Cannot update posted tweets' },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = await db.twitterPost.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });

  } catch (error) {
    console.error('Update post error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid update data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await db.twitterPost.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // Prevent deleting posted tweets
    if (existingPost.status === 'POSTED') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete posted tweets' },
        { status: 400 }
      );
    }

    // Delete the post
    await db.twitterPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Post from Day ${existingPost.day} ${existingPost.slot} deleted successfully`,
    });

  } catch (error) {
    console.error('Delete post error:', error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
