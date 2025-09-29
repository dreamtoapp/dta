// ============================================================================
// CONTACT INFLUENCER SERVER ACTION
// ============================================================================

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import type { Influencer } from '../helpers/types'

const prisma = new PrismaClient()

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

    // Check if influencer exists
    const influencer = await prisma.influencer.findUnique({
      where: { id: validatedInput.influencerId },
      select: { id: true, name: true, email: true, username: true }
    })

    if (!influencer) {
      return {
        success: false,
        message: 'Influencer not found'
      }
    }

    // Save contact request to database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: validatedInput.name,
        email: validatedInput.email,
        phone: validatedInput.phone,
        company: validatedInput.company,
        message: validatedInput.message,
        budget: validatedInput.budget,
        campaignType: validatedInput.campaignType,
        timeline: validatedInput.timeline,
        status: 'PENDING',
        influencerId: validatedInput.influencerId
      }
    })

    // Send email notifications
    try {
      const { sendEmail, createInfluencerContactNotificationEmail, createClientContactConfirmationEmail, createAdminInfluencerNotificationEmail } = await import('@/lib/email')

      // Send notification to influencer
      const influencerEmail = createInfluencerContactNotificationEmail(
        influencer.email,
        influencer.name,
        validatedInput.name,
        validatedInput.email,
        validatedInput.company || '',
        validatedInput.message,
        validatedInput.budget || '',
        validatedInput.campaignType || '',
        validatedInput.timeline || '',
        'en' // TODO: Get locale from request
      )
      await sendEmail(influencerEmail)

      // Send confirmation to client
      const clientEmail = createClientContactConfirmationEmail(
        validatedInput.email,
        validatedInput.name,
        influencer.name,
        influencer.username,
        'en' // TODO: Get locale from request
      )
      await sendEmail(clientEmail)

      // Send notification to admin
      const adminEmail = createAdminInfluencerNotificationEmail(
        process.env.ADMIN_EMAIL || 'admin@dreamtoapp.com',
        influencer.name,
        influencer.username,
        validatedInput.name,
        validatedInput.email,
        validatedInput.company || '',
        validatedInput.message,
        validatedInput.budget || '',
        validatedInput.campaignType || '',
        'en' // TODO: Get locale from request
      )
      await sendEmail(adminEmail)

      console.log('Email notifications sent successfully')
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError)
      // Don't fail the request if email fails
    }

    console.log('Contact request saved:', contactRequest.id)

    return {
      success: true,
      message: 'Your contact request has been sent successfully!',
      requestId: contactRequest.id
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
