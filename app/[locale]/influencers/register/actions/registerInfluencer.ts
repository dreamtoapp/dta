"use server"

import { z } from "zod"
import db from "@/lib/prisma"

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const RegisterInfluencerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  category: z.enum([
    "LIFESTYLE", "FASHION", "BEAUTY", "TECH", "GAMING",
    "FOOD", "TRAVEL", "FITNESS", "BUSINESS", "EDUCATION",
    "ENTERTAINMENT", "SPORTS", "ART", "MUSIC", "PHOTOGRAPHY"
  ]),
  location: z.enum([
    "Riyadh, Saudi Arabia",
    "Dubai, UAE",
    "Jeddah, Saudi Arabia",
    "Cairo, Egypt",
    "Alexandria, Egypt"
  ]),
  totalFollowers: z.number().min(1000),
})

export type RegisterInfluencerInput = z.infer<typeof RegisterInfluencerSchema> & {
  locale?: string
}

export interface RegisterInfluencerResponse {
  success: boolean
  message: string
  influencerId?: string
  referenceId?: string
}

// ============================================================================
// GENERATE REFERENCE ID
// ============================================================================

async function generateReferenceId(): Promise<string> {
  const count = await db.influencer.count()
  const newNumber = count + 1
  return `INF-${String(newNumber).padStart(3, '0')}`
}

// ============================================================================
// SERVER ACTION
// ============================================================================

export async function registerInfluencer(input: RegisterInfluencerInput): Promise<RegisterInfluencerResponse> {
  try {
    // Validate input
    const validatedInput = RegisterInfluencerSchema.parse(input)

    // Normalize email to lowercase
    const normalizedEmail = validatedInput.email.toLowerCase().trim()

    // Check if email already exists
    const existingInfluencer = await db.influencer.findUnique({
      where: { email: normalizedEmail }
    })

    if (existingInfluencer) {
      return {
        success: false,
        message: 'This email is already registered. Please use a different email.'
      }
    }

    // Generate unique reference ID
    const referenceId = await generateReferenceId()

    // Create username from name (simple version)
    const username = validatedInput.name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now().toString().slice(-4)

    // Create influencer in database
    const influencer = await db.influencer.create({
      data: {
        referenceId,
        name: validatedInput.name,
        username,
        email: normalizedEmail,
        phone: validatedInput.phone || "",
        bio: validatedInput.bio,
        category: validatedInput.category,
        location: validatedInput.location,
        languages: ["Arabic", "English"], // Default languages
        influencerRate: 0, // To be set by admin
        agencyRate: 0, // To be set by admin
        totalFollowers: validatedInput.totalFollowers,
        status: "PENDING_VERIFICATION",
        isActive: true,
        isVerified: false,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Send email notification
    try {
      const { sendEmail, createInfluencerRegistrationEmail, createAdminInfluencerRegistrationNotification } = await import('@/lib/email')

      // Send confirmation email to influencer
      const influencerEmail = createInfluencerRegistrationEmail(
        validatedInput.email,
        validatedInput.name,
        referenceId,
        validatedInput.category,
        input.locale || 'en'
      )
      await sendEmail(influencerEmail)

      // Send notification to admin
      const adminEmail = createAdminInfluencerRegistrationNotification(
        process.env.ADMIN_EMAIL || 'info@dreamto.app',
        validatedInput.name,
        validatedInput.email,
        validatedInput.phone || 'N/A',
        referenceId,
        validatedInput.category,
        validatedInput.location,
        validatedInput.totalFollowers,
        input.locale || 'en'
      )
      await sendEmail(adminEmail)

      console.log('Email notifications sent successfully')
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError)
      // Don't fail the request if email fails
    }

    return {
      success: true,
      message: 'Registration successful! Our team will contact you within 48 hours.',
      influencerId: influencer.id,
      referenceId: influencer.referenceId
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      }
    }

    console.error('Error registering influencer:', error)
    return {
      success: false,
      message: 'Failed to register. Please try again later.'
    }
  }
}
