import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames (exclude API)
  matcher: [
    '/',
    '/(ar|en)/:path*',
    // Exclude /api, /_next, /_vercel and static assets
    '/((?!api|_next|_vercel|.*\..*).*)'
  ]
};
