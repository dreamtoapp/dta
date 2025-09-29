// ============================================================================
// INFLUENCER CONTACT API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for contact request
const ContactRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  campaignType: z.enum(['sponsored_post', 'story', 'reel', 'video', 'collaboration', 'other']).optional(),
  timeline: z.string().optional()
})

/**
 * POST /api/influencers/[id]/contact - Send contact request to influencer
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Influencer ID is required' },
        { status: 400 }
      )
    }

    // Validate request body
    const validatedData = ContactRequestSchema.parse(body)

    // Check if influencer exists
    const influencer = await prisma.influencer.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, isActive: true }
    })

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: 'Influencer not found' },
        { status: 404 }
      )
    }

    if (!influencer.isActive) {
      return NextResponse.json(
        { success: false, message: 'Influencer is not accepting contact requests' },
        { status: 400 }
      )
    }

    // Save contact request to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        message: validatedData.message,
        budget: validatedData.budget,
        campaignType: validatedData.campaignType,
        timeline: validatedData.timeline,
        status: 'PENDING',
        influencerId: id
      }
    })

    // TODO: In production, this would:
    // 1. Send email notification to influencer
    // 2. Send confirmation email to client
    // 3. Create follow-up task

    console.log('Contact request saved:', contactRequest.id)

    return NextResponse.json({
      success: true,
      message: 'Your contact request has been sent successfully!',
      data: {
        requestId: contactRequest.id,
        influencerName: influencer.name
      }
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error processing contact request:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send contact request. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/influencers/[id]/contact - Get contact requests for an influencer
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Influencer ID is required' },
        { status: 400 }
      )
    }

    // Check if influencer exists
    const influencer = await prisma.influencer.findUnique({
      where: { id },
      select: { id: true, name: true }
    })

    if (!influencer) {
      return NextResponse.json(
        { success: false, message: 'Influencer not found' },
        { status: 404 }
      )
    }

    // Build where clause
    const where: any = { influencerId: id }
    if (status) {
      where.status = status.toUpperCase()
    }

    // Calculate pagination
    const offset = (page - 1) * limit

    // Get total count
    const total = await prisma.contactRequest.count({ where })

    // Get contact requests
    const contactRequests = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit
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
    console.error('Error fetching contact requests:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact requests' },
      { status: 500 }
    )
  }
}
