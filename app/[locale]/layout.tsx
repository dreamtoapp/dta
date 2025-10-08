import { isRTL } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { locales } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Directions } from '@/constant/enums';
import { getDefaultMetadata } from '@/app/seo/metadata';
import Navbar from '@/components/naviqation/navbar';
import MobileBottomNav from '@/components/naviqation/MobileBottomNav';
import Footer from './(homepage)/component/Footer';

type Locale = typeof locales[number];

// Optimized SEO metadata configuration
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...getDefaultMetadata(locale),
    applicationName: 'DreamToApp',
    appleWebApp: {
      title: 'DreamToApp',
      statusBarStyle: 'default',
      capable: true,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
      apple: [
        { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
        { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
        { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

// Viewport configuration for Next.js 15
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d3ad7',
  colorScheme: 'light dark',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  // JSON-LD Schema for SEO optimization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'ar' ? 'دريم تو آب' : 'DreamToApp',
    description: locale === 'ar'
      ? 'شركة تطوير مواقع وتطبيقات في جدة، المملكة العربية السعودية'
      : 'Leading web & mobile development agency in Jeddah, Saudi Arabia',
    url: 'https://www.dreamto.app',
    logo: 'https://www.dreamto.app/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah',
      addressCountry: 'SA'
    },
    sameAs: [
      'https://twitter.com/dreamtoapp',
      'https://instagram.com/dreamtoapp'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: ['SA', 'AE']
    }
  };

  // WebSite JSON-LD with Sitelinks Search Box
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://www.dreamto.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://www.dreamto.app/${locale}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen layout-stable" dir={isRTL(locale) ? 'rtl' : 'ltr'}>
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />

        {/* Optimized navbar - removed unnecessary Suspense for navbar */}
        <Navbar locale={locale} />

        {/* Main content - optimized for Next.js 15 streaming */}
        <main className="flex-1 layout-stable prevent-layout-shift pb-20 md:pb-0">
          {children}
        </main>

        <Footer />

        {/* Mobile bottom nav - synchronous client component */}
        <MobileBottomNav locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
