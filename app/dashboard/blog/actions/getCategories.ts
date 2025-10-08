'use server';

import db from '@/lib/prisma';

export async function getAllCategoriesForDashboard() {
  try {
    const categories = await db.blogCategory.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    });

    return { success: true, categories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error: 'Failed to fetch categories', categories: [] };
  }
}

