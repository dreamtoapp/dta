"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import IconComponent from '../../components/icons/IconComponent'
import type { SocialPlatform } from '../../helpers/types'
import { formatNumber } from '../../helpers/utils'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface PlatformStatsProps {
  platforms: SocialPlatform[]
  className?: string
}

// ============================================================================
// PLATFORM CONFIGURATION
// ============================================================================

const platformConfig = {
  instagram: {
    name: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    iconName: 'instagram' as const
  },
  youtube: {
    name: 'YouTube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    iconName: 'youtube' as const
  },
  tiktok: {
    name: 'TikTok',
    color: 'text-white',
    bgColor: 'bg-black/10',
    iconName: 'tiktok' as const
  },
  snapchat: {
    name: 'Snapchat',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    iconName: 'snapchat' as const
  },
  facebook: {
    name: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    iconName: 'facebook' as const
  },
  twitter: {
    name: 'Twitter',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    iconName: 'twitter' as const
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    iconName: 'linkedin' as const
  },
  whatsapp: {
    name: 'WhatsApp',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    iconName: 'whatsapp' as const
  },
  telegram: {
    name: 'Telegram',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    iconName: 'telegram' as const
  },
}

// ============================================================================
// COMPONENT
// ============================================================================

const PlatformStats: React.FC<PlatformStatsProps> = ({ platforms, className = '' }) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform, index) => {
            const config = platformConfig[platform.platform]
            if (!config) return null

            return (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <IconComponent
                        name={config.iconName}
                        className={`w-5 h-5 ${config.color}`}
                        style={{ fill: 'currentColor' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{config.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        @{platform.username.substring(0, 3)}***
                      </p>
                    </div>
                  </div>
                  {platform.verified && (
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      <IconComponent name="check-circle" className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Followers</p>
                    <p className="font-bold">{formatNumber(platform.followers)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                    <p className="font-bold text-green-600">{platform.engagement}%</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default PlatformStats
