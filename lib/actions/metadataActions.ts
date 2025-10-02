'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

export type PageMetadataInput = {
  pagePath: string;
  pageName: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keywordsEn?: string;
  keywordsAr?: string;
  ogTitleEn?: string;
  ogTitleAr?: string;
  ogDescriptionEn?: string;
  ogDescriptionAr?: string;
  ogImage?: string;
  twitterTitleEn?: string;
  twitterTitleAr?: string;
  twitterDescriptionEn?: string;
  twitterDescriptionAr?: string;
  category?: string;
  author?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  schemaEn?: Prisma.JsonValue;
  schemaAr?: Prisma.JsonValue;
  isActive?: boolean;
};

// Get single page metadata
export async function getPageMetadata(pagePath: string) {
  try {
    return await db.pageMetadata.findUnique({
      where: { pagePath },
    });
  } catch (error) {
    console.error('Error fetching page metadata:', error);
    return null;
  }
}

// Get all metadata (for admin listing)
export async function getAllPageMetadata() {
  try {
    return await db.pageMetadata.findMany({
      orderBy: { pagePath: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching all metadata:', error);
    return [];
  }
}

// Create or update metadata
export async function upsertPageMetadata(data: PageMetadataInput) {
  try {
    const result = await db.pageMetadata.upsert({
      where: { pagePath: data.pagePath },
      create: data,
      update: data,
    });

    // Revalidate the page
    revalidatePath(data.pagePath);
    revalidatePath('/dashboard/metadata');

    return { success: true, data: result };
  } catch (error) {
    console.error('Error upserting metadata:', error);
    return { success: false, error: 'Failed to save metadata' };
  }
}

// Delete metadata
export async function deletePageMetadata(pagePath: string) {
  try {
    await db.pageMetadata.delete({
      where: { pagePath },
    });

    revalidatePath('/dashboard/metadata');
    return { success: true };
  } catch (error) {
    console.error('Error deleting metadata:', error);
    return { success: false, error: 'Failed to delete metadata' };
  }
}

// Toggle active status
export async function togglePageMetadataStatus(pagePath: string) {
  try {
    const current = await db.pageMetadata.findUnique({
      where: { pagePath },
      select: { isActive: true },
    });

    const result = await db.pageMetadata.update({
      where: { pagePath },
      data: { isActive: !current?.isActive },
    });

    revalidatePath(pagePath);
    revalidatePath('/dashboard/metadata');

    return { success: true, data: result };
  } catch (error) {
    console.error('Error toggling metadata status:', error);
    return { success: false, error: 'Failed to toggle status' };
  }
}

