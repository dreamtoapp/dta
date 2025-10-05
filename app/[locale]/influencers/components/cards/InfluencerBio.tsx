"use client"

import React from "react"
import type { Influencer } from '../../helpers/types'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerBioProps {
  influencer: Influencer
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerBio: React.FC<InfluencerBioProps> = ({
  influencer,
  className = ''
}) => {
  return (
    <p className={`text-sm text-muted-foreground mb-4 line-clamp-2 ${className}`}>
      {influencer.bio}
    </p>
  )
}

export default InfluencerBio


































