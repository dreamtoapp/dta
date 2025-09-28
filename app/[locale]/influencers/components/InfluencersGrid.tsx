"use client"

import React from "react"
import InfluencerCard from './InfluencerCard'
import type { Influencer } from '../helpers/types'

interface InfluencersGridProps {
  influencers: Influencer[]
  onInfluencersChange?: (influencers: Influencer[]) => void
  className?: string
}

const InfluencersGrid: React.FC<InfluencersGridProps> = ({
  influencers,
  onInfluencersChange,
  className = ''
}) => {
  const handleInfluencerClick = (influencer: Influencer) => {
    console.log('Clicked influencer:', influencer.name)
    // TODO: Navigate to individual influencer page
    // router.push(`/influencers/${influencer.id}`)
  }

  if (influencers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground text-lg mb-4">
          No influencers found matching your criteria
        </div>
        <p className="text-muted-foreground">
          Try adjusting your search or filter options
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {influencers.map((influencer) => (
        <InfluencerCard
          key={influencer.id}
          influencer={influencer}
          onClick={handleInfluencerClick}
        />
      ))}
    </div>
  )
}

export default InfluencersGrid
