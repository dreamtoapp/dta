// Enable ISR with 1 hour revalidation (dynamic data from DB)
export const revalidate = 3600;

import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import db from "@/lib/prisma"
import { getDynamicMetadata } from '@/app/seo/metadata'
import InfluencerContractClient from "./components/InfluencerContractClient"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/influencers/contract', locale);
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
