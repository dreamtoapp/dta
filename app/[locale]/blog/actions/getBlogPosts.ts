'use server';

import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';
import type { PaginatedBlogPosts, BlogFilters, BlogPostListItem } from '../helpers/types';

export async function getBlogPosts(
  locale: 'en' | 'ar',
  filters?: BlogFilters
): Promise<PaginatedBlogPosts> {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: BlogStatus.PUBLISHED,
      publishedAt: { lte: new Date() }
    };

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.search) {
      const searchField = locale === 'ar' ? 'titleAr' : 'titleEn';
      where[searchField] = {
        contains: filters.search,
        mode: 'insensitive'
      };
    }

    if (filters?.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags
      };
    }

    // Fetch posts and total count in parallel
    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        include: {
          category: true
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip,
        take: limit,
      }),
      db.blogPost.count({ where })
    ]);

    // Transform to locale-specific format
    const transformedPosts: BlogPostListItem[] = posts.map(post => ({
      id: post.id,
      title: locale === 'ar' ? post.titleAr : post.titleEn,
      slug: locale === 'ar' ? post.slugAr : post.slugEn,
      excerpt: locale === 'ar' ? post.excerptAr : post.excerptEn,
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
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      posts: transformedPosts,
      total,
      page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

