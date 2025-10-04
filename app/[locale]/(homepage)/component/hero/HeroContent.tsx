"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { LazyMotion, m } from "framer-motion";

// Load only DOM animations for optimal performance
const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

// Memoized animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0
  }
};


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
const HeroContent: React.FC<HeroContentProps> = ({
  logoAlt,
  tagline,
  title,
  description,
  slogan,
  className = "",
  locale,
}) => {
  const t = useTranslations("homepage.hero.serviceHooks");
  return (
    <LazyMotion features={loadFeatures}>
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
              <m.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.4,
                  staggerChildren: 0.1,
                  ease: "easeOut"
                }}
              >
                {/* Web App Hook */}
                <m.div
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  variants={cardVariants}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                >
                  <div className="text-center space-y-4">
                    <m.h3
                      className="text-xl font-bold text-white drop-shadow-lg"
                      variants={textVariants}
                      transition={{ delay: 0.05, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("webApps.title")}
                    </m.h3>
                    <m.p
                      className="text-white/90 text-sm leading-relaxed drop-shadow-md"
                      variants={textVariants}
                      transition={{ delay: 0.1, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("webApps.description")}
                    </m.p>
                  </div>
                </m.div>

                {/* Mobile App Hook */}
                <m.div
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  variants={cardVariants}
                  transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                >
                  <div className="text-center space-y-4">
                    <m.h3
                      className="text-xl font-bold text-white drop-shadow-lg"
                      variants={textVariants}
                      transition={{ delay: 0.15, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("mobileApps.title")}
                    </m.h3>
                    <m.p
                      className="text-white/90 text-sm leading-relaxed drop-shadow-md"
                      variants={textVariants}
                      transition={{ delay: 0.2, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("mobileApps.description")}
                    </m.p>
                  </div>
                </m.div>

                {/* Digital Marketing Hook */}
                <m.div
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  variants={cardVariants}
                  transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                >
                  <div className="text-center space-y-4">
                    <m.h3
                      className="text-xl font-bold text-white drop-shadow-lg"
                      variants={textVariants}
                      transition={{ delay: 0.25, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("digitalMarketing.title")}
                    </m.h3>
                    <m.p
                      className="text-white/90 text-sm leading-relaxed drop-shadow-md"
                      variants={textVariants}
                      transition={{ delay: 0.3, duration: 0.25, ease: "easeOut" }}
                    >
                      {t("digitalMarketing.description")}
                    </m.p>
                  </div>
                </m.div>
              </m.div>

            </div>
          </div>
        </div>

        {/* Subtle Content Separator for Depth */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent"
          aria-hidden="true"
        />
      </section>
    </LazyMotion>
  );
};

export default HeroContent;
