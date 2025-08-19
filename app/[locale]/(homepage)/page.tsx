export const dynamic = "force-dynamic";
import { getTranslations } from 'next-intl/server';
import CromboDetail from './component/CromboDetail';
import Services from './component/Services';
import FromIdea from './component/FromIdea';
import WhyChooseUs from './component/WhyChooseUs';
import DesinAndDiscover from './component/DesinAndDiscover';
import HeroSection from '@/components/heroBanner/NewHero';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');

  return {
    title: {
      default: t('title'),
      template: '%s | DreamToApp IT Solutions',
    },
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://www.dreamto.app',
      siteName: 'DreamToApp IT Solutions',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'DreamToApp IT Solutions',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@dreamtoapp',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://www.dreamto.app',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-[#99e4ff]/5 dom-optimized">
      {/* Enhanced Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: t('organization.name'),
              url: 'https://www.dreamto.app',
              logo: 'https://www.dreamto.app/og-image.png',
              description: t('description'),
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Jeddah',
                addressCountry: 'SA'
              },
              sameAs: [
                'https://www.linkedin.com/company/dreamto',
                'https://twitter.com/dreamtoapp'
              ],
              contactPoint: [{
                '@type': 'ContactPoint',
                telephone: '+966554113107',
                contactType: 'customer service',
                areaServed: 'SA',
                availableLanguage: ['English', 'Arabic']
              }],
              serviceArea: {
                '@type': 'Country',
                name: 'Saudi Arabia'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Web Development Services',
              provider: {
                '@type': 'Organization',
                name: t('organization.name')
              },
              description: 'Professional web development, mobile app development, and digital marketing services',
              serviceType: 'Web Development',
              areaServed: 'Saudi Arabia'
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t('breadcrumb.home'),
                  item: 'https://www.dreamto.app'
                }
              ]
            }
          ])
        }}
      />

      {/* Hero Section - Full Viewport Height */}
      <section
        aria-label={t('sections.hero')}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#d7a50d]/10 via-transparent to-[#0d3ad7]/10" />
        <div className="relative z-10 w-full">
          <HeroSection />
        </div>
      </section>

      {/* Crombo Section - Prominent Placement */}
      <section
        aria-label={t('sections.cromboDetails')}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#d7a50d]/10 to-[#0d3ad7]/10"
      >
        <div className="max-w-6xl mx-auto">
          <CromboDetail />
        </div>
      </section>

      {/* Services Section - Core Offering */}
      <section
        aria-label={t('services')}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <Services />
        </div>
      </section>

      {/* Why Choose Us Section - Trust Building */}
      <section
        aria-label={t('whyChooseUs')}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#99e4ff]/5 to-[#0d3ad7]/5"
      >
        <div className="max-w-7xl mx-auto">
          <WhyChooseUs />
        </div>
      </section>

      {/* Content Sections - Two Column Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-[#d7a50d]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 grid-optimized">
            {/* From Idea Section */}
            <div className="space-y-6">
              <FromIdea />
            </div>

            {/* Discover Section */}
            <div className="space-y-6">
              <DesinAndDiscover />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
