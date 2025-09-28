"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface ResultsSummaryProps {
  count: number
  activeFiltersCount: number
  onClearFilters: () => void
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  count,
  activeFiltersCount,
  onClearFilters,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-4">
        <span>{count} influencers found</span>
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-1">
            <span>with</span>
            <Badge variant="outline" className="text-xs">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <X className="w-3 h-3 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  )
}

export default ResultsSummary
