// ============================================================================
// INFLUENCER CONSTANTS
// ============================================================================

export const PLATFORM_CONFIG = {
  instagram: {
    name: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    url: 'https://instagram.com'
  },
  youtube: {
    name: 'YouTube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    url: 'https://youtube.com'
  },
  tiktok: {
    name: 'TikTok',
    color: 'text-black',
    bgColor: 'bg-black/10',
    url: 'https://tiktok.com'
  },
  snapchat: {
    name: 'Snapchat',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    url: 'https://snapchat.com'
  },
  facebook: {
    name: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    url: 'https://facebook.com'
  },
  twitter: {
    name: 'Twitter',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    url: 'https://twitter.com'
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    url: 'https://linkedin.com'
  },
  whatsapp: {
    name: 'WhatsApp',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    url: 'https://wa.me'
  },
  telegram: {
    name: 'Telegram',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    url: 'https://t.me'
  }
} as const

export const CATEGORY_COLORS = {
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
} as const

export const FOLLOWER_RANGES = [
  { value: 'all', label: 'Any' },
  { value: '1000-10000', label: '1K - 10K' },
  { value: '10000-50000', label: '10K - 50K' },
  { value: '50000-100000', label: '50K - 100K' },
  { value: '100000-500000', label: '100K - 500K' },
  { value: '500000-1000000', label: '500K - 1M' },
  { value: '1000000-Infinity', label: '1M+' },
] as const

export const SORT_OPTIONS = [
  { value: 'followers', label: 'Followers' },
  { value: 'engagement', label: 'Engagement Rate' },
  { value: 'rate', label: 'Starting Rate' },
  { value: 'name', label: 'Name' },
] as const

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  platform: 'all',
  location: 'all',
  followers: 'all',
  verified: false,
  featured: false,
  sortBy: 'followers' as const,
  sortOrder: 'desc' as const,
} as const
