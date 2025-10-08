'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteBlogPost(id: string) {
  try {
    await db.blogPost.delete({
      where: { id },
    });

    revalidatePath('/dashboard/blog');
    revalidatePath('/blog');
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
}

