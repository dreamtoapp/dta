"use client"

import React from "react"
import { TiktokIcon } from './icons/TiktokIcon'
import { SnapchatIcon } from './icons/SnapchatIcon'
import { FacebookIcon } from './icons/FacebookIcon'
import { XIcon } from './icons/Xicon'
import { LinkedinIcon } from './icons/LinkdinIcon'
import { WhatsappIcon } from './icons/WhatsappIcon'
import { TelegramIcon } from './icons/TelegramIcon'
import { YouTubeIcon } from './icons/YouTubeIcon'
import { InstagramIcon } from './icons/InstgramIcon'

// ============================================================================
// PLATFORM CONFIGURATION WITH CUSTOM ICONS
// ============================================================================

const platformConfig = [
  {
    name: 'Instagram',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    icon: InstagramIcon
  },
  {
    name: 'YouTube',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    icon: YouTubeIcon
  },
  {
    name: 'TikTok',
    color: 'text-white',
    bgColor: 'bg-black/10',
    icon: TiktokIcon
  },
  {
    name: 'Snapchat',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    icon: SnapchatIcon
  },
  {
    name: 'Facebook',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    icon: FacebookIcon
  },
  {
    name: 'Twitter',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    icon: XIcon
  },
  {
    name: 'LinkedIn',
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    icon: LinkedinIcon
  },
  {
    name: 'WhatsApp',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    icon: WhatsappIcon
  },
  {
    name: 'Telegram',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    icon: TelegramIcon
  },
]

// ============================================================================
// COMPONENT
// ============================================================================

const PlatformMarquee: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-muted/20 py-4">
      <div className="flex animate-marquee space-x-8 gap-8">
        {platformConfig.map((platform, index) => {
          const IconComponent = platform.icon
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2  whitespace-nowrap"
            >
              <div className={`p-2 size-14 rounded-lg ${platform.bgColor}`}>
                <IconComponent
                  size={40}
                  className={`${platform.color} hover:scale-110 transition-transform`}
                  style={{ fill: 'currentColor' }}
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {platform.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformMarquee
