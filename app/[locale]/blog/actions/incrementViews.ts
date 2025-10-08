'use server';

import db from '@/lib/prisma';

export async function incrementViews(postId: string): Promise<boolean> {
  try {
    await db.blogPost.update({
      where: { id: postId },
      data: {
        views: {
          increment: 1
        }
      }
    });
    return true;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return false;
  }
}

