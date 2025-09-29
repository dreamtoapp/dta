'use server'

import { z } from 'zod'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Validation schema for updating influencer
const UpdateInfluencerSchema = z.object({
  id: z.string().min(1, 'Influencer ID is required'),
  referenceId: z.string().min(1, 'Reference ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  category: z.enum(['LIFESTYLE', 'FASHION', 'BEAUTY', 'TECH', 'GAMING', 'FOOD', 'TRAVEL', 'FITNESS', 'BUSINESS', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'ART', 'MUSIC', 'PHOTOGRAPHY']),
  location: z.string().min(2, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  influencerRate: z.number().min(0, 'Influencer rate must be positive'),
  agencyRate: z.number().min(0, 'Agency rate must be positive'),
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  isActive: z.boolean(),
  status: z.enum(['ACTIVE', 'PENDING_VERIFICATION', 'INACTIVE', 'SUSPENDED']),
  avatar: z.string().optional(),
  coverImage: z.string().optional(),
  testimonialImage: z.string().optional(),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'WHATSAPP', 'TELEGRAM']),
    username: z.string(),
    followers: z.number().min(0),
    isVerified: z.boolean(),
    isActive: z.boolean()
  }))
})

export async function updateInfluencer(data: any) {
  try {
    console.log('updateInfluencer called with data:', JSON.stringify(data, null, 2))

    // Validate the input data
    const validatedData = UpdateInfluencerSchema.parse(data)
    console.log('Validated data:', JSON.stringify(validatedData, null, 2))

    // Check if influencer exists
    const existingInfluencer = await db.influencer.findUnique({
      where: { id: validatedData.id }
    })
    console.log('Existing influencer:', existingInfluencer)

    if (!existingInfluencer) {
      console.log('Influencer not found with ID:', validatedData.id)
      return {
        success: false,
        message: 'Influencer not found'
      }
    }

    // Update influencer data
    const updateData = {
      referenceId: validatedData.referenceId,
      name: validatedData.name,
      username: validatedData.username,
      email: validatedData.email,
      phone: validatedData.phone || null,
      bio: validatedData.bio,
      category: validatedData.category,
      location: validatedData.location,
      languages: validatedData.languages,
      influencerRate: validatedData.influencerRate,
      agencyRate: validatedData.agencyRate,
      isVerified: validatedData.isVerified,
      isFeatured: validatedData.isFeatured,
      isActive: validatedData.isActive,
      status: validatedData.status,
      avatar: validatedData.avatar || null,
      coverImage: validatedData.coverImage || null,
      testimonialImage: validatedData.testimonialImage || null,
      totalFollowers: validatedData.socialPlatforms.reduce((total, platform) => total + platform.followers, 0)
    }
    console.log('Update data:', JSON.stringify(updateData, null, 2))

    const updatedInfluencer = await db.influencer.update({
      where: { id: validatedData.id },
      data: updateData
    })
    console.log('Updated influencer:', updatedInfluencer)

    // Update social platforms
    for (const platformData of validatedData.socialPlatforms) {
      // Platform is already validated as enum
      const platformEnum = platformData.platform

      await db.socialPlatform.upsert({
        where: {
          influencerId_platform: {
            influencerId: validatedData.id,
            platform: platformEnum
          }
        },
        update: {
          username: platformData.username,
          followers: platformData.followers,
          isVerified: platformData.isVerified,
          isActive: platformData.isActive
        },
        create: {
          platform: platformEnum,
          username: platformData.username,
          followers: platformData.followers,
          isVerified: platformData.isVerified,
          isActive: platformData.isActive,
          influencerId: validatedData.id
        }
      })
    }

    // Revalidate dashboard stats
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/influencers')

    console.log('Update completed successfully')
    return {
      success: true,
      message: 'Influencer updated successfully',
      data: updatedInfluencer
    }
  } catch (error) {
    console.error('Error updating influencer:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error',
        errors: error.errors
      }
    }

    return {
      success: false,
      message: 'Failed to update influencer'
    }
  }
}