// ============================================================================
// UPDATE CONTACT REQUEST STATUS SERVER ACTION
// ============================================================================

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Validation schema for updating contact request status
const UpdateContactRequestStatusSchema = z.object({
  id: z.string().min(1, 'Contact request ID is required'),
  status: z.enum(['PENDING', 'RESPONDED', 'COMPLETED', 'CANCELLED'])
})

export type UpdateContactRequestStatusInput = z.infer<typeof UpdateContactRequestStatusSchema>

export interface UpdateContactRequestStatusResponse {
  success: boolean
  message: string
  contactRequestId?: string
}

/**
 * Server action to update contact request status
 */
export async function updateContactRequestStatus(input: UpdateContactRequestStatusInput): Promise<UpdateContactRequestStatusResponse> {
  try {
    // Validate input
    const validatedInput = UpdateContactRequestStatusSchema.parse(input)

    // Check if contact request exists
    const existingContactRequest = await prisma.contactRequest.findUnique({
      where: { id: validatedInput.id }
    })

    if (!existingContactRequest) {
      return {
        success: false,
        message: 'Contact request not found'
      }
    }

    // Update contact request status
    const updatedContactRequest = await prisma.contactRequest.update({
      where: { id: validatedInput.id },
      data: {
        status: validatedInput.status
      }
    })

    return {
      success: true,
      message: 'Contact request status updated successfully!',
      contactRequestId: updatedContactRequest.id
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error updating contact request status:', error)
    return {
      success: false,
      message: 'Failed to update contact request status. Please try again.'
    }
  }
}
