"use client"

import React from "react"
import { CheckCircle, ExternalLink } from "lucide-react"
import IconComponent from './icons/IconComponent'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { SocialPlatform, PlatformType, PlatformData, PlatformIconProps, PlatformGridProps, PlatformStatsProps } from '../helpers/types'
import { formatNumber, getPlatformUrl } from '../helpers/utils'

// ============================================================================
// PLATFORM CONFIGURATION WITH ICONS
// ============================================================================

const platformConfigWithIcons = {
  instagram: {
    name: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    url: 'https://instagram.com',
    iconName: 'instagram' as const
  },
  youtube: {
    name: 'YouTube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    url: 'https://youtube.com',
    iconName: 'youtube' as const
  },
  tiktok: {
    name: 'TikTok',
    color: 'text-white',
    bgColor: 'bg-black/10',
    url: 'https://tiktok.com',
    iconName: 'tiktok' as const
  },
  snapchat: {
    name: 'Snapchat',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    url: 'https://snapchat.com',
    iconName: 'snapchat' as const
  },
  facebook: {
    name: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    url: 'https://facebook.com',
    iconName: 'facebook' as const
  },
  twitter: {
    name: 'Twitter',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    url: 'https://twitter.com',
    iconName: 'twitter' as const
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    url: 'https://linkedin.com',
    iconName: 'linkedin' as const
  },
  whatsapp: {
    name: 'WhatsApp',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    url: 'https://wa.me',
    iconName: 'whatsapp' as const
  },
  telegram: {
    name: 'Telegram',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    url: 'https://t.me',
    iconName: 'telegram' as const
  },
}

// ============================================================================
// PLATFORM ICON COMPONENT
// ============================================================================

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  size = 'md',
  className = '',
  showTooltip = true,
  platformData,
  onClick
}) => {
  const config = platformConfigWithIcons[platform]

  if (!config) {
    console.warn(`PlatformIcon: Unknown platform "${platform}". Available platforms:`, Object.keys(platformConfigWithIcons))
    return (
      <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center">
        <span className="text-xs text-gray-600">?</span>
      </div>
    )
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconClasses = `${sizeClasses[size]} ${config.color} ${className}`

  const iconElement = (
    <div
      className={`relative inline-flex items-center justify-center p-2 rounded-lg ${config.bgColor} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <IconComponent name={config.iconName} className={iconClasses} />
      {platformData?.verified && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-2 h-2 text-white" />
        </div>
      )}
    </div>
  )

  if (!showTooltip || !platformData) {
    return iconElement
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {iconElement}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <IconComponent name={config.iconName} className="w-4 h-4" />
              <span className="font-semibold">{config.name}</span>
              {platformData.verified && (
                <CheckCircle className="w-3 h-3 text-blue-500" />
              )}
            </div>
            <div className="text-sm">
              <div className="font-medium">@{platformData.username.substring(0, 3)}***</div>
              <div className="text-muted-foreground">
                Followers: {formatNumber(platformData.followers)}
              </div>
              <div className="text-muted-foreground">
                Engagement: {platformData.engagement.toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <IconComponent name="check-circle" className="w-3 h-3" />
              <span>Contact via platform</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// ============================================================================
// PLATFORM GRID COMPONENT
// ============================================================================

const PlatformGrid: React.FC<PlatformGridProps> = ({ platforms, onPlatformClick, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {platforms.map((platformData, index) => (
        <PlatformIcon
          key={`${platformData.platform}-${index}`}
          platform={platformData.platform}
          platformData={platformData}
          size="sm"
          onClick={() => onPlatformClick?.(platformData)}
        />
      ))}
    </div>
  )
}

// ============================================================================
// PLATFORM STATS COMPONENT
// ============================================================================

const PlatformStats: React.FC<PlatformStatsProps> = ({
  platforms,
  showTotal = true,
  showEngagement = true,
  className = ''
}) => {
  const totalFollowers = platforms.reduce((sum, platform) => sum + platform.followers, 0)
  const avgEngagement = platforms.reduce((sum, platform) => sum + platform.engagement, 0) / platforms.length

  return (
    <div className={`space-y-3 ${className}`}>
      {showTotal && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <IconComponent name="users" className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Followers</span>
          </div>
          <span className="font-bold text-lg">{formatNumber(totalFollowers)}</span>
        </div>
      )}

      {showEngagement && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <IconComponent name="trending-up" className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Avg Engagement</span>
          </div>
          <span className="font-bold text-lg text-green-600">
            {avgEngagement.toFixed(1)}%
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {platforms.slice(0, 4).map((platform, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
          >
            <PlatformIcon
              platform={platform.platform}
              size="sm"
              showTooltip={false}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">
                {platformConfigWithIcons[platform.platform]?.name || platform.platform}
              </div>
              <div className="text-xs text-muted-foreground uppercase">
                {formatNumber(platform.followers)}
              </div>
            </div>
            {platform.verified && (
              <CheckCircle className="w-3 h-3 text-blue-500" />
            )}
          </div>
        ))}
      </div>
      {platforms.length > 4 && (
        <div className="text-center text-xs text-muted-foreground">
          +{platforms.length - 4} more platforms
        </div>
      )}
    </div>
  )
}

export default PlatformIcon
export { PlatformGrid, PlatformStats, platformConfigWithIcons as platformConfig }