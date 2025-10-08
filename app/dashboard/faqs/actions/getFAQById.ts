'use server';

import db from '@/lib/prisma';

export async function getFAQById(id: string) {
  try {
    const faq = await db.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      return {
        success: false,
        data: null,
        error: 'FAQ not found',
      };
    }

    return {
      success: true,
      data: faq,
    };
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return {
      success: false,
      data: null,
      error: 'Failed to fetch FAQ',
    };
  }
}
