import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from './actions/getBlogPosts';
import { getCategories } from './actions/getCategories';
import { getDynamicMetadata } from '@/app/seo/metadata';
import BlogGrid from './components/BlogGrid';
import BlogFilters from './components/BlogFilters';
import Pagination from './components/Pagination';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

// ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return await getDynamicMetadata('/blog', locale);
}

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const { locale } = await params;
  const filters = await searchParams;
  const t = await getTranslations('blog');

  // Fetch data in parallel
  const [{ posts, total, page, totalPages, hasNextPage, hasPrevPage }, categories] = await Promise.all([
    getBlogPosts(locale as 'en' | 'ar', {
      categoryId: filters.category,
      search: filters.search,
      page: parseInt(filters.page || '1'),
    }),
    getCategories(locale as 'en' | 'ar')
  ]);

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: t('breadcrumb.home'), url: `https://www.dreamto.app/${locale}` },
    { name: t('breadcrumb.blog'), url: `https://www.dreamto.app/${locale}/blog` }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('description')}
          </p>
        </header>

        {/* Filters */}
        <BlogFilters categories={categories} locale={locale} />

        {/* Blog Grid */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20 rounded-lg" />}>
          <BlogGrid posts={posts} locale={locale} />
        </Suspense>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          locale={locale}
        />

        {/* Results Count */}
        {posts.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('pagination.page')} {page} {t('pagination.of')} {totalPages} • {total} {t('title').toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
}

