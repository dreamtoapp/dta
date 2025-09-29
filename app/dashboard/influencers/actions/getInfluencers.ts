'use server'

import db from '@/lib/prisma'

export interface InfluencerListItem {
  id: string
  referenceId: string
  name: string
  username: string
  email: string
  avatar?: string | null
  category: string
  location: string
  totalFollowers: number
  influencerRate: number
  agencyRate: number
  isVerified: boolean
  isFeatured: boolean
  isActive: boolean
  status: string
  createdAt: Date
  socialPlatforms: {
    platform: string
    username: string
    followers: number
    isVerified: boolean
  }[]
}

export interface GetInfluencersResponse {
  success: boolean
  data?: InfluencerListItem[]
  message?: string
}

export async function getInfluencers(): Promise<GetInfluencersResponse> {
  try {
    const influencers = await db.influencer.findMany({
      select: {
        id: true,
        referenceId: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        category: true,
        location: true,
        totalFollowers: true,
        influencerRate: true,
        agencyRate: true,
        isVerified: true,
        isFeatured: true,
        isActive: true,
        status: true,
        createdAt: true,
        socialPlatforms: {
          select: {
            platform: true,
            username: true,
            followers: true,
            isVerified: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      data: influencers
    }
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return {
      success: false,
      message: 'Failed to fetch influencers'
    }
  }
}
