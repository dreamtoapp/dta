"use client"

import React, { useState, useMemo } from "react"
import { mockInfluencers } from '../helpers/mockData'
import type { Influencer, FilterState } from '../helpers/types'
import { filterAndSortInfluencers, getActiveFiltersCount } from '../helpers/utils'
import { DEFAULT_FILTERS } from '../helpers/constants'

// Import filter components
import CategoryFilter from './filters/CategoryFilter'
import PlatformFilter from './filters/PlatformFilter'
import LocationFilter from './filters/LocationFilter'
import SortFilter from './filters/SortFilter'
import AdvancedFilters from './filters/AdvancedFilters'
import ResultsSummary from './filters/ResultsSummary'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  onInfluencersChange: (influencers: Influencer[]) => void
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerFilters: React.FC<InfluencerFiltersProps> = ({
  onFiltersChange,
  onInfluencersChange,
  className = ''
}) => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  // Filter and sort influencers using the imported utility function
  const filteredInfluencers = useMemo(() => {
    return filterAndSortInfluencers(mockInfluencers, filters)
  }, [filters])

  // Update parent components when filters change
  React.useEffect(() => {
    onFiltersChange(filters)
    onInfluencersChange(filteredInfluencers)
  }, [filters, filteredInfluencers, onFiltersChange, onInfluencersChange])

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const activeFiltersCount = getActiveFiltersCount(filters)

  return (
    <div className={`space-y-4 w-full max-w-6xl ${className}`}>
      {/* Filter Controls */}
      <div className="flex flex-nowrap gap-3 items-center overflow-x-auto">
        <CategoryFilter
          value={filters.category}
          onChange={(value) => updateFilter('category', value)}
        />

        <PlatformFilter
          value={filters.platform}
          onChange={(value) => updateFilter('platform', value)}
        />

        <LocationFilter
          value={filters.location}
          onChange={(value) => updateFilter('location', value)}
        />

        <AdvancedFilters
          followers={filters.followers}
          onFollowersChange={(value) => updateFilter('followers', value)}
        />

        <SortFilter
          sortOrder={filters.sortOrder}
          onSortOrderChange={(value) => updateFilter('sortOrder', value)}
        />
      </div>

      {/* Results Summary */}
      <ResultsSummary
        count={filteredInfluencers.length}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearFilters}
      />
    </div>
  )
}

export default InfluencerFilters