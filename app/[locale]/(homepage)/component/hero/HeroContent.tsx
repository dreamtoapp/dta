import React from "react";
import { getTranslations } from "next-intl/server";


interface HeroContentProps {
  logoAlt: string;
  tagline: string;
  title: string;
  description: string;
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
const HeroContent: React.FC<HeroContentProps> = async ({
  logoAlt,
  tagline,
  title,
  description,
  slogan,
  className = "",
  locale,
}) => {
  const t = await getTranslations("homepage.hero.serviceHooks");
  return (
    <section
      className={`relative w-full ${className}`}
      aria-label="Hero section"
    >
      {/* Optimized Aurora - 90% less overhead */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">

          {/* 3 Service Hooks */}
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Web App Hook */}
              <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {t("webApps.title")}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {t("webApps.description")}
                  </p>
                </div>
              </div>

              {/* Mobile App Hook */}
              <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {t("mobileApps.title")}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {t("mobileApps.description")}
                  </p>
                </div>
              </div>

              {/* Digital Marketing Hook */}
              <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {t("digitalMarketing.title")}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                    {t("digitalMarketing.description")}
                  </p>
                </div>
              </div>
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
