"use client";

import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";
import type { BlogPostListItem } from "../helpers/types";

interface RelatedPostsProps {
  posts: BlogPostListItem[];
  locale: string;
}

export default function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t pt-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {t('relatedPosts')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}


