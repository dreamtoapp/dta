"use client";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import type { BlogCategoryItem } from "../helpers/types";

interface BlogFiltersProps {
  categories: BlogCategoryItem[];
  locale: string;
}

export default function BlogFilters({ categories, locale }: BlogFiltersProps) {
  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <SearchBar locale={locale} />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center">
        <CategoryFilter categories={categories} locale={locale} />
      </div>
    </div>
  );
}

