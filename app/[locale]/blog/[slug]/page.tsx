import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getBlogPost } from '../actions/getBlogPost';
import { incrementViews } from '../actions/incrementViews';
import BlogHeader from './components/BlogHeader';
import BlogContent from './components/BlogContent';
import RelatedPosts from '../components/RelatedPosts';
import ShareButtons from '../components/ShareButtons';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';
import { getTranslations } from 'next-intl/server';

// ISR with 1 hour revalidation
export const revalidate = 3600;

type Params = {
  locale: string;
  slug: string;
};

export async function generateMetadata({
  params
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale as 'en' | 'ar');

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://www.dreamto.app';
  const url = `${baseUrl}/${locale}/blog/${post.slug}`;

  // Build alternates for hreflang using both locale slugs
  // If current locale is ar, we need the en slug, and vice versa
  let alternatesLanguages: Record<string, string> | undefined = undefined;
  try {
    const counterpartLocale = locale === 'ar' ? 'en' : 'ar';
    const counterpart = await getBlogPost(slug, counterpartLocale as 'en' | 'ar');
    const arSlug = locale === 'ar' ? post.slug : counterpart?.slug || post.slug;
    const enSlug = locale === 'en' ? post.slug : counterpart?.slug || post.slug;
    alternatesLanguages = {
      'x-default': `${baseUrl}/ar/blog/${arSlug}`,
      ar: `${baseUrl}/ar/blog/${arSlug}`,
      en: `${baseUrl}/en/blog/${enSlug}`,
    };
  } catch { }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      images: post.featuredImage ? [{
        url: post.featuredImage,
        width: 1200,
        height: 630,
        alt: post.imageAlt || post.title,
      }] : [],
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: url,
      ...(alternatesLanguages ? { languages: alternatesLanguages } : {}),
      types: {
        'application/rss+xml': `/${locale}/blog/rss.xml`
      }
    },
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<Params>
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale as 'en' | 'ar');
  const t = await getTranslations('blog');

  if (!post) {
    notFound();
  }

  // Increment views (fire and forget)
  incrementViews(post.id).catch(() => { });

  const baseUrl = 'https://www.dreamto.app';
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: t('breadcrumb.home'), url: `${baseUrl}/${locale}` },
    { name: t('breadcrumb.blog'), url: `${baseUrl}/${locale}/blog` },
    { name: post.title, url: postUrl }
  ];

  // Article schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || `${baseUrl}/og-image.png`,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'DreamToApp',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.publishedAt?.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    keywords: post.tags.join(', '),
    articleSection: post.category.name,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <link rel="alternate" type="application/rss+xml" href={`/${locale}/blog/rss.xml`} />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article Header */}
        <BlogHeader post={post} locale={locale} />

        {/* Share Buttons - Top */}
        <div className="my-8 flex justify-center">
          <ShareButtons title={post.title} url={postUrl} />
        </div>

        {/* Article Content */}
        <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded" />}>
          <BlogContent content={post.content} />
        </Suspense>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t('tags')}:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons - Bottom */}
        <div className="my-12 pt-8 border-t flex justify-center">
          <ShareButtons title={post.title} url={postUrl} />
        </div>
      </article>

      {/* Related Posts */}
      {post.relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 pb-12 max-w-7xl">
          <RelatedPosts posts={post.relatedPosts} locale={locale} />
        </div>
      )}
    </div>
  );
}


