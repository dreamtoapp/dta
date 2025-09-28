// ============================================================================
// GET INFLUENCERS SERVER ACTION
// ============================================================================

import type { Influencer, FilterState } from '../helpers/types'
import { mockInfluencers } from '../helpers/mockData'
import { filterAndSortInfluencers } from '../helpers/utils'

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
 * Server action to get influencers with optional filtering
 */
export async function getInfluencers(params: GetInfluencersParams = {}): Promise<GetInfluencersResponse> {
  try {
    const { filters = {}, limit = 12, offset = 0 } = params

    // Apply filters to mock data
    const filteredInfluencers = filterAndSortInfluencers(mockInfluencers, {
      search: '',
      category: 'all',
      platform: 'all',
      location: 'all',
      followers: 'all',
      verified: false,
      featured: false,
      sortBy: 'followers',
      sortOrder: 'desc',
      ...filters
    })

    // Apply pagination
    const paginatedInfluencers = filteredInfluencers.slice(offset, offset + limit)
    const hasMore = offset + limit < filteredInfluencers.length

    return {
      influencers: paginatedInfluencers,
      total: filteredInfluencers.length,
      hasMore
    }
  } catch (error) {
    console.error('Error fetching influencers:', error)
    throw new Error('Failed to fetch influencers')
  }
}

/**
 * Server action to get a single influencer by ID
 */
export async function getInfluencer(id: string): Promise<Influencer | null> {
  try {
    const influencer = mockInfluencers.find(inf => inf.id === id)
    return influencer || null
  } catch (error) {
    console.error('Error fetching influencer:', error)
    throw new Error('Failed to fetch influencer')
  }
}

/**
 * Server action to get influencer statistics
 */
export async function getInfluencerStats() {
  try {
    const totalInfluencers = mockInfluencers.length
    const verifiedCount = mockInfluencers.filter(inf => inf.isVerified).length
    const featuredCount = mockInfluencers.filter(inf => inf.isFeatured).length
    const totalFollowers = mockInfluencers.reduce((sum, inf) => sum + inf.totalFollowers, 0)
    const avgEngagement = mockInfluencers.reduce((sum, inf) => sum + inf.avgEngagement, 0) / totalInfluencers

    return {
      totalInfluencers,
      verifiedCount,
      featuredCount,
      totalFollowers,
      avgEngagement: Number(avgEngagement.toFixed(2))
    }
  } catch (error) {
    console.error('Error fetching influencer stats:', error)
    throw new Error('Failed to fetch influencer statistics')
  }
}
