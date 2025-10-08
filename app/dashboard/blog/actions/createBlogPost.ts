'use server';

import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const blogPostSchema = z.object({
  titleEn: z.string().min(1, 'English title required'),
  titleAr: z.string().min(1, 'Arabic title required'),
  slugEn: z.string().min(1, 'English slug required'),
  slugAr: z.string().min(1, 'Arabic slug required'),
  excerptEn: z.string().min(1, 'English excerpt required'),
  excerptAr: z.string().min(1, 'Arabic excerpt required'),
  contentEn: z.string().min(1, 'English content required'),
  contentAr: z.string().min(1, 'Arabic content required'),
  categoryId: z.string().min(1, 'Category required'),
  tags: z.array(z.string()),
  status: z.nativeEnum(BlogStatus),
  author: z.string().default('DreamToApp Team'),
  readingTime: z.number().min(1),
  metaTitleEn: z.string().optional(),
  metaTitleAr: z.string().optional(),
  metaDescriptionEn: z.string().optional(),
  metaDescriptionAr: z.string().optional(),
  featuredImage: z.string().nullable().optional(),
  imageAlt: z.string().nullable().optional(),
});

export async function createBlogPost(data: z.infer<typeof blogPostSchema>) {
  try {
    const validated = blogPostSchema.parse(data);

    // If status is PUBLISHED, set publishedAt
    const createData: any = {
      ...validated,
    };

    if (validated.status === BlogStatus.PUBLISHED) {
      createData.publishedAt = new Date();
    }

    const post = await db.blogPost.create({
      data: createData,
    });

    revalidatePath('/dashboard/blog');
    revalidatePath('/blog');

    return { success: true, message: 'Blog post created successfully', post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation failed', errors: error.flatten().fieldErrors };
    }
    console.error('Error creating blog post:', error);
    return { success: false, error: 'Failed to create blog post' };
  }
}


