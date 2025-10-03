// ============================================================================
// DELETE INFLUENCER SERVER ACTION
// ============================================================================

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Validation schema for deleting influencer
const DeleteInfluencerSchema = z.object({
  id: z.string().min(1, 'Influencer ID is required')
})

export type DeleteInfluencerInput = z.infer<typeof DeleteInfluencerSchema>

export interface DeleteInfluencerResponse {
  success: boolean
  message: string
}

/**
 * Server action to delete an influencer
 */
export async function deleteInfluencer(input: DeleteInfluencerInput): Promise<DeleteInfluencerResponse> {
  try {
    // Validate input
    const validatedInput = DeleteInfluencerSchema.parse(input)

    // Check if influencer exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { id: validatedInput.id },
    })

    if (!existingInfluencer) {
      return {
        success: false,
        message: 'Influencer not found'
      }
    }

    // Note: ProjectRequest doesn't have influencerId field, so we skip the contact request check

    // Delete influencer (cascade will handle related records)
    await prisma.influencer.delete({
      where: { id: validatedInput.id }
    })

    return {
      success: true,
      message: 'Influencer deleted successfully!'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error deleting influencer:', error)
    return {
      success: false,
      message: 'Failed to delete influencer. Please try again.'
    }
  }
}
