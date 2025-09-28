"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES } from "@/lib/enums/influencerEnums"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

// ============================================================================
// FILTER OPTIONS
// ============================================================================

const categories = ['all', ...CATEGORIES]

// ============================================================================
// COMPONENT
// ============================================================================

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[180px] rounded-xl border-border bg-background text-foreground ${className}`}>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category === 'all' ? 'All Categories' : category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter




