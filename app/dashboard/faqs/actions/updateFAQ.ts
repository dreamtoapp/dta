'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface UpdateFAQInput {
  pagePath?: string;
  questionEn?: string;
  questionAr?: string;
  answerEn?: string;
  answerAr?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export async function updateFAQ(id: string, data: UpdateFAQInput) {
  try {
    // Get the current FAQ to know which pages to revalidate
    const currentFAQ = await db.fAQ.findUnique({
      where: { id },
      select: { pagePath: true },
    });

    if (!currentFAQ) {
      return {
        success: false,
        data: null,
        error: 'FAQ not found',
      };
    }

    const faq = await db.fAQ.update({
      where: { id },
      data,
    });

    // Revalidate the dashboard and frontend pages
    revalidatePath('/dashboard/faqs');
    revalidatePath(`/en${currentFAQ.pagePath}`);
    revalidatePath(`/ar${currentFAQ.pagePath}`);

    // If pagePath changed, revalidate the new path too
    if (data.pagePath && data.pagePath !== currentFAQ.pagePath) {
      revalidatePath(`/en${data.pagePath}`);
      revalidatePath(`/ar${data.pagePath}`);
    }

    return {
      success: true,
      data: faq,
    };
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return {
      success: false,
      data: null,
      error: 'Failed to update FAQ',
    };
  }
}
