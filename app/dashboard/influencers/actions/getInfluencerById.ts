'use server'

import db from '@/lib/prisma'

export interface InfluencerDetail {
  id: string
  referenceId: string
  name: string
  username: string
  email: string
  phone: string | null
  bio: string
  category: string
  location: string
  languages: string[]
  totalFollowers: number
  influencerRate: number
  agencyRate: number
  isVerified: boolean
  isFeatured: boolean
  isActive: boolean
  status: string
  avatar?: string
  coverImage?: string
  testimonialImage?: string
  socialPlatforms: {
    platform: string
    username: string
    followers: number
    isVerified: boolean
    isActive: boolean
  }[]
  createdAt: string
  updatedAt: string
}

export async function getInfluencerById(id: string): Promise<InfluencerDetail | null> {
  try {
    const influencer = await db.influencer.findUnique({
      where: { id },
      include: {
        socialPlatforms: true
      }
    })

    if (!influencer) {
      return null
    }

    // Calculate total followers from social platforms
    const totalFollowers = influencer.socialPlatforms.reduce(
      (total, platform) => total + platform.followers,
      0
    )

    return {
      id: influencer.id,
      referenceId: influencer.referenceId,
      name: influencer.name,
      username: influencer.username,
      email: influencer.email,
      phone: influencer.phone,
      bio: influencer.bio,
      category: influencer.category,
      location: influencer.location,
      languages: influencer.languages,
      totalFollowers,
      influencerRate: influencer.influencerRate,
      agencyRate: influencer.agencyRate,
      isVerified: influencer.isVerified,
      isFeatured: influencer.isFeatured,
      isActive: influencer.isActive,
      status: influencer.status,
      avatar: influencer.avatar || undefined,
      coverImage: influencer.coverImage || undefined,
      testimonialImage: influencer.testimonialImage || undefined,
      socialPlatforms: influencer.socialPlatforms.map(platform => ({
        platform: platform.platform,
        username: platform.username,
        followers: platform.followers,
        isVerified: platform.isVerified,
        isActive: platform.isActive
      })),
      createdAt: influencer.createdAt.toISOString(),
      updatedAt: influencer.updatedAt.toISOString()
    }
  } catch (error) {
    console.error('Error fetching influencer:', error)
    return null
  }
}
