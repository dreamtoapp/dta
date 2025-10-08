"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  locale: string;
}

export default function SearchBar({ locale }: SearchBarProps) {
  const t = useTranslations('blog');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set('search', searchValue);
      } else {
        params.delete('search');
      }
      params.delete('page'); // Reset to first page on search

      router.push(`/${locale}/blog?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, locale, router, searchParams]);

  const handleClear = useCallback(() => {
    setSearchValue('');
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={t('searchPlaceholder')}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

