'use server';

import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';
import type { BlogCategoryItem } from '../helpers/types';

export async function getCategories(
  locale: 'en' | 'ar'
): Promise<BlogCategoryItem[]> {
  try {
    const categories = await db.blogCategory.findMany({
      where: {
        isActive: true
      },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                status: BlogStatus.PUBLISHED,
                publishedAt: { lte: new Date() }
              }
            }
          }
        }
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    // Transform to locale-specific format
    const transformedCategories: BlogCategoryItem[] = categories.map(category => ({
      id: category.id,
      name: locale === 'ar' ? category.nameAr : category.nameEn,
      slug: locale === 'ar' ? category.slugAr : category.slugEn,
      description: locale === 'ar' ? category.descriptionAr : category.descriptionEn,
      postCount: category._count.posts,
    }));

    // Filter out categories with no posts
    return transformedCategories.filter(cat => cat.postCount > 0);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getAllCategories(
  locale: 'en' | 'ar'
): Promise<BlogCategoryItem[]> {
  try {
    const categories = await db.blogCategory.findMany({
      where: {
        isActive: true
      },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                status: BlogStatus.PUBLISHED,
                publishedAt: { lte: new Date() }
              }
            }
          }
        }
      },
      orderBy: {
        displayOrder: 'asc'
      }
    });

    // Transform to locale-specific format
    return categories.map(category => ({
      id: category.id,
      name: locale === 'ar' ? category.nameAr : category.nameEn,
      slug: locale === 'ar' ? category.slugAr : category.slugEn,
      description: locale === 'ar' ? category.descriptionAr : category.descriptionEn,
      postCount: category._count.posts,
    }));
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

