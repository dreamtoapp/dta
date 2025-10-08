'use server';

import db from '@/lib/prisma';

export async function incrementViews(postId: string): Promise<boolean> {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
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
    } catch (error: any) {
      // Check if it's a transaction conflict error
      if (error.code === 'P2034' && retries < maxRetries - 1) {
        retries++;
        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 100));
        continue;
      }

      console.error('Error incrementing views:', error);
      return false;
    }
  }

  return false;
}

