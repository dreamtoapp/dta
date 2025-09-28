import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import InfluencersClientSection from './components/InfluencersClientSection'

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("influencers")
  const locale = await getLocale()

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      locale: locale,
    },
  }
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function InfluencersPage() {
  const t = await getTranslations("influencers")
  const locale = await getLocale()

  return (
    <div className="min-h-screen bg-background">
      <InfluencersClientSection />

      {/* Information Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <h3 className="text-xl font-bold mb-4">About Engagement Rate</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong>Avg Engagement</strong> is the average engagement rate across all of an influencer's social media platforms.
                </p>
                <p>
                  <strong>Engagement Rate</strong> measures how actively an influencer's audience interacts with their content, including likes, comments, shares, and saves.
                </p>
                <p>
                  <strong>How it's calculated:</strong> For each platform, engagement rate = (Total interactions ÷ Total followers) × 100. The average is then calculated by adding all platform engagement rates and dividing by the number of platforms.
                </p>
                <p>
                  <strong>Higher engagement rates</strong> indicate more active and engaged audiences, which is valuable for brands looking to partner with influencers.
                </p>
                <p className="text-sm">
                  <strong>Example:</strong> If an influencer has 4.2% engagement on Instagram, 5.1% on TikTok, 3.8% on YouTube, and 4.5% on Snapchat, their average engagement would be (4.2 + 5.1 + 3.8 + 4.5) ÷ 4 = 4.4%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}