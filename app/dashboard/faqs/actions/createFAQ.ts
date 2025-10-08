'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface CreateFAQInput {
  pagePath: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  displayOrder?: number;
  isActive?: boolean;
}

export async function createFAQ(data: CreateFAQInput) {
  try {
    const faq = await db.fAQ.create({
      data: {
        pagePath: data.pagePath,
        questionEn: data.questionEn,
        questionAr: data.questionAr,
        answerEn: data.answerEn,
        answerAr: data.answerAr,
        displayOrder: data.displayOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    // Revalidate the dashboard and frontend pages
    revalidatePath('/dashboard/faqs');
    revalidatePath(`/en${data.pagePath}`);
    revalidatePath(`/ar${data.pagePath}`);

    return {
      success: true,
      data: faq,
    };
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return {
      success: false,
      data: null,
      error: 'Failed to create FAQ',
    };
  }
}
