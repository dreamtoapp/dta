"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { getCategoryColor } from '../../helpers/utils'
import type { Influencer } from '../../helpers/types'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerBadgesProps {
  influencer: Influencer
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerBadges: React.FC<InfluencerBadgesProps> = ({
  influencer,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-2 mb-4 ${className}`}>
      <Badge className={getCategoryColor(influencer.category)}>
        {influencer.category}
      </Badge>
    </div>
  )
}

export default InfluencerBadges
