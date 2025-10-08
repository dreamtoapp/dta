"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import type { BlogCategoryItem } from "../helpers/types";

interface CategoryFilterProps {
  categories: BlogCategoryItem[];
  locale: string;
}

export default function CategoryFilter({ categories, locale }: CategoryFilterProps) {
  const t = useTranslations('blog');
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryClick = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to first page on filter change

    router.push(`/${locale}/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        onClick={() => handleCategoryClick(null)}
        size="sm"
      >
        {t('allCategories')}
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => handleCategoryClick(category.id)}
          size="sm"
          className="gap-2"
        >
          {category.name}
          <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
            {category.postCount}
          </Badge>
        </Button>
      ))}
    </div>
  );
}


