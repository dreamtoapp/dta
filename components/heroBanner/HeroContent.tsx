"use client"
import React from 'react';
import HeroLogo from './HeroLogo';
import HeroText from './HeroText';
import HeroCTA from './HeroCTA';
import HeroAuroraOverlays from './HeroAuroraOverlays';

interface HeroContentProps {
  logoAlt: string;
  tagline: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  slogan: string;
  locale: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
  logoAlt,
  tagline,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  slogan,
  locale
}) => {
  return (
    <div
      className="dom-optimized relative overflow-hidden text-center font-bold text-white backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 mx-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(215,165,13,0.18), rgba(13,58,215,0.14), rgba(153,228,255,0.10))",
      }}
    >
      <HeroAuroraOverlays respectReducedMotion={false} />
      <div className="relative z-10">
        <HeroLogo logoAlt={logoAlt} locale={locale} />
        <HeroText tagline={tagline} title={title} description={description} slogan={slogan} />
        <HeroCTA ctaPrimary={ctaPrimary} ctaSecondary={ctaSecondary} locale={locale} />
      </div>
    </div>
  );
};

export default HeroContent; 