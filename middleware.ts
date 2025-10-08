import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Run intl middleware first
  const response = intlMiddleware(request);

  // Skip tracking for API routes, static files, and dashboard
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/dashboard') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/)
  ) {
    return response;
  }

  // Skip tracking in local dev to avoid noisy errors
  const host = request.headers.get('host') || '';
  if (!host.includes('localhost')) {
    // Track visitor asynchronously (non-blocking)
    trackVisitor(request).catch(() => { });
  }

  return response;
}

async function trackVisitor(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown';

    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    const { pathname, searchParams } = request.nextUrl;

    // Only track valid IPs
    if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return;
    }

    // Get Vercel geolocation data (Vercel adds geo property to request)
    const geo = (request as any).geo;

    // Call API to track visitor (fire and forget)
    const trackingData = {
      ip,
      userAgent,
      referer,
      currentPage: pathname,
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      // Include Vercel geolocation data
      geo: geo ? {
        country: geo.country,
        city: geo.city,
        region: geo.region,
      } : null,
    };

    // Use fetch with timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    await fetch(`${request.nextUrl.origin}/api/track-visitor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackingData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (error) {
    // Silent error - tracking should never affect user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('Visitor tracking error:', error);
    }
  }
}

export const config = {
  // Match only internationalized pathnames (exclude API)
  matcher: [
    '/',
    '/(ar|en)/:path*',
    // Exclude /api, /_next, /_vercel and static assets
    '/((?!api|_next|_vercel|.*\..*).*)'
  ]
};
