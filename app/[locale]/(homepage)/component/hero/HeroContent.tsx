"use client";
import React from "react";
import HeroLogo from "./HeroLogo";
import HeroText from "./HeroText";
import HeroCTA from "./HeroCTA";
import HeroAuroraOverlays from "./HeroAuroraOverlays";

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
      {/* Aurora Background - Not touched as per requirement */}
      <HeroAuroraOverlays respectReducedMotion={false} />

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
