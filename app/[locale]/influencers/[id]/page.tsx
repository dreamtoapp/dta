// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import InfluencerDetailClient from './components/InfluencerDetailClient'
import { mockInfluencers } from '../helpers/mockData'

// ============================================================================
// STATIC PARAMS GENERATION
// ============================================================================

// Pre-render all influencer pages at build time
export async function generateStaticParams() {
  return mockInfluencers.map((influencer) => ({
    id: influencer.id,
  }));
}

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = await getTranslations("influencers")
  const locale = await getLocale()
  const { id } = await params

  const influencer = mockInfluencers.find(inf => inf.id === id)

  if (!influencer) {
    return {
      title: "Influencer Not Found",
      description: "The requested influencer could not be found."
    }
  }

  return {
    title: `${influencer.name} - ${t("pageTitle")}`,
    description: influencer.bio,
    openGraph: {
      title: `${influencer.name} - ${t("pageTitle")}`,
      description: influencer.bio,
      locale: locale,
      images: influencer.avatar ? [influencer.avatar] : [],
    },
  }
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function InfluencerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const influencer = mockInfluencers.find(inf => inf.id === id)

  if (!influencer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <InfluencerDetailClient influencer={influencer} />
    </div>
  )
}
