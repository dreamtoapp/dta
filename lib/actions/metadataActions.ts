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
  // Keywords removed - deprecated by Google since 2009
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

// Bulk update from JSON payload
export async function bulkUpsertPageMetadata(items: PageMetadataInput[]) {
  try {
    for (const item of items) {
      await upsertPageMetadata(item);
    }
    return { success: true };
  } catch (error) {
    console.error('Bulk upsert error:', error);
    return { success: false, error: 'Failed bulk update' };
  }
}

// Create or update metadata
export async function upsertPageMetadata(data: PageMetadataInput) {
  try {
    // Convert empty strings to undefined for optional fields
    const cleanData = {
      ...data,
      ogImage: data.ogImage === '' ? undefined : data.ogImage,
      canonicalUrl: data.canonicalUrl === '' ? undefined : data.canonicalUrl,
      ogTitleEn: data.ogTitleEn === '' ? undefined : data.ogTitleEn,
      ogTitleAr: data.ogTitleAr === '' ? undefined : data.ogTitleAr,
      ogDescriptionEn: data.ogDescriptionEn === '' ? undefined : data.ogDescriptionEn,
      ogDescriptionAr: data.ogDescriptionAr === '' ? undefined : data.ogDescriptionAr,
      twitterTitleEn: data.twitterTitleEn === '' ? undefined : data.twitterTitleEn,
      twitterTitleAr: data.twitterTitleAr === '' ? undefined : data.twitterTitleAr,
      twitterDescriptionEn: data.twitterDescriptionEn === '' ? undefined : data.twitterDescriptionEn,
      twitterDescriptionAr: data.twitterDescriptionAr === '' ? undefined : data.twitterDescriptionAr,
      category: data.category === '' ? undefined : data.category,
      author: data.author === '' ? undefined : data.author,
    };

    const { pagePath, ...updateData } = cleanData;
    const result = await db.pageMetadata.upsert({
      where: { pagePath },
      create: cleanData,
      update: updateData,
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

