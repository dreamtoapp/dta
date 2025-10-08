"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { BlogPostListItem } from "../helpers/types";
import { formatDate } from "../helpers/utils";

interface BlogCardProps {
  post: BlogPostListItem;
  locale: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
  const t = useTranslations('blog');

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Featured Image */}
      <div className="relative w-full h-48 overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {post.category.name}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-3 border-t">
        {/* Meta Info */}
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {t('readingTime', { minutes: post.readingTime })}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views}
            </span>
          </div>
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt, locale as 'en' | 'ar')}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link href={`/${locale}/blog/${post.slug}`} className="w-full">
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            {t('readMore')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

