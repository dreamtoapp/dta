// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getDynamicMetadata } from '@/app/seo/metadata';
import ConsultationForm from '../(homepage)/component/ConsultationForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return await getDynamicMetadata('/free-consultation', locale);
}

export default async function FreeConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations('freeConsultation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Free Consultation - DreamToApp',
              description: 'Get professional consultation for your web and mobile app projects. Free expert advice from DreamToApp team.',
              url: 'https://www.dreamto.app/free-consultation',
              publisher: {
                '@type': 'LocalBusiness',
                name: 'DreamToApp',
                url: 'https://www.dreamto.app',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jeddah',
                  addressCountry: 'SA'
                },
                telephone: '+966554113107',
                email: 'info@dreamto.app'
              }
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.dreamto.app'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Free Consultation',
                  item: 'https://www.dreamto.app/free-consultation'
                }
              ]
            }
          ])
        }}
      />

      {/* Hero Section with Enhanced Design */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {t('heroBadge')}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight px-2">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('heroTitle')}
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-primary font-semibold max-w-2xl mx-auto leading-relaxed px-4">
            {t('heroTagline')}
          </p>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4 px-4">
            <a
              href="#consultation-form"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center"
            >
              <span>{t('getStartedNow')}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              href="https://wa.me/+966554113107?text=مرحباً، أريد استشارة مجانية مع DreamToApp"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#25D366] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#25D366]/90 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>{t('chatOnWhatsApp')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Form Section */}
      <section id="consultation-form" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('startYourConsultation')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('formSubtitle')}
            </p>
          </div>

          {/* Form Container with Enhanced Styling */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 lg:p-12 shadow-xl">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 px-4">
              {t('whyChooseUs')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {t('benefitsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Benefit 1 - Professional Expertise */}
            <div className="group relative p-6 sm:p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{t('benefit1Title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('benefit1Description')}</p>
              </div>
            </div>

            {/* Benefit 2 - Free & No Commitment */}
            <div className="group relative p-6 sm:p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{t('benefit2Title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('benefit2Description')}</p>
              </div>
            </div>

            {/* Benefit 3 - Fast Response */}
            <div className="group relative p-6 sm:p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">{t('benefit3Title')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{t('benefit3Description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types Section - Enhanced */}
      <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {t('consultationTypesBadge')}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('consultationTypesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('consultationTypesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Type 1 - New Projects */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {t('consultationType1Title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {t('consultationType1')}
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType1Advice1')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType1Advice2')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType1Advice3')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Type 2 - Existing Projects */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {t('consultationType2Title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {t('consultationType2')}
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType2Advice1')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType2Advice2')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType2Advice3')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Type 3 - Marketing Strategy */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {t('consultationType3Title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {t('consultationType3')}
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType3Advice1')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType3Advice2')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType3Advice3')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Type 4 - E-commerce */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {t('consultationType4Title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {t('consultationType4')}
                    </p>
                    <div className="space-y-2 pt-2">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType4Advice1')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType4Advice2')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-left rtl:text-right">{t('consultationType4Advice3')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
