"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface SortFilterProps {
  sortOrder: 'asc' | 'desc'
  onSortOrderChange: (value: 'asc' | 'desc') => void
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const SortFilter: React.FC<SortFilterProps> = ({
  sortOrder,
  onSortOrderChange,
  className = ''
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
      className={`rounded-xl border-border bg-background text-foreground ${className}`}
    >
      {sortOrder === 'asc' ? (
        <ChevronDown className="w-4 h-4 rotate-180" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </Button>
  )
}

export default SortFilter
