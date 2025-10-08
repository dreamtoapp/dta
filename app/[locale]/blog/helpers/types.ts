import { BlogPost, BlogCategory, BlogStatus } from '@prisma/client';

// Extended types with relations
export type BlogPostWithCategory = BlogPost & {
  category: BlogCategory;
};

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  imageAlt: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  author: string;
  authorAvatar: string | null;
  publishedAt: Date | null;
  readingTime: number;
  views: number;
  tags: string[];
};

export type BlogPostDetail = BlogPostListItem & {
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  relatedPosts: BlogPostListItem[];
};

export type BlogCategoryItem = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
};

export type PaginatedBlogPosts = {
  posts: BlogPostListItem[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type BlogFilters = {
  categoryId?: string;
  search?: string;
  page?: number;
  limit?: number;
  tags?: string[];
};

export { BlogStatus };


