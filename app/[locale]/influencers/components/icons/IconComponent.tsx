"use client"

import React from "react"
import {
  MessageSquare,
  MapPin,
  Users,
  CheckCircle,
  ExternalLink,
  Send,
  Star,
  TrendingUp,
  LucideIcon
} from "lucide-react"
import { InstagramIcon } from './InstgramIcon'
import { YouTubeIcon } from './YouTubeIcon'
import { TiktokIcon } from './TiktokIcon'
import { SnapchatIcon } from './SnapchatIcon'
import { FacebookIcon } from './FacebookIcon'
import { XIcon } from './Xicon'
import { LinkedinIcon } from './LinkdinIcon'
import { WhatsappIcon } from './WhatsappIcon'
import { TelegramIcon } from './TelegramIcon'

// ============================================================================
// ICON TYPES
// ============================================================================

export type IconName =
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'snapchat'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'telegram'
  | 'users'
  | 'trending-up'
  | 'check-circle'
  | 'star'
  | 'map-pin'

interface IconComponentProps {
  name: IconName
  size?: number | string
  className?: string
  color?: string
  style?: React.CSSProperties
}


// ============================================================================
// ICON MAPPING
// ============================================================================

const iconMap: Record<IconName, React.ComponentType<{ size?: number | string; className?: string; style?: React.CSSProperties }>> = {
  'instagram': InstagramIcon,
  'youtube': YouTubeIcon,
  'tiktok': TiktokIcon,
  'snapchat': SnapchatIcon,
  'facebook': FacebookIcon,
  'twitter': XIcon,
  'linkedin': LinkedinIcon,
  'whatsapp': WhatsappIcon,
  'telegram': TelegramIcon,
  'users': Users,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  'star': Star,
  'map-pin': MapPin,
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const IconComponent: React.FC<IconComponentProps> = ({
  name,
  size = 24,
  className = '',
  color,
  style
}) => {
  const Icon = iconMap[name]

  if (!Icon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const iconStyle = color ? { color, ...style } : { ...style }

  return (
    <Icon
      size={size}
      className={className}
      style={{ fill: 'currentColor', ...iconStyle }}
    />
  )
}

export default IconComponent
