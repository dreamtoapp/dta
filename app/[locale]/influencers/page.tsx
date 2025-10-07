// Enable ISR with 10 minute revalidation (influencer data changes moderately)
export const revalidate = 600;

import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import { getDynamicMetadata } from '@/app/seo/metadata'
import InfluencersClientSection from './components/InfluencersClientSection'
import Link from '@/components/link'
import { Button } from '@/components/ui/button'

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/influencers', locale);
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function InfluencersPage() {
  const t = await getTranslations("influencers")
  const locale = await getLocale()

  return (
    <div className="min-h-screen bg-background">
      {/* Primary page heading */}
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 pt-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          {t('pageTitle')}
        </h1>
        <Link href="/influencers/register">
          <Button className="whitespace-nowrap">
            انضم كمؤثر
          </Button>
        </Link>
      </div>
      <InfluencersClientSection />
    </div>
  )
}