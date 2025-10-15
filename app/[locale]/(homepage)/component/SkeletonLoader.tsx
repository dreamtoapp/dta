"use client";

import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  showText?: boolean;
  locale?: string;
}

/**
 * Next.js 15 Optimized Skeleton Loader
 * Used at page level inside Suspense boundaries for streaming content
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  lines = 3,
  showText = true,
  locale = 'en'
}) => {
  const loadingText = locale === 'ar' ? 'جارٍ التحميل...' : 'Loading...';

  return (
    <div className={cn("space-y-4", className)}>
      {/* Minimal animated spinner */}
      <div className="flex justify-center">
        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />

      </div>

      {/* Skeleton lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse rounded-md",
            i === 0 && "h-8 bg-muted w-3/4",
            i === 1 && "h-6 bg-muted w-1/2",
            i === 2 && "h-4 bg-muted w-full",
            i > 2 && "h-4 bg-muted w-5/6"
          )}
        />
      ))}

      {/* Optional loading text */}
      {showText && (
        <p className="text-sm text-muted-foreground text-center">
          {loadingText}
        </p>
      )}
    </div>
  );
};

/**
 * Page-level loading skeleton with proper layout simulation
 */
export const PageSkeletonLoader: React.FC<{ locale?: string }> = ({ locale = 'en' }) => (
  <div className="min-h-screen bg-background">
    {/* Header skeleton */}
    <div className="animate-pulse bg-muted h-16 w-full" />

    {/* Main content skeleton */}
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero section skeleton */}
      <div className="space-y-4">
        <div className="animate-pulse bg-muted h-12 w-3/4 mx-auto rounded" />
        <div className="animate-pulse bg-muted h-6 w-1/2 mx-auto rounded" />
      </div>

      {/* Content cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-background border rounded-lg p-6 space-y-4">
            <div className="animate-pulse bg-muted h-6 w-3/4 rounded" />
            <div className="animate-pulse bg-muted h-4 w-full rounded" />
            <div className="animate-pulse bg-muted h-4 w-5/6 rounded" />
          </div>
        ))}
      </div>
    </main>

    {/* Status indicator */}
    <div className="fixed bottom-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
      {locale === 'ar' ? 'جارٍ جلب البيانات...' : 'Fetching data...'}
    </div>
  </div>
);

export default SkeletonLoader;
