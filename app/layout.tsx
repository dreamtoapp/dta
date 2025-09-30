import './globals.css';

// Minimal metadata - detailed metadata handled by locale layout
export const metadata = {
  manifest: '/manifest.json',
  metadataBase: new URL('https://www.dreamto.app'),
};

import NextTopLoader from 'nextjs-toploader';
import { getLocale } from 'next-intl/server';
import { Directions } from '@/constant/enums';
import Script from 'next/script';

import { Toaster } from '@/components/ui/sonner';
import { tajawal } from './font';
import { ThemeProvider } from '@/provider/theme-provider';
import BackToTopWrapper from '@/components/ui/BackToTopWrapper';
import { GTMProvider } from '@/components/GTMProvider';
import GTM from '@/components/GTM';
import GTMHead from '@/components/GTMHead';

// Loading component for suspense boundaries
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? Directions.LTR : Directions.RTL}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head suppressHydrationWarning>
        {/* GTM DataLayer Initialization */}
        <GTMHead />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* GTM Resource Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${tajawal.className} min-h-screen bg-background antialiased`}>
        {/* GTM Implementation */}
        <GTM />

        <NextTopLoader />

        <main id="main-content" tabIndex={-1} role="main">
          <ThemeProvider>
            <GTMProvider locale={locale}>
              {children}
            </GTMProvider>
          </ThemeProvider>
        </main>

        <footer role="contentinfo" className="border-t">
          {/* Insert global footer here if needed */}
        </footer>

        <Toaster position="top-right" />
        <BackToTopWrapper />
      </body>
    </html>
  );
}

// To analyze your bundle, run: BUNDLE_ANALYZE=true pnpm build
// import withBundleAnalyzer from '@next/bundle-analyzer';