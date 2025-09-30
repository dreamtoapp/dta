"use client";
import React from "react";
import Image from "next/image";

interface HeroLogoProps {
  logoAlt: string;
  locale: string;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ logoAlt, locale }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
        <Image
          src="/assets/logo.webp"
          alt={logoAlt}
          fill
          className="object-contain animate-logo-pulse"
          priority
          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
        />
      </div>
    </div>
  );
};

export default HeroLogo;
