'use server';

import { cache } from 'react';
import db from '@/lib/prisma';

export interface FAQItem {
  question: string;
  answer: string;
}

export const getFAQsForPage = cache(async (pagePath: string, locale: 'en' | 'ar'): Promise<FAQItem[]> => {
  try {
    const faqs = await db.fAQ.findMany({
      where: {
        pagePath,
        isActive: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
      select: {
        id: true,
        questionEn: true,
        questionAr: true,
        answerEn: true,
        answerAr: true,
      },
    });

    // Transform to locale-specific format
    return faqs.map((faq) => ({
      question: locale === 'en' ? faq.questionEn : faq.questionAr,
      answer: locale === 'en' ? faq.answerEn : faq.answerAr,
    }));
  } catch (error) {
    console.error('Error fetching FAQs for page:', error);
    return [];
  }
});
