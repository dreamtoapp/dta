// ============================================================================
// CREATE INFLUENCER SERVER ACTION
// ============================================================================

'use server'

import { z } from 'zod'
import db from '@/lib/prisma'
import { PLATFORM_OPTIONS } from '@/lib/enums/influencerEnums'
import { revalidatePath } from 'next/cache'

// Validation schema for creating influencer
const CreateInfluencerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().optional(),
  coverImage: z.string().optional(),
  testimonialImage: z.string().optional(),
  category: z.enum(['LIFESTYLE', 'FASHION', 'BEAUTY', 'TECH', 'GAMING', 'FOOD', 'TRAVEL', 'FITNESS', 'BUSINESS', 'EDUCATION', 'ENTERTAINMENT', 'SPORTS', 'ART', 'MUSIC', 'PHOTOGRAPHY']),
  location: z.string().min(2, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  influencerRate: z.number().min(0, 'Influencer rate must be positive'),
  agencyRate: z.number().min(0, 'Agency rate must be positive'),
  socialPlatforms: z.array(z.object({
    platform: z.enum(['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'SNAPCHAT', 'FACEBOOK', 'TWITTER', 'LINKEDIN', 'WHATSAPP', 'TELEGRAM']),
    username: z.string().min(1, 'Platform username is required'),
    followers: z.number().min(0, 'Followers must be positive'),
    verified: z.boolean()
  })),
  isVerified: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true)
})

export type CreateInfluencerInput = z.infer<typeof CreateInfluencerSchema>

export interface CreateInfluencerResponse {
  success: boolean
  message: string
  influencerId?: string
}

/**
 * Generate unique reference ID for influencer
 */
function generateReferenceId(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `INF-${timestamp}-${random}`
}

/**
 * Calculate total followers from all platforms
 */
function calculateTotalFollowers(socialPlatforms: any[]): number {
  return socialPlatforms.reduce((total, platform) => total + (platform.followers || 0), 0)
}

/**
 * Server action to create a new influencer
 */
export async function createInfluencer(input: CreateInfluencerInput): Promise<CreateInfluencerResponse> {
  try {
    // Validate input
    const validatedInput = CreateInfluencerSchema.parse(input)

    // Check if username or email already exists
    const existingInfluencer = await db.influencer.findFirst({
      where: {
        OR: [
          { username: validatedInput.username },
          { email: validatedInput.email }
        ]
      }
    })

    if (existingInfluencer) {
      return {
        success: false,
        message: existingInfluencer.username === validatedInput.username
          ? 'Username already exists'
          : 'Email already exists'
      }
    }

    // Calculate total followers
    const totalFollowers = calculateTotalFollowers(validatedInput.socialPlatforms)

    // Create influencer with social platforms
    const influencer = await db.influencer.create({
      data: {
        referenceId: generateReferenceId(),
        name: validatedInput.name,
        username: validatedInput.username,
        email: validatedInput.email,
        phone: validatedInput.phone || "",
        bio: validatedInput.bio,
        avatar: validatedInput.avatar,
        coverImage: validatedInput.coverImage,
        testimonialImage: validatedInput.testimonialImage,
        category: validatedInput.category,
        location: validatedInput.location,
        languages: validatedInput.languages,
        influencerRate: validatedInput.influencerRate,
        agencyRate: validatedInput.agencyRate,
        totalFollowers,
        isVerified: validatedInput.isVerified,
        isFeatured: validatedInput.isFeatured,
        isActive: validatedInput.isActive,
        status: 'PENDING_VERIFICATION',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Create social platforms separately
    for (const platform of validatedInput.socialPlatforms) {
      await db.socialPlatform.create({
        data: {
          influencerId: influencer.id,
          platform: platform.platform,
          username: platform.username,
          followers: platform.followers,
          isVerified: platform.verified,
          isActive: true,
          lastUpdated: new Date()
        }
      })
    }

    // Revalidate dashboard stats
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/influencers')

    return {
      success: true,
      message: 'Influencer created successfully!',
      influencerId: influencer.id
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error creating influencer:', error)
    return {
      success: false,
      message: 'Failed to create influencer. Please try again.'
    }
  }
}
