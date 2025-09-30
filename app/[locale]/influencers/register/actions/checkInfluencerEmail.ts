"use server"

import db from "@/lib/prisma"

export async function checkInfluencerEmail(email: string) {
  try {
    // Normalize email to lowercase for case-insensitive search
    const normalizedEmail = email.toLowerCase().trim()

    console.log("Checking email:", normalizedEmail)

    // Try to find by exact match first
    let influencer = await db.influencer.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true, name: true }
    })

    // If not found, try case-insensitive search
    if (!influencer) {
      influencer = await db.influencer.findFirst({
        where: {
          email: {
            equals: normalizedEmail,
            mode: 'insensitive'
          }
        },
        select: { id: true, email: true, name: true }
      })
    }

    console.log("Found influencer:", influencer ? "Yes" : "No")

    if (influencer) {
      return {
        success: true,
        exists: true,
        message: "Email found"
      }
    }

    return {
      success: true,
      exists: false,
      message: "Email not found"
    }
  } catch (error) {
    console.error("Error checking influencer email:", error)
    return {
      success: false,
      exists: false,
      message: "An error occurred"
    }
  }
}
