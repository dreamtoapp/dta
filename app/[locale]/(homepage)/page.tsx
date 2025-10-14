// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getDynamicMetadata } from '@/app/seo/metadata';
import CromboDetail from './component/CromboDetail';
import Services from './component/Services';
import FromIdea from './component/FromIdea';
import WhyChooseUs from './component/WhyChooseUs';
import DesinAndDiscover from './component/DesinAndDiscover';
import SchemaMarkup from './component/SchemaMarkup';
import ImageHero from './component/hero/ImageHero';
import MobileImageHero from './component/hero/MobileImageHero';
import HomepageHeroSlider from './component/HomepageHeroSlider';
import ConsultationForm from './component/ConsultationForm';
import { PageSkeletonLoader } from './component/SkeletonLoader';
import ClientMarquee from './component/ClientMarquee';
import { fetchCloudinaryClientSlides } from './actions/cloudinaryActions';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';
import FAQSchema from '@/components/schema/FAQSchema';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getFAQsForPage } from '@/lib/actions/getFAQsForPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return await getDynamicMetadata('/', locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');

  // Fetch data in parallel for better performance
  const cloudinarySlides = await fetchCloudinaryClientSlides();

  // Breadcrumb items for homepage
  const breadcrumbItems = [
    { name: t('breadcrumb.home'), url: `https://www.dreamto.app/${locale}` }
  ];

  // Get FAQ data from database
  const faqData = await getFAQsForPage('/', locale as 'en' | 'ar');

  return (
    <div className="min-h-screen">
      <SchemaMarkup
        organizationName={t('organization.name')}
        description={t('description')}
        breadcrumbHome={t('breadcrumb.home')}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={faqData} />

      {/* Hero Section */}
      <section
        aria-label={t('sections.hero')}
        className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20 sm:pt-24 md:pt-20 lg:pt-24 w-full"
      >
        {/* SEO: Primary page heading overlaid on hero to avoid layout shift */}
        <h1 className="hidden md:block pointer-events-none absolute top-20 md:top-24 lg:top-28 left-1/2 -translate-x-1/2 z-20 text-base md:text-lg lg:text-xl font-bold tracking-tight text-foreground/90 text-center px-4 py-2 rounded-md bg-background/50 backdrop-blur-sm shadow-sm">
          {t('hero.title')} – {t('description')}
        </h1>
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#d7a50d]/10 via-transparent to-[#0d3ad7]/10" /> */}
        {/* Desktop Hero - Hidden on mobile */}
        <div className="hidden md:block w-full h-screen">
          <ImageHero
            publicIdOrUrl="v1759560288/Generated_Image_October_04_2025_-_9_43AM_q6hc7g"
            alt={`${t('organization.name')} - ${t('hero.tagline')} | ${t('hero.title')} - ${t('description')}`}
            transform="f_auto,q_auto,w_1920,c_fill,g_auto"
            sizes="100vw"
            className="w-full h-full"
          />
        </div>

        {/* Mobile Hero - Visible only on mobile */}
        <div className="block md:hidden w-full h-screen">
          <MobileImageHero
            publicIdOrUrl="v1759556765/Generated_Image_October_04_2025_-_8_44AM_a2qlt7"
            alt={`${t('organization.name')} - ${t('hero.tagline')} | ${t('hero.title')} - ${t('hero.description')}`}
            transform="f_auto,q_auto,w_auto,c_scale"
            sizes="100vw"
            className="w-full h-full"
          />
        </div>
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

      {/* FAQ Section */}
      {faqData.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('faq.title')}</h2>
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
      )}

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
