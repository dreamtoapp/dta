'use server';

import db from '@/lib/prisma';

export interface FAQListItem {
  id: string;
  pagePath: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getFAQs(pagePath?: string) {
  try {
    const where = pagePath ? { pagePath } : {};

    const faqs = await db.fAQ.findMany({
      where,
      orderBy: [
        { pagePath: 'asc' },
        { displayOrder: 'asc' },
      ],
    });

    return {
      success: true,
      data: faqs,
    };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch FAQs',
    };
  }
}
