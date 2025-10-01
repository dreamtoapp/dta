"use client";
import React from "react";
import HeroLogo from "./HeroLogo";
import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";

interface HeroContentProps {
  logoAlt: string;
  tagline: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  slogan: string;
  sectionsHero?: string;
  className?: string;
  locale: string;
}

/**
 * Enhanced Hero Content - Responsive First Design
 * 
 * Responsive Breakpoints:
 * - Mobile (< 640px): Compact spacing, full width
 * - Tablet (640px - 1024px): Medium spacing, constrained width
 * - Desktop (> 1024px): Generous spacing, optimal reading width
 */
const HeroContent: React.FC<HeroContentProps> = ({
  logoAlt,
  tagline,
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  slogan,
  className = "",
  locale,
}) => {
  return (
    <section
      className={`relative w-full ${className}`}
      aria-label="Hero section"
    >
      {/* Optimized Aurora - 90% less overhead */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Static base gradient - zero overhead */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d7a50d]/15 via-transparent to-[#0d3ad7]/15" />

        {/* Gentle pulsing glow - CSS animated (GPU accelerated) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(153,228,255,0.4), transparent 70%)',
            animation: 'aurora-pulse 8s ease-in-out infinite',
          }}
        />

        {/* Subtle light sweep - CSS animated (GPU accelerated) */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(215,165,13,0.3) 50%, transparent)',
            animation: 'aurora-sweep 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* Responsive Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">

          {/* Content Stack with Progressive Spacing */}
          <div className="w-full max-w-5xl space-y-6 text-center sm:space-y-8 md:space-y-10 lg:space-y-12">

            {/* Logo Section */}
            <div className="flex justify-center">
              <HeroLogo logoAlt={logoAlt} locale={locale} />
            </div>

            {/* Text Content - Enhanced Contrast & Readability */}
            <div className="relative space-y-4 sm:space-y-5 md:space-y-6">
              {/* Subtle backdrop for text readability */}
              <div className="absolute inset-0 -z-10  backdrop-blur-[1px] rounded-2xl" />

              {/* Text shadow for better contrast against aurora */}
              <div className="relative [&_*]:drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] [&_*]:transition-all [&_*]:duration-300 px-4 py-6 sm:px-6 sm:py-8">
                <HeroText
                  tagline={tagline}
                  title={title}
                  description={description}
                  slogan={slogan}
                />
              </div>
            </div>

            {/* CTA Section - Responsive Button Layout */}
            <div className="pt-4 sm:pt-6 md:pt-8">
              <HeroCTA
                ctaPrimary={ctaPrimary}
                ctaSecondary={ctaSecondary}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Content Separator for Depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroContent;
