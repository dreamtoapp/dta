// ============================================================================
// GET INFLUENCERS SERVER ACTION
// ============================================================================

import { PrismaClient } from '@prisma/client'
import type { Influencer, FilterState } from '../helpers/types'
import { mockInfluencers } from '../helpers/mockData'
import { filterAndSortInfluencers } from '../helpers/utils'

const prisma = new PrismaClient()

export interface GetInfluencersParams {
  filters?: Partial<FilterState>
  limit?: number
  offset?: number
}

export interface GetInfluencersResponse {
  influencers: Influencer[]
  total: number
  hasMore: boolean
}

/**
 * Transform database influencer to frontend format
 */
function transformInfluencer(dbInfluencer: any): Influencer {
  return {
    id: dbInfluencer.id,
    referenceId: dbInfluencer.referenceId,
    name: dbInfluencer.name,
    username: dbInfluencer.username,
    bio: dbInfluencer.bio,
    avatar: dbInfluencer.avatar,
    category: dbInfluencer.category,
    location: dbInfluencer.location,
    languages: dbInfluencer.languages,
    socialPlatforms: dbInfluencer.socialPlatforms,
    totalFollowers: dbInfluencer.totalFollowers,
    avgEngagement: 0, // Default value since this field was removed from schema
    startingRate: dbInfluencer.influencerRate || 0, // Map influencerRate to startingRate
    isVerified: dbInfluencer.isVerified,
    isFeatured: dbInfluencer.isFeatured
  }
}

/**
 * Build order by clause for sorting
 */
function buildOrderBy(sortBy: string, sortOrder: string) {
  const order = sortOrder === 'asc' ? 'asc' : 'desc'

  switch (sortBy) {
    case 'followers':
      return { totalFollowers: order as 'asc' | 'desc' }
    case 'rate':
      return { influencerRate: order as 'asc' | 'desc' }
    case 'name':
      return { name: order as 'asc' | 'desc' }
    case 'created':
      return { createdAt: order as 'asc' | 'desc' }
    default:
      return { totalFollowers: 'desc' as const }
  }
}

/**
 * Server action to get influencers with optional filtering
 */
export async function getInfluencers(params: GetInfluencersParams = {}): Promise<GetInfluencersResponse> {
  try {
    const { filters = {}, limit = 12, offset = 0 } = params

    // Build where clause for filtering
    const where: any = {
      isActive: true
    }

    // Apply filters
    if (filters.category && filters.category !== 'all') {
      where.category = filters.category.toUpperCase()
    }

    if (filters.location && filters.location !== 'all') {
      where.location = { contains: filters.location, mode: 'insensitive' }
    }

    if (filters.verified) {
      where.isVerified = true
    }

    if (filters.featured) {
      where.isFeatured = true
    }

    if (filters.platform && filters.platform !== 'all') {
      where.socialPlatforms = {
        some: {
          platform: filters.platform.toUpperCase()
        }
      }
    }

    if (filters.followers && filters.followers !== 'all') {
      const ranges = {
        '1k-10k': { gte: 1000, lt: 10000 },
        '10k-100k': { gte: 10000, lt: 100000 },
        '100k-1m': { gte: 100000, lt: 1000000 },
        '1m+': { gte: 1000000 }
      }
      if (ranges[filters.followers as keyof typeof ranges]) {
        where.totalFollowers = ranges[filters.followers as keyof typeof ranges]
      }
    }

    // Build order by clause
    const orderBy = buildOrderBy(filters.sortBy || 'followers', filters.sortOrder || 'desc')

    // Get total count
    const total = await prisma.influencer.count({ where })

    // Get influencers with pagination
    const dbInfluencers = await prisma.influencer.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
    })

    // Transform to frontend format
    const influencers = dbInfluencers.map(transformInfluencer)

    // Apply search filter if provided
    let filteredInfluencers = influencers
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredInfluencers = influencers.filter(inf =>
        inf.name.toLowerCase().includes(searchTerm) ||
        inf.username.toLowerCase().includes(searchTerm) ||
        inf.bio.toLowerCase().includes(searchTerm) ||
        inf.category.toLowerCase().includes(searchTerm) ||
        inf.location.toLowerCase().includes(searchTerm)
      )
    }

    const hasMore = offset + limit < total

    return {
      influencers: filteredInfluencers,
      total: filteredInfluencers.length,
      hasMore
    }
  } catch (error) {
    console.error('Error fetching influencers:', error)
    return {
      influencers: [],
      total: 0,
      hasMore: false
    }
  }
}

/**
 * Server action to get a single influencer by ID
 */
export async function getInfluencer(id: string): Promise<Influencer | null> {
  try {
    const dbInfluencer = await prisma.influencer.findUnique({
      where: { id },
    })

    if (!dbInfluencer) {
      return null
    }

    return transformInfluencer(dbInfluencer)
  } catch (error) {
    console.error('Error fetching influencer:', error)
    // Fallback to mock data on error
    const influencer = mockInfluencers.find(inf => inf.id === id)
    return influencer || null
  }
}

/**
 * Server action to get influencer statistics
 */
export async function getInfluencerStats() {
  try {
    const [
      totalInfluencers,
      verifiedCount,
      featuredCount,
      totalFollowersResult
    ] = await Promise.all([
      prisma.influencer.count({ where: { isActive: true } }),
      prisma.influencer.count({ where: { isActive: true, isVerified: true } }),
      prisma.influencer.count({ where: { isActive: true, isFeatured: true } }),
      prisma.influencer.aggregate({
        where: { isActive: true },
        _sum: { totalFollowers: true }
      })
    ])

    const totalFollowers = totalFollowersResult._sum.totalFollowers || 0

    return {
      totalInfluencers,
      verifiedCount,
      featuredCount,
      totalFollowers
    }
  } catch (error) {
    console.error('Error fetching influencer stats:', error)
    // Fallback to mock data on error
    const totalInfluencers = mockInfluencers.length
    const verifiedCount = mockInfluencers.filter(inf => inf.isVerified).length
    const featuredCount = mockInfluencers.filter(inf => inf.isFeatured).length
    const totalFollowers = mockInfluencers.reduce((sum, inf) => sum + inf.totalFollowers, 0)

    return {
      totalInfluencers,
      verifiedCount,
      featuredCount,
      totalFollowers
    }
  }
}
