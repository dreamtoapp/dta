'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteFAQ(id: string) {
  try {
    // Get the FAQ before deleting to know which pages to revalidate
    const faq = await db.fAQ.findUnique({
      where: { id },
      select: { pagePath: true },
    });

    if (!faq) {
      return {
        success: false,
        error: 'FAQ not found',
      };
    }

    await db.fAQ.delete({
      where: { id },
    });

    // Revalidate the dashboard and frontend pages
    revalidatePath('/dashboard/faqs');
    revalidatePath(`/en${faq.pagePath}`);
    revalidatePath(`/ar${faq.pagePath}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return {
      success: false,
      error: 'Failed to delete FAQ',
    };
  }
}
