import { MetadataRoute } from 'next';
import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    'blog',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Add static pages
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

  // Add blog posts
  try {
    const blogPosts = await db.blogPost.findMany({
      where: {
        status: BlogStatus.PUBLISHED,
        publishedAt: { lte: new Date() }
      },
      select: {
        slugEn: true,
        slugAr: true,
        updatedAt: true,
        publishedAt: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });

    for (const post of blogPosts) {
      // English version
      entries.push({
        url: `${baseUrl}/en/blog/${post.slugEn}`,
        lastModified: post.updatedAt.toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });

      // Arabic version
      entries.push({
        url: `${baseUrl}/ar/blog/${post.slugAr}`,
        lastModified: post.updatedAt.toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return entries;
}
