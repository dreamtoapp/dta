// ============================================================================
// INFLUENCER TYPES
// ============================================================================

export type PlatformType = 'instagram' | 'tiktok' | 'youtube' | 'snapchat' | 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram'

export interface PlatformData {
  platform: PlatformType
  username: string
  followers: number
  engagement: number
  verified: boolean
  url?: string
}

export interface SocialPlatform extends PlatformData {
  platform: PlatformType
}

export interface Influencer {
  id: string
  referenceId: string // Unique reference ID for client selection
  name: string
  username: string
  bio: string
  avatar?: string
  category: string
  location: string
  languages: string[]
  socialPlatforms: SocialPlatform[]
  totalFollowers: number
  avgEngagement: number
  startingRate: number
  isVerified: boolean
  isFeatured: boolean
}

export interface FilterState {
  search: string
  category: string
  platform: string
  location: string
  followers: string
  verified: boolean
  featured: boolean
  sortBy: 'followers' | 'engagement' | 'rate' | 'name'
  sortOrder: 'asc' | 'desc'
}

export interface InfluencerCardProps {
  influencer: Influencer
  onClick?: (influencer: Influencer) => void
  className?: string
}

export interface InfluencersGridProps {
  influencers: Influencer[]
  onInfluencersChange?: (influencers: Influencer[]) => void
  className?: string
}

export interface InfluencerFiltersProps {
  onFiltersChange?: (filters: FilterState) => void
  onInfluencersChange?: (influencers: Influencer[]) => void
}

export interface PlatformIconProps {
  platform: PlatformType
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTooltip?: boolean
  platformData?: PlatformData
  onClick?: () => void
}

export interface PlatformGridProps {
  platforms: PlatformData[]
  onPlatformClick?: (platform: PlatformData) => void
  className?: string
}

export interface PlatformStatsProps {
  platforms: PlatformData[] | SocialPlatform[]
  showTotal?: boolean
  showEngagement?: boolean
  className?: string
}
