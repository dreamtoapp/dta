// ============================================================================
// INFLUENCER ENUMS - SHARED ACROSS FRONTEND AND DASHBOARD
// ============================================================================

// ============================================================================
// PLATFORM TYPES
// ============================================================================

export type PlatformType =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'snapchat'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'

export const PLATFORM_OPTIONS: PlatformType[] = [
  'instagram',
  'tiktok',
  'youtube',
  'snapchat',
  'facebook',
  'twitter',
  'linkedin',
  'whatsapp',
  'telegram'
]

export const PLATFORM_DISPLAY_NAMES: Record<PlatformType, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  snapchat: 'Snapchat',
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  telegram: 'Telegram'
}

export const PLATFORM_ICONS: Record<PlatformType, string> = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '📺',
  snapchat: '👻',
  facebook: '📘',
  twitter: '🐦',
  linkedin: '💼',
  whatsapp: '💬',
  telegram: '✈️'
}

// ============================================================================
// CATEGORIES
// ============================================================================

export const CATEGORIES = [
  'Lifestyle',
  'Fashion',
  'Beauty',
  'Tech',
  'Gaming',
  'Food',
  'Travel',
  'Fitness',
  'Business',
  'Education',
  'Entertainment',
  'Sports',
  'Art',
  'Music',
  'Photography'
] as const

export type CategoryType = typeof CATEGORIES[number]

// ============================================================================
// LOCATIONS
// ============================================================================

export const LOCATIONS = [
  'Riyadh, Saudi Arabia',
  'Dubai, UAE',
  'Jeddah, Saudi Arabia',
  'Cairo, Egypt',
  'Alexandria, Egypt',
  // 'Kuwait City, Kuwait',
  // 'Doha, Qatar',
  // 'Manama, Bahrain',
  // 'Muscat, Oman',
  // 'Amman, Jordan',
  // 'Beirut, Lebanon',
  // 'Damascus, Syria',
  // 'Baghdad, Iraq',
  // 'Tehran, Iran',
  // 'Istanbul, Turkey'
] as const

export type LocationType = typeof LOCATIONS[number]

// ============================================================================
// LANGUAGES
// ============================================================================

export const LANGUAGES = [
  'Arabic',
  'English',
  'French',
  'Spanish',
  'Turkish',
  'Persian',
  'Urdu',
  'Hindi'
] as const

export type LanguageType = typeof LANGUAGES[number]

// ============================================================================
// FOLLOWER RANGES
// ============================================================================

export const FOLLOWER_RANGES = [
  { value: 'all', label: 'All Followers' },
  { value: '0-10k', label: '0 - 10K' },
  { value: '10k-50k', label: '10K - 50K' },
  { value: '50k-100k', label: '50K - 100K' },
  { value: '100k-500k', label: '100K - 500K' },
  { value: '500k-1m', label: '500K - 1M' },
  { value: '1m+', label: '1M+' }
] as const

export type FollowerRangeType = typeof FOLLOWER_RANGES[number]['value']

// ============================================================================
// SORT OPTIONS
// ============================================================================

export const SORT_OPTIONS = [
  { value: 'followers', label: 'Followers' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'rate', label: 'Rate' },
  { value: 'name', label: 'Name' }
] as const

export type SortByType = typeof SORT_OPTIONS[number]['value']

export const SORT_ORDERS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' }
] as const

export type SortOrderType = typeof SORT_ORDERS[number]['value']

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getPlatformDisplayName = (platform: PlatformType): string => {
  return PLATFORM_DISPLAY_NAMES[platform] || platform
}

export const getPlatformIcon = (platform: PlatformType): string => {
  return PLATFORM_ICONS[platform] || '🌐'
}

export const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export const getFollowerRange = (count: number): FollowerRangeType => {
  if (count < 10000) return '0-10k'
  if (count < 50000) return '10k-50k'
  if (count < 100000) return '50k-100k'
  if (count < 500000) return '100k-500k'
  if (count < 1000000) return '500k-1m'
  return '1m+'
}
