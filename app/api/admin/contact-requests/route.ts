// ============================================================================
// ADMIN CONTACT REQUESTS API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for query parameters
const QuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  status: z.enum(['PENDING', 'RESPONDED', 'COMPLETED', 'CANCELLED']).optional(),
  influencerId: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
})

/**
 * GET /api/admin/contact-requests - Get all contact requests (admin view)
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
    const { page, limit, status, influencerId, search, sortBy, sortOrder } = validatedQuery

    // Build where clause
    const where: any = {}

    // Apply filters
    if (status) {
      where.status = status
    }

    if (influencerId) {
      where.influencerId = influencerId
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Build order by clause
    const orderBy: any = {}
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          orderBy.name = sortOrder || 'asc'
          break
        case 'email':
          orderBy.email = sortOrder || 'asc'
          break
        case 'status':
          orderBy.status = sortOrder || 'asc'
          break
        case 'created':
          orderBy.createdAt = sortOrder || 'desc'
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
    const total = await prisma.contactRequest.count({ where })

    // Get contact requests with pagination
    const contactRequests = await prisma.contactRequest.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        influencer: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        }
      }
    })

    const hasMore = offset + limit < total

    return NextResponse.json({
      success: true,
      data: {
        contactRequests,
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
    console.error('Error fetching admin contact requests:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact requests' },
      { status: 500 }
    )
  }
}


