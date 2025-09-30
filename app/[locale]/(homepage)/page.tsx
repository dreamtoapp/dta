export const dynamic = "force-dynamic";
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import CromboDetail from './component/CromboDetail';
import Services from './component/Services';
import FromIdea from './component/FromIdea';
import WhyChooseUs from './component/WhyChooseUs';
import DesinAndDiscover from './component/DesinAndDiscover';
import ImageHero from '@/components/heroBanner/ImageHero';
import HomepageHeroSlider from '@/components/slider/HomepageHeroSlider';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { PageSkeletonLoader } from '@/components/ui/SkeletonLoader';
import { getLocale } from 'next-intl/server';
import ClientMarquee from '@/components/home/ClientMarquee';

type HeroSlide = {
  id: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  header?: string;
  subheader?: string;
  discountPercentage?: number;
  isActive: boolean;
};

async function fetchCloudinaryClientSlides(): Promise<HeroSlide[]> {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) return [];

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;
    const folder = process.env.CLOUDINARY_CLIENTS_FOLDER || 'website/clients';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: `folder="${folder}" AND resource_type:image`,
        max_results: 12,
      }),
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = (data.resources || []) as any[];
    return items.map((r, idx) => ({
      id: r.public_id as string,
      imageUrl: r.secure_url as string,
      ctaText: 'استكشف الآن',
      ctaLink: '/clients',
      isActive: true,
    }));
  } catch {
    return [];
  }
}

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

// Async data-fetching component for streaming
async function HeroSliderWrapper() {
  const cloudinarySlides = await fetchCloudinaryClientSlides();
  return <HomepageHeroSlider slides={cloudinarySlides} />;
}

// Async translation component  
async function ServicesWrapper() {
  return <Services />;
}

async function CromboWrapper() {
  return <CromboDetail />;
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
          <ImageHero publicIdOrUrl="https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_1600,c_fill,g_auto/v1758786887/cover_wvhiz7.png" alt={t('sections.hero')} />
          {/* <div className="mt-8">
            <HeroSection />
          </div> */}
        </div>
      </section>

      {/* Clients Marquee (moved just under hero) */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-background/0">
        <div className="max-w-7xl mx-auto">
          <ClientMarquee />
        </div>
      </section>

      {/* Homepage Hero Slider - streaming with proper Suspense */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-background/0">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={
            <div className="h-96 bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-muted-foreground">
                {locale === 'ar' ? 'جارٍ تحميل المعرض...' : 'Loading gallery...'}
              </div>
            </div>
          }>
            <HeroSliderWrapper />
          </Suspense>
        </div>
      </section>

      {/* Free Consultation Form */}
      <section
        id="consultation"
        data-consultation
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-[#d7a50d]/5"
      >
        <div className="w-full">
          <ConsultationForm />
        </div>
      </section>

      {/* Crombo Section - streaming with Suspense */}
      <section
        aria-label={t('sections.cromboDetails')}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#d7a50d]/10 to-[#0d3ad7]/10"
      >
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted/20 rounded w-3/4" />
              <div className="h-4 bg-muted/20 rounded w-full" />
              <div className="h-4 bg-muted/20 rounded w-5/6" />
            </div>
          }>
            <CromboWrapper />
          </Suspense>
        </div>
      </section>

      {/* Services Section - streaming with Suspense */}
      <section
        aria-label={t('services')}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<PageSkeletonLoader locale={locale} />}>
            <ServicesWrapper />
          </Suspense>
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
