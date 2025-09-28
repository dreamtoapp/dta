"use client"

import React from "react"
import InfluencerFilters from './InfluencerFilters'
import InfluencersGrid from './InfluencersGrid'
import PlatformMarquee from './PlatformMarquee'
import { mockInfluencers } from '../helpers/mockData'

const InfluencersClientSection: React.FC = () => {
  return (
    <>
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <InfluencerFilters
                onFiltersChange={() => { }}
                onInfluencersChange={() => { }}
              />
            </div>
          </div>
        </div>
      </section>

      <PlatformMarquee />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <InfluencersGrid
            influencers={mockInfluencers}
          />
        </div>
      </section>
    </>
  )
}

export default InfluencersClientSection
