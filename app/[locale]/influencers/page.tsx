// Enable ISR with 10 minute revalidation (influencer data changes moderately)
export const revalidate = 600;

import { getTranslations, getLocale } from "next-intl/server"
import { Metadata } from "next"
import { getDynamicMetadata } from '@/app/seo/metadata'
import InfluencersClientSection from './components/InfluencersClientSection'
import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FAQSchema from '@/components/schema/FAQSchema'
import { getFAQsForPage } from '@/lib/actions/getFAQsForPage'

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
  const tCommon = await getTranslations('homepage')
  const locale = await getLocale()
  const faqData = await getFAQsForPage('/influencers', locale as 'en' | 'ar')

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

      {/* FAQ Section */}
      {faqData.length > 0 && (
        <>
          <FAQSchema faqs={faqData} />
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">{tCommon('faq.title')}</h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}