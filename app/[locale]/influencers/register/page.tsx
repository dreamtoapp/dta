// Enable ISR with 1 hour revalidation (static shell with dynamic form)
export const revalidate = 3600;

import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import { getDynamicMetadata } from '@/app/seo/metadata'
import InfluencerRegisterClient from './components/InfluencerRegisterClient'

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/influencers/register', locale);
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function InfluencerRegisterPage() {
  const locale = await getLocale()

  return (
    <div className="min-h-screen bg-background">
      <InfluencerRegisterClient locale={locale} />
    </div>
  )
}









