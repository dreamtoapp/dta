// ============================================================================
// ADMIN CONTACT REQUEST BY ID API ROUTE
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema for PUT request
const UpdateContactRequestSchema = z.object({
  status: z.enum(['PENDING', 'RESPONDED', 'COMPLETED', 'CANCELLED'])
})

/**
 * GET /api/admin/contact-requests/[id] - Get a specific contact request (admin view)
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
        { success: false, message: 'Contact request ID is required' },
        { status: 400 }
      )
    }

    const contactRequest = await prisma.contactRequest.findUnique({
      where: { id },
      include: {
        influencer: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            email: true
          }
        }
      }
    })

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, message: 'Contact request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contactRequest
    })
  } catch (error) {
    console.error('Error fetching admin contact request:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact request' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/contact-requests/[id] - Update contact request status (admin)
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
        { success: false, message: 'Contact request ID is required' },
        { status: 400 }
      )
    }

    // Validate request body
    const validatedData = UpdateContactRequestSchema.parse(body)

    // Check if contact request exists
    const existingContactRequest = await prisma.contactRequest.findUnique({
      where: { id }
    })

    if (!existingContactRequest) {
      return NextResponse.json(
        { success: false, message: 'Contact request not found' },
        { status: 404 }
      )
    }

    // Update contact request status
    const updatedContactRequest = await prisma.contactRequest.update({
      where: { id },
      data: {
        status: validatedData.status
      },
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

    return NextResponse.json({
      success: true,
      message: 'Contact request status updated successfully',
      data: updatedContactRequest
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating admin contact request:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update contact request' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/contact-requests/[id] - Delete a contact request (admin)
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
        { success: false, message: 'Contact request ID is required' },
        { status: 400 }
      )
    }

    // Check if contact request exists
    const existingContactRequest = await prisma.contactRequest.findUnique({
      where: { id }
    })

    if (!existingContactRequest) {
      return NextResponse.json(
        { success: false, message: 'Contact request not found' },
        { status: 404 }
      )
    }

    // Delete contact request
    await prisma.contactRequest.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Contact request deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting admin contact request:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact request' },
      { status: 500 }
    )
  }
}
