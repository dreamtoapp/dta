"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "../../../../i18n/routing"
import type { InfluencerCardProps } from '../helpers/types'
import { PlatformStats } from './PlatformIcon'

// Import card components
import InfluencerHeader from './cards/InfluencerHeader'
import InfluencerBadges from './cards/InfluencerBadges'
import InfluencerBio from './cards/InfluencerBio'
import InfluencerStats from './cards/InfluencerStats'
import InfluencerFooter from './cards/InfluencerFooter'

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  influencer,
  onClick,
  className = ''
}) => {
  return (
    <Link href={`/influencers/${influencer.id}`}>
      <Card
        className={`cursor-pointer border-border/50 hover:shadow-lg transition-shadow ${className}`}
        onClick={() => onClick?.(influencer)}
      >
        <CardContent className="p-6">
          <InfluencerHeader influencer={influencer} />

          <InfluencerBadges influencer={influencer} />

          <InfluencerBio influencer={influencer} />

          <PlatformStats
            platforms={influencer.socialPlatforms}
            className="mb-4"
          />

          <InfluencerStats influencer={influencer} />

          <InfluencerFooter influencer={influencer} />
        </CardContent>
      </Card>
    </Link>
  )
}

export default InfluencerCard
