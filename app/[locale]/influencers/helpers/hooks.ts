// ============================================================================
// INFLUENCER CUSTOM HOOKS
// ============================================================================

import { useState, useMemo, useCallback } from 'react'
import type { Influencer, FilterState } from './types'
import { DEFAULT_FILTERS } from './constants'
import { filterAndSortInfluencers, getActiveFiltersCount } from './utils'

/**
 * Hook for managing influencer filters
 */
export const useInfluencerFilters = (influencers: Influencer[]) => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const filteredInfluencers = useMemo(() => {
    return filterAndSortInfluencers(influencers, filters)
  }, [influencers, filters])

  const activeFiltersCount = useMemo(() => {
    return getActiveFiltersCount(filters)
  }, [filters])

  return {
    filters,
    updateFilter,
    clearFilters,
    filteredInfluencers,
    activeFiltersCount
  }
}

/**
 * Hook for managing influencer selection
 */
export const useInfluencerSelection = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)

  const selectInfluencer = useCallback((influencer: Influencer) => {
    setSelectedInfluencer(influencer)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedInfluencer(null)
  }, [])

  return {
    selectedInfluencer,
    selectInfluencer,
    clearSelection
  }
}

/**
 * Hook for managing influencer pagination
 */
export const useInfluencerPagination = (influencers: Influencer[], itemsPerPage: number = 12) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(influencers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedInfluencers = influencers.slice(startIndex, endIndex)

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  const resetPagination = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    paginatedInfluencers,
    goToPage,
    nextPage,
    prevPage,
    resetPagination
  }
}
