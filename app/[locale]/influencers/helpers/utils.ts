// ============================================================================
// INFLUENCER UTILITY FUNCTIONS
// ============================================================================

import type { PlatformType, Influencer, FilterState } from './types'

/**
 * Format large numbers with K/M suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`
  }
  return num.toString()
}

/**
 * Get platform URL for a given platform and username
 */
export const getPlatformUrl = (platform: PlatformType, username: string): string => {
  const baseUrls = {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    tiktok: 'https://tiktok.com',
    youtube: 'https://youtube.com',
    snapchat: 'https://snapchat.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me',
    telegram: 'https://t.me'
  }

  const base = baseUrls[platform]
  if (!base) return '#'

  switch (platform) {
    case 'instagram':
    case 'twitter':
    case 'tiktok':
    case 'youtube':
    case 'snapchat':
    case 'facebook':
    case 'linkedin':
    case 'whatsapp':
      return `${base}/+XXXXXXXXXXXX` // Placeholder, actual number needed
    case 'telegram':
      return `${base}/${username}`
    default:
      return '#'
  }
}

/**
 * Get category color class
 */
export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'Lifestyle': 'bg-pink-100 text-pink-800',
    'Tech': 'bg-blue-100 text-blue-800',
    'Fashion': 'bg-purple-100 text-purple-800',
    'Food': 'bg-yellow-100 text-yellow-800',
    'Travel': 'bg-green-100 text-green-800',
    'Beauty': 'bg-red-100 text-red-800',
    'Gaming': 'bg-indigo-100 text-indigo-800',
    'Education': 'bg-teal-100 text-teal-800',
    'Business': 'bg-orange-100 text-orange-800',
    'Entertainment': 'bg-cyan-100 text-cyan-800',
    'Sports': 'bg-lime-100 text-lime-800',
    'Automotive': 'bg-gray-100 text-gray-800',
    'Real Estate': 'bg-emerald-100 text-emerald-800',
    'Health': 'bg-rose-100 text-rose-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

/**
 * Filter and sort influencers based on filter state
 */
export const filterAndSortInfluencers = (
  influencers: Influencer[],
  filters: FilterState
): Influencer[] => {
  let filtered = [...influencers]

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filtered = filtered.filter(influencer =>
      influencer.name.toLowerCase().includes(searchTerm) ||
      influencer.username.toLowerCase().includes(searchTerm) ||
      influencer.bio.toLowerCase().includes(searchTerm) ||
      influencer.category.toLowerCase().includes(searchTerm) ||
      influencer.location.toLowerCase().includes(searchTerm) ||
      influencer.referenceId.toLowerCase().includes(searchTerm) ||
      influencer.socialPlatforms.some(p => p.username.toLowerCase().includes(searchTerm))
    )
  }

  // Apply category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter(influencer => influencer.category === filters.category)
  }

  // Apply platform filter
  if (filters.platform !== 'all') {
    filtered = filtered.filter(influencer =>
      influencer.socialPlatforms.some(p => p.platform === filters.platform)
    )
  }

  // Apply location filter
  if (filters.location !== 'all') {
    filtered = filtered.filter(influencer => influencer.location === filters.location)
  }

  // Apply followers filter
  if (filters.followers !== 'all') {
    const [minStr, maxStr] = filters.followers.split('-')
    const min = parseInt(minStr.replace('K', '000').replace('M', '000000'))
    const max = maxStr ? parseInt(maxStr.replace('K', '000').replace('M', '000000')) : Infinity

    filtered = filtered.filter(influencer =>
      influencer.totalFollowers >= min && influencer.totalFollowers <= max
    )
  }

  // Apply verified filter
  if (filters.verified) {
    filtered = filtered.filter(influencer => influencer.isVerified)
  }

  // Apply featured filter
  if (filters.featured) {
    filtered = filtered.filter(influencer => influencer.isFeatured)
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue: any
    let bValue: any

    switch (filters.sortBy) {
      case 'followers':
        aValue = a.totalFollowers
        bValue = b.totalFollowers
        break
      case 'engagement':
        aValue = a.avgEngagement
        bValue = b.avgEngagement
        break
      case 'rate':
        aValue = a.startingRate
        bValue = b.startingRate
        break
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      default:
        aValue = 0
        bValue = 0
    }

    if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return filtered
}

/**
 * Get unique values from influencers array
 */
export const getUniqueCategories = (influencers: Influencer[]): string[] => {
  const categories = new Set<string>()
  influencers.forEach(inf => categories.add(inf.category))
  return ['all', ...Array.from(categories).sort()]
}

export const getUniquePlatforms = (influencers: Influencer[]): string[] => {
  const platforms = new Set<string>()
  influencers.forEach(inf => inf.socialPlatforms.forEach(p => platforms.add(p.platform)))
  return ['all', ...Array.from(platforms).sort()]
}

export const getUniqueLocations = (influencers: Influencer[]): string[] => {
  const locations = new Set<string>()
  influencers.forEach(inf => locations.add(inf.location))
  return ['all', ...Array.from(locations).sort()]
}

/**
 * Calculate active filters count
 */
export const getActiveFiltersCount = (filters: FilterState): number => {
  let count = 0
  if (filters.search) count++
  if (filters.category !== 'all') count++
  if (filters.platform !== 'all') count++
  if (filters.location !== 'all') count++
  if (filters.followers !== 'all') count++
  if (filters.verified) count++
  if (filters.featured) count++
  return count
}
