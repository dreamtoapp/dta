import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import Link from '@/components/link';
import { WifiOff, RefreshCw, Home } from 'lucide-react';

export default async function OfflinePage() {
  const t = await getTranslations('offline');
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('tryAgain')}
          </button>

          <Link
            href={`/${locale}`}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('goHome')}
          </Link>
        </div>

        {/* Cached Pages Info */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium text-foreground mb-2">
            {t('availableOffline')}
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• {t('homepage')}</li>
            <li>• {t('services')}</li>
            <li>• {t('portfolio')}</li>
            <li>• {t('contact')}</li>
          </ul>
        </div>

        {/* App Info */}
        <div className="mt-6 text-xs text-muted-foreground">
          <p>DreamToApp IT Solutions</p>
          <p>v3.1.12</p>
        </div>
      </div>
    </div>
  );
} 