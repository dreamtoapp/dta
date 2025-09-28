import { Influencer } from './types'

// ============================================================================
// MOCK INFLUENCER DATA
// ============================================================================

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    referenceId: 'INF-001',
    name: 'Sarah Al-Rashid',
    username: 'sarah_lifestyle',
    bio: 'Lifestyle influencer sharing daily routines, fashion tips, and travel experiences from Saudi Arabia.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: 'Lifestyle',
    location: 'Riyadh, Saudi Arabia',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'sarah_lifestyle',
        followers: 125000,
        engagement: 4.2,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'sarah_tiktok',
        followers: 89000,
        engagement: 5.1,
        verified: false
      },
      {
        platform: 'youtube',
        username: 'sarah_lifestyle',
        followers: 45000,
        engagement: 3.8,
        verified: true
      },
      {
        platform: 'snapchat',
        username: 'sarah_snap',
        followers: 32000,
        engagement: 4.5,
        verified: false
      }
    ],
    totalFollowers: 291000,
    avgEngagement: 4.4,
    startingRate: 800,
    isVerified: true,
    isFeatured: true
  },
  {
    id: '2',
    referenceId: 'INF-002',
    name: 'Ahmed TechGuru',
    username: 'ahmed_tech',
    bio: 'Tech reviewer and gadget enthusiast. Making technology accessible and fun for Arabic speakers.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: 'Tech',
    location: 'Dubai, UAE',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'youtube',
        username: 'ahmed_tech',
        followers: 180000,
        engagement: 6.2,
        verified: true
      },
      {
        platform: 'instagram',
        username: 'ahmed_tech',
        followers: 95000,
        engagement: 4.8,
        verified: true
      },
      {
        platform: 'twitter',
        username: 'ahmed_tech',
        followers: 67000,
        engagement: 5.5,
        verified: true
      }
    ],
    totalFollowers: 342000,
    avgEngagement: 5.5,
    startingRate: 1200,
    isVerified: true,
    isFeatured: false
  },
  {
    id: '3',
    referenceId: 'INF-003',
    name: 'Fatima Fashion',
    username: 'fatima_style',
    bio: 'Fashion designer and style influencer promoting modest fashion and sustainable clothing.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: 'Fashion',
    location: 'Jeddah, Saudi Arabia',
    languages: ['Arabic', 'English', 'French'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'fatima_style',
        followers: 210000,
        engagement: 5.8,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'fatima_fashion',
        followers: 156000,
        engagement: 6.4,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'fatima_style',
        followers: 78000,
        engagement: 4.2,
        verified: false
      },
      {
        platform: 'snapchat',
        username: 'fatima_snap',
        followers: 43000,
        engagement: 5.1,
        verified: false
      }
    ],
    totalFollowers: 487000,
    avgEngagement: 5.4,
    startingRate: 1500,
    isVerified: true,
    isFeatured: true
  },
  {
    id: '4',
    referenceId: 'INF-004',
    name: 'Omar Foodie',
    username: 'omar_eats',
    bio: 'Food blogger and chef sharing authentic Middle Eastern recipes and restaurant reviews.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Food',
    location: 'Cairo, Egypt',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'omar_eats',
        followers: 175000,
        engagement: 4.9,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'omar_foodie',
        followers: 125000,
        engagement: 5.2,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'omar_eats',
        followers: 98000,
        engagement: 6.1,
        verified: false
      }
    ],
    totalFollowers: 398000,
    avgEngagement: 5.4,
    startingRate: 1000,
    isVerified: true,
    isFeatured: false
  },
  {
    id: '5',
    referenceId: 'INF-005',
    name: 'Layla Travel',
    username: 'layla_wanderlust',
    bio: 'Travel blogger exploring hidden gems across the Middle East and sharing cultural experiences.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    category: 'Travel',
    location: 'Amman, Jordan',
    languages: ['Arabic', 'English', 'Spanish'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'layla_wanderlust',
        followers: 145000,
        engagement: 4.6,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'layla_travels',
        followers: 89000,
        engagement: 5.8,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'layla_travel',
        followers: 67000,
        engagement: 5.3,
        verified: false
      },
      {
        platform: 'facebook',
        username: 'layla_travels',
        followers: 54000,
        engagement: 4.1,
        verified: false
      }
    ],
    totalFollowers: 355000,
    avgEngagement: 4.9,
    startingRate: 900,
    isVerified: true,
    isFeatured: false
  },
  {
    id: '6',
    referenceId: 'INF-006',
    name: 'Khalid Fitness',
    username: 'khalid_gym',
    bio: 'Fitness trainer and bodybuilder promoting healthy lifestyle and workout routines for beginners.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    category: 'Fitness',
    location: 'Kuwait City, Kuwait',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'khalid_gym',
        followers: 195000,
        engagement: 5.7,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'khalid_fitness',
        followers: 134000,
        engagement: 6.2,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'khalid_gym',
        followers: 112000,
        engagement: 6.8,
        verified: true
      }
    ],
    totalFollowers: 441000,
    avgEngagement: 6.2,
    startingRate: 1100,
    isVerified: true,
    isFeatured: true
  },
  {
    id: '7',
    referenceId: 'INF-007',
    name: 'Nour Beauty',
    username: 'nour_skincare',
    bio: 'Beauty influencer specializing in skincare routines and halal cosmetics for Middle Eastern skin.',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    category: 'Beauty',
    location: 'Doha, Qatar',
    languages: ['Arabic', 'English', 'Turkish'],
    socialPlatforms: [
      {
        platform: 'instagram',
        username: 'nour_skincare',
        followers: 168000,
        engagement: 5.1,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'nour_beauty',
        followers: 125000,
        engagement: 6.3,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'nour_skincare',
        followers: 76000,
        engagement: 4.8,
        verified: false
      },
      {
        platform: 'snapchat',
        username: 'nour_snap',
        followers: 48000,
        engagement: 4.9,
        verified: false
      }
    ],
    totalFollowers: 417000,
    avgEngagement: 5.3,
    startingRate: 950,
    isVerified: true,
    isFeatured: false
  },
  {
    id: '8',
    referenceId: 'INF-008',
    name: 'Yousef Gaming',
    username: 'yousef_gamer',
    bio: 'Gaming content creator and esports commentator covering the latest games and tournaments.',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    category: 'Gaming',
    location: 'Riyadh, Saudi Arabia',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'youtube',
        username: 'yousef_gamer',
        followers: 245000,
        engagement: 7.2,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'yousef_gamer',
        followers: 89000,
        engagement: 8.1,
        verified: true
      },
      {
        platform: 'instagram',
        username: 'yousef_gaming',
        followers: 67000,
        engagement: 5.4,
        verified: false
      },
      {
        platform: 'tiktok',
        username: 'yousef_gamer',
        followers: 156000,
        engagement: 6.9,
        verified: true
      }
    ],
    totalFollowers: 557000,
    avgEngagement: 6.9,
    startingRate: 1800,
    isVerified: true,
    isFeatured: true
  },
  {
    id: '9',
    referenceId: 'INF-009',
    name: 'Mariam Education',
    username: 'mariam_learns',
    bio: 'Educational content creator making learning fun and accessible for Arabic-speaking students.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    category: 'Education',
    location: 'Muscat, Oman',
    languages: ['Arabic', 'English', 'French'],
    socialPlatforms: [
      {
        platform: 'youtube',
        username: 'mariam_education',
        followers: 198000,
        engagement: 5.9,
        verified: true
      },
      {
        platform: 'instagram',
        username: 'mariam_learns',
        followers: 89000,
        engagement: 4.7,
        verified: true
      },
      {
        platform: 'tiktok',
        username: 'mariam_education',
        followers: 134000,
        engagement: 6.1,
        verified: false
      }
    ],
    totalFollowers: 421000,
    avgEngagement: 5.6,
    startingRate: 850,
    isVerified: true,
    isFeatured: false
  },
  {
    id: '10',
    referenceId: 'INF-010',
    name: 'Hassan Business',
    username: 'hassan_entrepreneur',
    bio: 'Business coach and entrepreneur sharing insights on starting and scaling businesses in the MENA region.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    category: 'Business',
    location: 'Bahrain',
    languages: ['Arabic', 'English'],
    socialPlatforms: [
      {
        platform: 'linkedin',
        username: 'hassan_entrepreneur',
        followers: 125000,
        engagement: 4.8,
        verified: true
      },
      {
        platform: 'youtube',
        username: 'hassan_business',
        followers: 89000,
        engagement: 5.3,
        verified: true
      },
      {
        platform: 'instagram',
        username: 'hassan_entrepreneur',
        followers: 67000,
        engagement: 4.2,
        verified: false
      },
      {
        platform: 'twitter',
        username: 'hassan_business',
        followers: 45000,
        engagement: 5.1,
        verified: false
      }
    ],
    totalFollowers: 326000,
    avgEngagement: 4.9,
    startingRate: 2000,
    isVerified: true,
    isFeatured: false
  }
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const getInfluencerById = (id: string): Influencer | undefined => {
  return mockInfluencers.find(influencer => influencer.id === id)
}

export const getInfluencerByReferenceId = (referenceId: string): Influencer | undefined => {
  return mockInfluencers.find(influencer => influencer.referenceId === referenceId)
}

export const getInfluencersByCategory = (category: string): Influencer[] => {
  return mockInfluencers.filter(influencer =>
    influencer.category.toLowerCase() === category.toLowerCase()
  )
}

export const getFeaturedInfluencers = (): Influencer[] => {
  return mockInfluencers.filter(influencer => influencer.isFeatured)
}

export const getVerifiedInfluencers = (): Influencer[] => {
  return mockInfluencers.filter(influencer => influencer.isVerified)
}

export const searchInfluencers = (query: string): Influencer[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockInfluencers.filter(influencer =>
    influencer.name.toLowerCase().includes(lowercaseQuery) ||
    influencer.username.toLowerCase().includes(lowercaseQuery) ||
    influencer.bio.toLowerCase().includes(lowercaseQuery) ||
    influencer.category.toLowerCase().includes(lowercaseQuery) ||
    influencer.location.toLowerCase().includes(lowercaseQuery)
  )
}
