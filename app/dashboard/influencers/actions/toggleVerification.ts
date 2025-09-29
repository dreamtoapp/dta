'use server'

import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleInfluencerVerification(influencerId: string) {
  try {
    // Check if influencer exists
    const existingInfluencer = await db.influencer.findUnique({
      where: { id: influencerId }
    })

    if (!existingInfluencer) {
      return {
        success: false,
        message: 'Influencer not found'
      }
    }

    // Toggle verification status
    const updatedInfluencer = await db.influencer.update({
      where: { id: influencerId },
      data: {
        isVerified: !existingInfluencer.isVerified
      }
    })

    // Revalidate dashboard stats
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/influencers')

    return {
      success: true,
      message: `Influencer ${updatedInfluencer.isVerified ? 'verified' : 'unverified'} successfully`,
      isVerified: updatedInfluencer.isVerified
    }
  } catch (error) {
    console.error('Error toggling verification:', error)
    return {
      success: false,
      message: 'Failed to update verification status. Please try again.'
    }
  }
}
