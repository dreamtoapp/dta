// ============================================================================
// GET CONTACT REQUESTS SERVER ACTION
// ============================================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface GetContactRequestsParams {
  influencerId?: string
  status?: 'PENDING' | 'RESPONDED' | 'COMPLETED' | 'CANCELLED'
  limit?: number
  offset?: number
}

export interface ContactRequest {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  message: string
  budget?: string | null
  campaignType?: string | null
  timeline?: string | null
  status: 'PENDING' | 'RESPONDED' | 'COMPLETED' | 'CANCELLED'
  influencerId: string
  influencer: {
    id: string
    name: string
    username: string
    avatar?: string | null
  }
  createdAt: Date
  updatedAt: Date
}

export interface GetContactRequestsResponse {
  contactRequests: ContactRequest[]
  total: number
  hasMore: boolean
}

/**
 * Server action to get contact requests
 */
export async function getContactRequests(params: GetContactRequestsParams = {}): Promise<GetContactRequestsResponse> {
  try {
    const { influencerId, status, limit = 20, offset = 0 } = params

    // Build where clause
    const where: any = {}

    if (influencerId) {
      where.influencerId = influencerId
    }

    if (status) {
      where.status = status
    }

    // Get total count
    const total = await prisma.contactRequest.count({ where })

    // Get contact requests with pagination
    const contactRequests = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
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

    return {
      contactRequests,
      total,
      hasMore
    }
  } catch (error) {
    console.error('Error fetching contact requests:', error)
    return {
      contactRequests: [],
      total: 0,
      hasMore: false
    }
  }
}
