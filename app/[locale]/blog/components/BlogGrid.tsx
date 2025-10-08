"use client";

import { useTranslations } from "next-intl";
import BlogCard from "./BlogCard";
import type { BlogPostListItem } from "../helpers/types";

interface BlogGridProps {
  posts: BlogPostListItem[];
  locale: string;
}

export default function BlogGrid({ posts, locale }: BlogGridProps) {
  const t = useTranslations('blog');

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-bold mb-2">{t('noResults')}</h3>
        <p className="text-muted-foreground">{t('noResultsDescription')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  );
}


