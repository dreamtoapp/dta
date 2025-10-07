import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dreamto.app';
  const currentDate = new Date().toISOString();

  // Only final, localized URLs (no root entry that may redirect).
  // Keep sitemap focused on existing routes to avoid 4xx and redirects.
  const locales = ['en', 'ar'] as const;
  const slugs = [
    '',
    'services',
    'worksample',
    'team',
    'contactus',
    'privacy',
    'terms',
    'influencers',
    'influencers/register',
    'influencers/contract',
    'start-your-dream',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      const path = slug ? `/${locale}/${slug}` : `/${locale}`;
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: slug ? 'monthly' : 'weekly',
        priority: slug ? 0.8 : 1,
      });
    }
  }

  return entries;
}
