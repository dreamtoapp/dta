// ============================================================================
// UPDATE INFLUENCER STATUS SERVER ACTION
// ============================================================================

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Validation schema for updating influencer status
const UpdateInfluencerStatusSchema = z.object({
  id: z.string().min(1, 'Influencer ID is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED']),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional()
})

export type UpdateInfluencerStatusInput = z.infer<typeof UpdateInfluencerStatusSchema>

export interface UpdateInfluencerStatusResponse {
  success: boolean
  message: string
  influencerId?: string
}

/**
 * Server action to update influencer status
 */
export async function updateInfluencerStatus(input: UpdateInfluencerStatusInput): Promise<UpdateInfluencerStatusResponse> {
  try {
    // Validate input
    const validatedInput = UpdateInfluencerStatusSchema.parse(input)

    // Check if influencer exists
    const existingInfluencer = await prisma.influencer.findUnique({
      where: { id: validatedInput.id }
    })

    if (!existingInfluencer) {
      return {
        success: false,
        message: 'Influencer not found'
      }
    }

    // Prepare update data
    const updateData: any = {
      status: validatedInput.status
    }

    if (validatedInput.isVerified !== undefined) {
      updateData.isVerified = validatedInput.isVerified
    }

    if (validatedInput.isFeatured !== undefined) {
      updateData.isFeatured = validatedInput.isFeatured
    }

    if (validatedInput.isActive !== undefined) {
      updateData.isActive = validatedInput.isActive
    }

    // Update influencer status
    const updatedInfluencer = await prisma.influencer.update({
      where: { id: validatedInput.id },
      data: updateData
    })

    return {
      success: true,
      message: 'Influencer status updated successfully!',
      influencerId: updatedInfluencer.id
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error updating influencer status:', error)
    return {
      success: false,
      message: 'Failed to update influencer status. Please try again.'
    }
  }
}
