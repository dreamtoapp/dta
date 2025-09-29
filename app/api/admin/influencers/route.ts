// ============================================================================
// ADMIN INFLUENCERS API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for query parameters
const QuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED']).optional(),
  category: z.string().optional(),
  verified: z.string().optional().transform(val => val === 'true'),
  featured: z.string().optional().transform(val => val === 'true'),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

// Validation schema for POST request
const CreateInfluencerSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().min(10),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  testimonialImage: z.string().url().optional(),
  category: z.enum(['LIFESTYLE', 'FASHION', 'BEAUTY', 'TECH', 'GAMING', 'FOOD', 'TRAVEL', 'FITNESS', 'BUSINESS', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'ART', 'MUSIC', 'PHOTOGRAPHY']),
  location: z.string().min(2),
  languages: z.array(z.string()).min(1),
  influencerRate: z.number().min(0),
  agencyRate: z.number().min(0),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'WHATSAPP', 'TELEGRAM']),
    username: z.string().min(1),
    followers: z.number().min(0),
    verified: z.boolean()
  })),
  isVerified: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED']).default('PENDING_VERIFICATION')
})

/**
 * GET /api/admin/influencers - Get all influencers (admin view)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request)
    // if (!isAdmin) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())

    // Validate query parameters
    const validatedQuery = QuerySchema.parse(query)
    const { page, limit, status, category, verified, featured, search, sortBy, sortOrder } = validatedQuery

    // Build where clause
    const where: any = {}

    // Apply filters
    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category.toUpperCase()
    }

    if (verified !== undefined) {
      where.isVerified = verified
    }

    if (featured !== undefined) {
      where.isFeatured = featured
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Build order by clause
    const orderBy: any = {}
    if (sortBy) {
      switch (sortBy) {
        case 'followers':
          orderBy.totalFollowers = sortOrder || 'desc'
          break
        case 'rate':
          orderBy.influencerRate = sortOrder || 'desc'
          break
        case 'name':
          orderBy.name = sortOrder || 'asc'
          break
        case 'created':
          orderBy.createdAt = sortOrder || 'desc'
          break
        case 'status':
          orderBy.status = sortOrder || 'asc'
          break
        default:
          orderBy.createdAt = 'desc'
      }
    } else {
      orderBy.createdAt = 'desc'
    }

    // Calculate pagination
    const offset = (page - 1) * limit

    // Get total count
    const total = await prisma.influencer.count({ where })

    // Get influencers with pagination
    const influencers = await prisma.influencer.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        socialPlatforms: true,
        _count: {
          select: {
            contactRequests: true,
            portfolio: true,
            reviews: true
          }
        }
      }
    })

    const hasMore = offset + limit < total

    return NextResponse.json({
      success: true,
      data: {
        influencers,
        pagination: {
          page,
          limit,
          total,
          hasMore,
          totalPages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching admin influencers:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch influencers' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/influencers - Create a new influencer (admin)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request)
    // if (!isAdmin) {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()

    // Validate request body
    const validatedData = CreateInfluencerSchema.parse(body)

    // Check if username or email already exists
    const existingInfluencer = await prisma.influencer.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    })

    if (existingInfluencer) {
      return NextResponse.json(
        {
          success: false,
          message: existingInfluencer.username === validatedData.username
            ? 'Username already exists'
            : 'Email already exists'
        },
        { status: 400 }
      )
    }

    // Calculate total followers
    const totalFollowers = validatedData.socialPlatforms.reduce((total, platform) => total + platform.followers, 0)

    // Generate reference ID
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    const referenceId = `INF-${timestamp}-${random}`

    // Create influencer
    const influencer = await prisma.influencer.create({
      data: {
        referenceId,
        name: validatedData.name,
        username: validatedData.username,
        email: validatedData.email,
        phone: validatedData.phone,
        bio: validatedData.bio,
        avatar: validatedData.avatar,
        coverImage: validatedData.coverImage,
        testimonialImage: validatedData.testimonialImage,
        category: validatedData.category,
        location: validatedData.location,
        languages: validatedData.languages,
        influencerRate: validatedData.influencerRate,
        agencyRate: validatedData.agencyRate,
        totalFollowers,
        isVerified: validatedData.isVerified,
        isFeatured: validatedData.isFeatured,
        isActive: validatedData.isActive,
        status: validatedData.status,
        socialPlatforms: {
          create: validatedData.socialPlatforms.map(platform => ({
            platform: platform.platform,
            username: platform.username,
            followers: platform.followers,
            isVerified: platform.verified,
            isActive: true
          }))
        }
      },
      include: {
        socialPlatforms: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Influencer created successfully',
      data: influencer
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating influencer:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create influencer' },
      { status: 500 }
    )
  }
}


