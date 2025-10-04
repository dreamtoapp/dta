import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const CreateCampaignSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().default(new Date().toISOString().split('T')[0]),
  totalDays: z.number().int().min(1).max(90).optional().default(45),
  amTime: z.string().optional().default("13:00"),
  pmTime: z.string().optional().default("20:30"),
  ogImageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED']).optional().default('DRAFT'),
  isActive: z.boolean().optional().default(false),
});

const UpdateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  totalDays: z.number().int().min(1).max(90).optional(),
  amTime: z.string().optional(),
  pmTime: z.string().optional(),
  ogImageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED']).optional(),
  isActive: z.boolean().optional(),
});

const DeleteCampaignSchema = z.object({
  id: z.string().min(1),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const isActive = searchParams.get('isActive');

    const where: any = {};
    if (status) where.status = status;
    if (isActive !== null) where.isActive = isActive === 'true';

    const campaigns = await db.twitterCampaign.findMany({
      where,
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
        posts: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Add detailed post statistics to each campaign
    const campaignsWithStats = campaigns.map(campaign => {
      const postStats = campaign.posts.reduce((acc, post) => {
        acc[post.status] = (acc[post.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const totalPosts = campaign._count.posts;
      const postedCount = postStats.POSTED || 0;
      const remainingCount = totalPosts - postedCount;

      return {
        ...campaign,
        postStats: {
          total: totalPosts,
          posted: postedCount,
          remaining: remainingCount,
          draft: postStats.DRAFT || 0,
          approved: postStats.APPROVED || 0,
          failed: postStats.FAILED || 0,
        },
        posts: undefined, // Remove the posts array to keep response clean
      };
    });

    return NextResponse.json({
      success: true,
      data: campaignsWithStats,
    });

  } catch (error) {
    console.error('Get campaigns error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = CreateCampaignSchema.parse(body);

    // Check if campaign name already exists
    const existing = await db.twitterCampaign.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Campaign name already exists' },
        { status: 400 }
      );
    }

    // If setting as active, deactivate other campaigns
    if (data.status === 'ACTIVE' || data.isActive) {
      await db.twitterCampaign.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      });
    }

    const campaign = await db.twitterCampaign.create({
      data: {
        ...data,
        ogImageUrl: data.ogImageUrl || null, // Convert empty string to null
        startDate: new Date(data.startDate + 'T00:00:00+03:00'), // KSA timezone
        status: 'DRAFT',
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      data: campaign,
    });

  } catch (error) {
    console.error('Create campaign error:', error);

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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = UpdateCampaignSchema.parse(body);

    // Check if campaign exists
    const existing = await db.twitterCampaign.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // If setting as active, deactivate other campaigns
    if (validatedData.status === 'ACTIVE' || validatedData.isActive) {
      await db.twitterCampaign.updateMany({
        where: {
          isActive: true,
          id: { not: id },
        },
        data: { isActive: false },
      });
    }

    // Convert startDate if provided
    if (validatedData.startDate) {
      validatedData.startDate = new Date(validatedData.startDate + 'T00:00:00+03:00') as any;
    }

    // Convert empty ogImageUrl to null
    if (validatedData.ogImageUrl === '') {
      validatedData.ogImageUrl = null as any;
    }

    const campaign = await db.twitterCampaign.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: campaign,
    });

  } catch (error) {
    console.error('Update campaign error:', error);

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
        { success: false, error: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    // Check if campaign exists
    const existing = await db.twitterCampaign.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Delete the campaign (posts will be deleted automatically due to onDelete: Cascade)
    await db.twitterCampaign.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Campaign "${existing.name}" and ${existing._count.posts} associated posts deleted successfully`,
    });

  } catch (error) {
    console.error('Delete campaign error:', error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
