export const dynamic = "force-dynamic";
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import CromboDetail from './component/CromboDetail';
import Services from './component/Services';
import FromIdea from './component/FromIdea';
import WhyChooseUs from './component/WhyChooseUs';
import DesinAndDiscover from './component/DesinAndDiscover';
import SchemaMarkup from './component/SchemaMarkup';
import ImageHero from './component/hero/ImageHero';
import HomepageHeroSlider from './component/HomepageHeroSlider';
import ConsultationForm from './component/ConsultationForm';
import { PageSkeletonLoader } from './component/SkeletonLoader';
import ClientMarquee from './component/ClientMarquee';
import { fetchCloudinaryClientSlides } from './actions/cloudinaryActions';

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

  // Fetch data in parallel for better performance
  const cloudinarySlides = await fetchCloudinaryClientSlides();

  return (
    <div className="min-h-screen">
      <SchemaMarkup
        organizationName={t('organization.name')}
        description={t('description')}
        breadcrumbHome={t('breadcrumb.home')}
      />

      {/* Hero Section */}
      <section
        aria-label={t('sections.hero')}
        className="relative md:min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#d7a50d]/10 via-transparent to-[#0d3ad7]/10" /> */}
        <ImageHero
          publicIdOrUrl="https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_1600,c_fill,g_auto/v1758786887/cover_wvhiz7.png"
          alt={t('sections.hero')}
        />
      </section>

      {/* Client Logos */}
      <section aria-label="Our clients" className="min-h-[144px] px-4 sm:px-6 lg:px-8">
        <ClientMarquee />
      </section>

      {/* Gallery Slider */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="h-96 bg-muted/20 rounded-lg animate-pulse" />}>
            <HomepageHeroSlider slides={cloudinarySlides} />
          </Suspense>
        </div>
      </section>

      {/* Consultation Form */}
      <section
        id="consultation"
        data-consultation
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-[#d7a50d]/5"
      >
        <ConsultationForm />
      </section>

      {/* Crombo Details */}
      <section
        aria-label={t('sections.cromboDetails')}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#d7a50d]/10 to-[#0d3ad7]/10"
      >
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="h-20 bg-muted/20 rounded animate-pulse" />}>
            <CromboDetail />
          </Suspense>
        </div>
      </section>

      {/* Services */}
      <section aria-label={t('services')} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<PageSkeletonLoader locale={locale} />}>
            <Services />
          </Suspense>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        aria-label={t('whyChooseUs')}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#99e4ff]/5 to-[#0d3ad7]/5"
      >
        <div className="max-w-7xl mx-auto">
          <WhyChooseUs />
        </div>
      </section>

      {/* From Idea & Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-[#d7a50d]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FromIdea />
            <DesinAndDiscover />
          </div>
        </div>
      </section>
    </div>
  );
}
