"use client"

import React from "react"
import IconComponent from '../icons/IconComponent'
import { formatNumber } from '../../helpers/utils'
import type { Influencer } from '../../helpers/types'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerStatsProps {
  influencer: Influencer
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerStats: React.FC<InfluencerStatsProps> = ({
  influencer,
  className = ''
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center gap-1 mb-1">
          <IconComponent name="users" className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Total Followers</span>
        </div>
        <div className="font-bold text-lg">
          {formatNumber(influencer.totalFollowers)}
        </div>
      </div>
    </div>
  )
}

export default InfluencerStats
