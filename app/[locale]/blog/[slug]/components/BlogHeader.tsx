"use client";

import { Calendar, Clock, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import type { BlogPostDetail } from "../../helpers/types";
import { formatDate } from "../../helpers/utils";

interface BlogHeaderProps {
  post: BlogPostDetail;
  locale: string;
}

export default function BlogHeader({ post, locale }: BlogHeaderProps) {
  const t = useTranslations('blog');

  return (
    <header className="mb-8">
      {/* Category Badge */}
      <div className="mb-4">
        <Link href={`/${locale}/blog?category=${post.category.id}`}>
          <Badge variant="secondary" className="hover:bg-secondary/80 transition-colors">
            {post.category.name}
          </Badge>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            {post.authorAvatar ? (
              <AvatarImage src={post.authorAvatar} alt={post.author} />
            ) : (
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium">{post.author}</span>
        </div>

        {/* Published Date */}
        {post.publishedAt && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt, locale as 'en' | 'ar')}
            </time>
          </div>
        )}

        {/* Reading Time */}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{t('readingTime', { minutes: post.readingTime })}</span>
        </div>

        {/* Views */}
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{post.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8">
          <Image
            src={post.featuredImage}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Excerpt */}
      <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 italic">
        {post.excerpt}
      </p>
    </header>
  );
}


