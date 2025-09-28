"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IconComponent from '../icons/IconComponent'
import type { Influencer } from '../../helpers/types'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerHeaderProps {
  influencer: Influencer
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

const InfluencerHeader: React.FC<InfluencerHeaderProps> = ({
  influencer,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Reference ID Badge at Top */}
      <div className="flex justify-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-sm">
          <IconComponent name="users" className="w-3 h-3 mr-1" />
          {influencer.referenceId}
        </span>
      </div>

      {/* Profile Info */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={influencer.avatar} alt={influencer.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
              {influencer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {influencer.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <IconComponent name="check-circle" className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">
              {influencer.name}
            </h3>
            {influencer.isFeatured && (
              <IconComponent name="star" className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-muted-foreground text-sm">@{influencer.username.substring(0, 3)}***</p>
          <div className="flex items-center gap-1 mt-1">
            <IconComponent name="map-pin" className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{influencer.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluencerHeader
