import Image from "next/image";
import { isRTL } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { locales } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Directions } from '@/constant/enums';
import Link from "@/components/link";
import Navbar from '@/components/naviqation/navbar';
import Footer from './(homepage)/component/Footer';
import FloatingConsultationCTA from '@/components/ui/FloatingConsultationCTA';
// import PWAStatus from '@/components/PWAStatus';

type Locale = typeof locales[number];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      template: '%s | DreamToApp',
      default: 'DreamTo - Your Dream Platform',
    },
    description: 'DreamTo - Your platform for dreams and aspirations',
    metadataBase: new URL('https://dreamto.app'),
    alternates: {
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen layout-stable" dir={isRTL(locale) ? 'rtl' : 'ltr'}>
        <Suspense fallback={<div className="h-20 bg-muted animate-pulse">Loading navbar...</div>}>
          <Navbar locale={locale} />
        </Suspense>
        {/* PWAStatus removed per request */}
        <main className="flex-1 layout-stable prevent-layout-shift">
          <Suspense fallback={<div className="min-h-screen bg-muted animate-pulse">Loading...</div>}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={<div className="h-16 bg-muted animate-pulse">Loading...</div>}>
          <FloatingConsultationCTA />
        </Suspense>
      </div>
    </NextIntlClientProvider>
  );
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
