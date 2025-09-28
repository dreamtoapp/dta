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
    <div className={`grid grid-cols-2 gap-4 mb-4 ${className}`}>
      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center gap-1 mb-1">
          <IconComponent name="users" className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
        <div className="font-bold text-lg">
          {formatNumber(influencer.totalFollowers)}
        </div>
      </div>
      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center gap-1 mb-1">
          <IconComponent name="trending-up" className="w-4 h-4 text-green-500" />
          <span className="text-sm text-muted-foreground">Engagement</span>
        </div>
        <div className="font-bold text-lg text-green-600">
          {influencer.avgEngagement}%
        </div>
      </div>
    </div>
  )
}

export default InfluencerStats
