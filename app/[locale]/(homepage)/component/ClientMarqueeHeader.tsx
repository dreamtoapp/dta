"use client";

import { useTranslations } from 'next-intl';

export default function ClientMarqueeHeader() {
  const t = useTranslations('homepage.clientMarquee');

  return (
    <div className="text-center mb-12 lg:mb-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-6">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        {t('badge')}
      </div>

      {/* Title */}
      <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
        {t('title')}
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {t('subtitle')}
      </p>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('trustIndicator1')}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('trustIndicator2')}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('trustIndicator3')}</span>
        </div>
      </div>
    </div>
  );
}


