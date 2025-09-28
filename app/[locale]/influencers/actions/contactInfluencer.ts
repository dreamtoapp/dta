// ============================================================================
// CONTACT INFLUENCER SERVER ACTION
// ============================================================================

import { z } from 'zod'
import type { Influencer } from '../helpers/types'

// Validation schema for contact form
const ContactInfluencerSchema = z.object({
  influencerId: z.string().min(1, 'Influencer ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  campaignType: z.enum(['sponsored_post', 'story', 'reel', 'video', 'collaboration', 'other']).optional(),
  timeline: z.string().optional(),
})

export type ContactInfluencerInput = z.infer<typeof ContactInfluencerSchema>

export interface ContactInfluencerResponse {
  success: boolean
  message: string
  requestId?: string
}

/**
 * Server action to handle influencer contact requests
 */
export async function contactInfluencer(input: ContactInfluencerInput): Promise<ContactInfluencerResponse> {
  try {
    // Validate input
    const validatedInput = ContactInfluencerSchema.parse(input)

    // TODO: In production, this would:
    // 1. Save to database
    // 2. Send email notification to influencer
    // 3. Send confirmation email to client
    // 4. Create follow-up task

    console.log('Contact request received:', validatedInput)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'Your contact request has been sent successfully!',
      requestId: `req_${Date.now()}`
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error processing contact request:', error)
    return {
      success: false,
      message: 'Failed to send contact request. Please try again.'
    }
  }
}

/**
 * Server action to get contact form options
 */
export async function getContactFormOptions() {
  return {
    campaignTypes: [
      { value: 'sponsored_post', label: 'Sponsored Post' },
      { value: 'story', label: 'Story' },
      { value: 'reel', label: 'Reel' },
      { value: 'video', label: 'Video' },
      { value: 'collaboration', label: 'Collaboration' },
      { value: 'other', label: 'Other' },
    ],
    timelines: [
      { value: 'asap', label: 'ASAP' },
      { value: '1_week', label: 'Within 1 week' },
      { value: '2_weeks', label: 'Within 2 weeks' },
      { value: '1_month', label: 'Within 1 month' },
      { value: 'flexible', label: 'Flexible' },
    ],
    budgetRanges: [
      { value: 'under_500', label: 'Under $500' },
      { value: '500_1000', label: '$500 - $1,000' },
      { value: '1000_5000', label: '$1,000 - $5,000' },
      { value: '5000_10000', label: '$5,000 - $10,000' },
      { value: 'over_10000', label: 'Over $10,000' },
    ]
  }
}
