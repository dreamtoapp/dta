'use server';

import db from '@/lib/prisma';
import { BlogStatus } from '@prisma/client';

export async function getAllBlogPostsForDashboard() {
  try {
    const posts = await db.blogPost.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, posts };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { success: false, error: 'Failed to fetch blog posts' };
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!post) {
      return { success: false, error: 'Blog post not found' };
    }

    return { success: true, post };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { success: false, error: 'Failed to fetch blog post' };
  }
}


