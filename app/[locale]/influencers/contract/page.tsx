import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import db from "@/lib/prisma"
import InfluencerContractClient from "./components/InfluencerContractClient"

export const metadata: Metadata = {
  title: "Collaboration Agreement | Dream to App",
  description: "View your collaboration agreement with Dream to App",
}

interface InfluencerContractPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ email?: string }>
}

export default async function InfluencerContractPage({
  params,
  searchParams,
}: InfluencerContractPageProps) {
  const { locale } = await params
  const { email } = await searchParams

  // If no email provided, redirect back to registration
  if (!email) {
    redirect(`/${locale}/influencers/register`)
  }

  // Normalize email to lowercase
  const normalizedEmail = email.toLowerCase().trim()

  // Verify email exists in database (case-insensitive)
  const influencer = await db.influencer.findFirst({
    where: {
      email: {
        equals: normalizedEmail,
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  // If email doesn't exist, redirect to registration
  if (!influencer) {
    redirect(`/${locale}/influencers/register`)
  }

  return (
    <InfluencerContractClient
      locale={locale}
      influencer={influencer}
    />
  )
}
