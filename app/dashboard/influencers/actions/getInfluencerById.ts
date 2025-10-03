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
      where: { id }
    })

    if (!influencer) {
      return null
    }

    // Get social platforms separately since they're not a relation
    const socialPlatforms = await db.socialPlatform.findMany({
      where: { influencerId: id }
    })

    // Calculate total followers from social platforms
    const totalFollowers = socialPlatforms.reduce(
      (total: number, platform: any) => total + Number(platform.followers),
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
      influencerRate: Number(influencer.influencerRate),
      agencyRate: Number(influencer.agencyRate),
      isVerified: influencer.isVerified,
      isFeatured: influencer.isFeatured,
      isActive: influencer.isActive,
      status: influencer.status,
      avatar: influencer.avatar || undefined,
      coverImage: influencer.coverImage || undefined,
      testimonialImage: influencer.testimonialImage || undefined,
      socialPlatforms: socialPlatforms.map((platform: any) => ({
        platform: platform.platform,
        username: platform.username,
        followers: Number(platform.followers),
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
