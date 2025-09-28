"use client"

import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LOCATIONS } from "@/lib/enums/influencerEnums"

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

// ============================================================================
// FILTER OPTIONS
// ============================================================================

const locations = ['all', ...LOCATIONS]

// ============================================================================
// COMPONENT
// ============================================================================

const LocationFilter: React.FC<LocationFilterProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[200px] rounded-xl border-border bg-background text-foreground ${className}`}>
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem key={location} value={location}>
            {location === 'all' ? 'All Locations' : location}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LocationFilter




