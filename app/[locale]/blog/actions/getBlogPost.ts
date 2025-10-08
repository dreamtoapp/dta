'use server';

import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';
import type { BlogPostDetail, BlogPostListItem } from '../helpers/types';

export async function getBlogPost(
  slug: string,
  locale: 'en' | 'ar'
): Promise<BlogPostDetail | null> {
  try {
    // Decode the slug from URL encoding (important for Arabic slugs)
    const decodedSlug = decodeURIComponent(slug);
    const slugField = locale === 'ar' ? 'slugAr' : 'slugEn';

    // Fetch the main post
    const post = await db.blogPost.findFirst({
      where: {
        [slugField]: decodedSlug,
        status: BlogStatus.PUBLISHED,
        publishedAt: { lte: new Date() }
      },
      include: {
        category: true
      }
    });

    if (!post) {
      return null;
    }

    // Fetch related posts (by category or tags)
    const relatedPostsData = await db.blogPost.findMany({
      where: {
        id: { not: post.id },
        status: BlogStatus.PUBLISHED,
        publishedAt: { lte: new Date() },
        OR: [
          { categoryId: post.categoryId },
          { tags: { hasSome: post.tags } }
        ]
      },
      include: {
        category: true
      },
      take: 3,
      orderBy: {
        publishedAt: 'desc'
      }
    });

    // Transform related posts
    const relatedPosts: BlogPostListItem[] = relatedPostsData.map(rPost => ({
      id: rPost.id,
      title: locale === 'ar' ? rPost.titleAr : rPost.titleEn,
      slug: locale === 'ar' ? rPost.slugAr : rPost.slugEn,
      excerpt: locale === 'ar' ? rPost.excerptAr : rPost.excerptEn,
      featuredImage: rPost.featuredImage,
      imageAlt: rPost.imageAlt,
      category: {
        id: rPost.category.id,
        name: locale === 'ar' ? rPost.category.nameAr : rPost.category.nameEn,
        slug: locale === 'ar' ? rPost.category.slugAr : rPost.category.slugEn,
      },
      author: rPost.author,
      authorAvatar: rPost.authorAvatar,
      publishedAt: rPost.publishedAt,
      readingTime: rPost.readingTime,
      views: rPost.views,
      tags: rPost.tags,
    }));

    // Transform main post to locale-specific format
    const transformedPost: BlogPostDetail = {
      id: post.id,
      title: locale === 'ar' ? post.titleAr : post.titleEn,
      slug: locale === 'ar' ? post.slugAr : post.slugEn,
      excerpt: locale === 'ar' ? post.excerptAr : post.excerptEn,
      content: locale === 'ar' ? post.contentAr : post.contentEn,
      metaTitle: locale === 'ar' ? post.metaTitleAr : post.metaTitleEn,
      metaDescription: locale === 'ar' ? post.metaDescriptionAr : post.metaDescriptionEn,
      featuredImage: post.featuredImage,
      imageAlt: post.imageAlt,
      category: {
        id: post.category.id,
        name: locale === 'ar' ? post.category.nameAr : post.category.nameEn,
        slug: locale === 'ar' ? post.category.slugAr : post.category.slugEn,
      },
      author: post.author,
      authorAvatar: post.authorAvatar,
      publishedAt: post.publishedAt,
      readingTime: post.readingTime,
      views: post.views,
      tags: post.tags,
      relatedPosts,
    };

    return transformedPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
