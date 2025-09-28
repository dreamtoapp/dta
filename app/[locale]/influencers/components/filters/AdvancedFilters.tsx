"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface AdvancedFiltersProps {
  followers: string
  onFollowersChange: (value: string) => void
  className?: string
}

// ============================================================================
// FILTER OPTIONS
// ============================================================================

const followerRanges = [
  'all',
  '1000-10000',
  '10000-50000',
  '50000-100000',
  '100000-500000',
  '500000-1000000',
  '1000000-Infinity'
]

// ============================================================================
// COMPONENT
// ============================================================================

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  followers,
  onFollowersChange,
  className = ''
}) => {
  return (
    <Select value={followers} onValueChange={onFollowersChange}>
      <SelectTrigger className={`w-[200px] rounded-xl border-border bg-background text-foreground ${className}`}>
        <SelectValue placeholder="Follower Range" />
      </SelectTrigger>
      <SelectContent>
        {followerRanges.map((range) => (
          <SelectItem key={range} value={range}>
            {range === 'all' ? 'Any' : range.replace('-', ' - ').replace('Infinity', '1M+')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default AdvancedFilters
