"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PLATFORM_OPTIONS, PLATFORM_DISPLAY_NAMES } from "@/lib/enums/influencerEnums"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface PlatformFilterProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

// ============================================================================
// FILTER OPTIONS
// ============================================================================

const platforms = ['all', ...PLATFORM_OPTIONS]

// ============================================================================
// COMPONENT
// ============================================================================

const PlatformFilter: React.FC<PlatformFilterProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[180px] rounded-xl border-border bg-background text-foreground ${className}`}>
        <SelectValue placeholder="Platform" />
      </SelectTrigger>
      <SelectContent>
        {platforms.map((platform) => (
          <SelectItem key={platform} value={platform}>
            {platform === 'all' ? 'All Platforms' : PLATFORM_DISPLAY_NAMES[platform as keyof typeof PLATFORM_DISPLAY_NAMES]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default PlatformFilter
