"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import IconComponent from '../../components/icons/IconComponent'
import PlatformStats from './PlatformStats'
import type { Influencer } from '../../helpers/types'
import { getCategoryColor } from '../../helpers/utils'

// ============================================================================
// COMPONENT INTERFACES
// ============================================================================

interface InfluencerDetailClientProps {
  influencer: Influencer
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const InfluencerDetailClient: React.FC<InfluencerDetailClientProps> = ({ influencer }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          ← Back to Influencers
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  {/* Reference ID Badge at Top */}
                  <div className="mb-6">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                      <IconComponent name="users" className="w-4 h-4 mr-2" />
                      {influencer.referenceId}
                    </span>
                  </div>

                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={influencer.avatar} alt={influencer.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-2xl">
                        {influencer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {influencer.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <IconComponent name="check-circle" className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold mb-2">{influencer.name}</h1>
                  <p className="text-muted-foreground mb-2">@{influencer.username.substring(0, 3)}***</p>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    <IconComponent name="map-pin" className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{influencer.location}</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge className={getCategoryColor(influencer.category)}>
                      {influencer.category}
                    </Badge>
                    {influencer.isFeatured && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <IconComponent name="star" className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {influencer.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Stats and Platforms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Stats */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Overall Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <IconComponent name="users" className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Followers</span>
                    </div>
                    <div className="font-bold text-lg">
                      {influencer.totalFollowers.toLocaleString()}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <IconComponent name="trending-up" className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Avg Engagement</span>
                    </div>
                    <div className="font-bold text-lg text-green-600">
                      {influencer.avgEngagement}%
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <IconComponent name="star" className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Platforms</span>
                    </div>
                    <div className="font-bold text-lg">
                      {influencer.socialPlatforms.length}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <IconComponent name="check-circle" className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Verified</span>
                    </div>
                    <div className="font-bold text-lg">
                      {influencer.socialPlatforms.filter(p => p.verified).length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <PlatformStats platforms={influencer.socialPlatforms} />

            {/* Client Reviews & Testimonials */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Client Reviews & Testimonials</h2>

                {/* Testimonials Marquee */}
                <div className="relative overflow-hidden bg-muted/20 rounded-lg p-4 mb-6">
                  <div className="flex animate-marquee gap-6">
                    {/* First set of testimonials */}
                    <div className="flex gap-6 flex-shrink-0">
                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">AM</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Ahmed Mohammed</h4>
                              <p className="text-xs text-muted-foreground">CEO, TechStart Saudi</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Working with {influencer.name} was exceptional. The content quality exceeded our expectations,
                            and the engagement rates were outstanding."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Tech Product Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">SM</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Sarah Al-Mansouri</h4>
                              <p className="text-xs text-muted-foreground">Marketing Director</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Amazing collaboration! {influencer.name} understood our brand perfectly and created
                            authentic content that resonated with our audience."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Fashion Collection Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">KR</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Khalid Al-Rashid</h4>
                              <p className="text-xs text-muted-foreground">Founder, Food App</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Professional, creative, and results-driven. {influencer.name} helped us increase
                            our app downloads by 40% through authentic content."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">App Promotion</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">NA</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Noura Al-Ahmad</h4>
                              <p className="text-xs text-muted-foreground">Brand Manager</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Outstanding work! {influencer.name} created beautiful, engaging content that perfectly
                            showcased our products and exceeded KPIs."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Beauty Product Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">MA</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Mohammed Al-Sheikh</h4>
                              <p className="text-xs text-muted-foreground">E-commerce Director</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Exceptional results! {influencer.name} delivered high-quality content that drove
                            significant traffic and sales to our online store."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">E-commerce Campaign</p>
                      </div>
                    </div>

                    {/* Duplicate set for seamless loop */}
                    <div className="flex gap-6 flex-shrink-0">
                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">AM</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Ahmed Mohammed</h4>
                              <p className="text-xs text-muted-foreground">CEO, TechStart Saudi</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Working with {influencer.name} was exceptional. The content quality exceeded our expectations,
                            and the engagement rates were outstanding."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Tech Product Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">SM</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Sarah Al-Mansouri</h4>
                              <p className="text-xs text-muted-foreground">Marketing Director</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Amazing collaboration! {influencer.name} understood our brand perfectly and created
                            authentic content that resonated with our audience."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Fashion Collection Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">KR</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Khalid Al-Rashid</h4>
                              <p className="text-xs text-muted-foreground">Founder, Food App</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Professional, creative, and results-driven. {influencer.name} helped us increase
                            our app downloads by 40% through authentic content."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">App Promotion</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">NA</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Noura Al-Ahmad</h4>
                              <p className="text-xs text-muted-foreground">Brand Manager</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Outstanding work! {influencer.name} created beautiful, engaging content that perfectly
                            showcased our products and exceeded KPIs."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">Beauty Product Launch</p>
                      </div>

                      <div className="w-80 h-48 bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">MA</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Mohammed Al-Sheikh</h4>
                              <p className="text-xs text-muted-foreground">E-commerce Director</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm">★</span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            "Exceptional results! {influencer.name} delivered high-quality content that drove
                            significant traffic and sales to our online store."
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">E-commerce Campaign</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Rating */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Overall Rating</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      <span className="text-2xl font-bold">4.9</span>
                      <span className="text-muted-foreground">(24 reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Average Campaign Performance</p>
                    <p className="text-2xl font-bold text-green-600">+35%</p>
                    <p className="text-xs text-muted-foreground">Engagement Increase</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Guidelines */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Working with {influencer.name}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What to Expect</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Professional communication and timely responses</li>
                      <li>• High-quality content that aligns with your brand</li>
                      <li>• Transparent pricing and clear deliverables</li>
                      <li>• Authentic engagement with your target audience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Best Practices</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Provide clear briefs and brand guidelines</li>
                      <li>• Allow creative freedom within your brand voice</li>
                      <li>• Set realistic timelines for content creation</li>
                      <li>• Maintain open communication throughout the campaign</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Campaign Process</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Initial consultation to discuss campaign goals</li>
                      <li>• Content planning and approval process</li>
                      <li>• Content creation and review cycles</li>
                      <li>• Performance tracking and reporting</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfluencerDetailClient
