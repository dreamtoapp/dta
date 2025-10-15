"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

type Props = {
  logos: { id: string; url: string; name?: string; category?: string }[];
};

const ClientMarqueeClient = memo(function ClientMarqueeClient({ logos }: Props) {
  const t = useTranslations('homepage.clientMarquee');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!Array.isArray(logos) || logos.length === 0) return null;

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-muted-foreground mb-2">
          {t('logosTitle')}
        </h3>
        <div className="w-12 sm:w-16 h-1 bg-primary/20 rounded-full mx-auto" />
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Animated Marquee */}
        <div className="flex animate-marquee">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className={`flex-shrink-0 mx-3 sm:mx-4 md:mx-6 lg:mx-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group relative w-20 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-36 lg:h-28 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm hover:shadow-lg border border-white/50 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                {/* Logo Image */}
                <div className="relative w-full h-full transition-all duration-500 opacity-70 group-hover:opacity-100">
                  <Image
                    src={logo.url}
                    alt={logo.name || "Client logo"}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
                    className="object-contain"
                    loading="lazy"
                    quality={85}
                  />
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tooltip */}
                <div className="absolute -bottom-10 sm:-bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {logo.name || "Client"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="mt-8 sm:mt-12 flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-4 text-muted-foreground">
          <div className="w-6 sm:w-8 h-px bg-border" />
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/30 rounded-full" />
          <div className="w-12 sm:w-16 h-px bg-border" />
          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary/30 rounded-full" />
          <div className="w-6 sm:w-8 h-px bg-border" />
        </div>
      </div>
    </div>
  );
});

export default ClientMarqueeClient;