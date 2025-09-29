// ============================================================================
// ADMIN INFLUENCER BY ID API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for PUT request
const UpdateInfluencerSchema = z.object({
  name: z.string().min(2).optional(),
  username: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  bio: z.string().min(10).optional(),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  testimonialImage: z.string().url().optional(),
  category: z.enum(['LIFESTYLE', 'FASHION', 'BEAUTY', 'TECH', 'GAMING', 'FOOD', 'TRAVEL', 'FITNESS', 'BUSINESS', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'ART', 'MUSIC', 'PHOTOGRAPHY']).optional(),
  location: z.string().min(2).optional(),
  languages: z.array(z.string()).min(1).optional(),
  influencerRate: z.number().min(0).optional(),
  agencyRate: z.number().min(0).optional(),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'WHATSAPP', 'TELEGRAM']),
    username: z.string().min(1),
    followers: z.number().min(0),
    verified: z.boolean()
  })).optional(),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED']).optional()
})

/**
 * GET /api/admin/influencers/[id] - Get a specific influencer (admin view)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request)
    // if (!isAdmin) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Influencer ID is required' },
        { status: 400 }
      )
    }

    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: {
        socialPlatforms: true,
        portfolio: true,
        reviews: true,
        contactRequests: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            contactRequests: true,
            portfolio: true,
            reviews: true
          }
        }
      }
    })

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: 'Influencer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: influencer
    })
  } catch (error) {
    console.error('Error fetching admin influencer:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch influencer' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/influencers/[id] - Update a specific influencer (admin)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request)
    // if (!isAdmin) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const { id } = await params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Influencer ID is required' },
        { status: 400 }
      )
    }

    // Validate request body
    const validatedData = UpdateInfluencerSchema.parse(body)

    // Check if influencer exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { id }
    })

    if (!existingInfluencer) {
      return NextResponse.json(
        { success: false, message: 'Influencer not found' },
        { status: 404 }
      )
    }

    // Check for duplicate username/email (excluding current influencer)
    if (validatedData.username || validatedData.email) {
      const duplicateInfluencer = await prisma.influencer.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(validatedData.username ? [{ username: validatedData.username }] : []),
                ...(validatedData.email ? [{ email: validatedData.email }] : [])
              ]
            }
          ]
        }
      })

      if (duplicateInfluencer) {
        return NextResponse.json(
          {
            success: false,
            message: duplicateInfluencer.username === validatedData.username
              ? 'Username already exists'
              : 'Email already exists'
          },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}

    if (validatedData.name) updateData.name = validatedData.name
    if (validatedData.username) updateData.username = validatedData.username
    if (validatedData.email) updateData.email = validatedData.email
    if (validatedData.phone !== undefined) updateData.phone = validatedData.phone
    if (validatedData.bio) updateData.bio = validatedData.bio
    if (validatedData.avatar !== undefined) updateData.avatar = validatedData.avatar
    if (validatedData.coverImage !== undefined) updateData.coverImage = validatedData.coverImage
    if (validatedData.testimonialImage !== undefined) updateData.testimonialImage = validatedData.testimonialImage
    if (validatedData.category) updateData.category = validatedData.category
    if (validatedData.location) updateData.location = validatedData.location
    if (validatedData.languages) updateData.languages = validatedData.languages
    if (validatedData.influencerRate !== undefined) updateData.influencerRate = validatedData.influencerRate
    if (validatedData.agencyRate !== undefined) updateData.agencyRate = validatedData.agencyRate
    if (validatedData.isVerified !== undefined) updateData.isVerified = validatedData.isVerified
    if (validatedData.isFeatured !== undefined) updateData.isFeatured = validatedData.isFeatured
    if (validatedData.isActive !== undefined) updateData.isActive = validatedData.isActive
    if (validatedData.status) updateData.status = validatedData.status

    // Update social platforms if provided
    if (validatedData.socialPlatforms) {
      // Delete existing social platforms
      await prisma.socialPlatform.deleteMany({
        where: { influencerId: id }
      })

      // Create new social platforms
      updateData.socialPlatforms = {
        create: validatedData.socialPlatforms.map(platform => ({
          platform: platform.platform,
          username: platform.username,
          followers: platform.followers,
          isVerified: platform.verified,
          isActive: true
        }))
      }

      // Update total followers
      updateData.totalFollowers = validatedData.socialPlatforms.reduce((total, platform) => total + platform.followers, 0)
    }

    // Update influencer
    const updatedInfluencer = await prisma.influencer.update({
      where: { id },
      data: updateData,
      include: {
        socialPlatforms: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Influencer updated successfully',
      data: updatedInfluencer
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating admin influencer:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update influencer' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/influencers/[id] - Delete a specific influencer (admin)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request)
    // if (!isAdmin) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Influencer ID is required' },
        { status: 400 }
      )
    }

    // Check if influencer exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { id },
      include: {
        socialPlatforms: true,
        portfolio: true,
        reviews: true,
        contactRequests: true
      }
    })

    if (!existingInfluencer) {
      return NextResponse.json(
        { success: false, message: 'Influencer not found' },
        { status: 404 }
      )
    }

    // Check if influencer has active contact requests
    const activeContactRequests = await prisma.contactRequest.count({
      where: {
        influencerId: id,
        status: { in: ['PENDING', 'RESPONDED'] }
      }
    })

    if (activeContactRequests > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete influencer with ${activeContactRequests} active contact requests. Please resolve them first.`
        },
        { status: 400 }
      )
    }

    // Delete influencer (cascade will handle related records)
    await prisma.influencer.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Influencer deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting admin influencer:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete influencer' },
      { status: 500 }
    )
  }
}
