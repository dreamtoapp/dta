"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import type { Influencer } from '../../helpers/types'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerFooterProps {
  influencer: Influencer
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerFooter: React.FC<InfluencerFooterProps> = ({
  influencer,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-end pt-4 border-t border-border/50 ${className}`}>
      <Button
        size="sm"
        className="bg-purple-600 text-white"
      >
        View Profile
      </Button>
    </div>
  )
}

export default InfluencerFooter
