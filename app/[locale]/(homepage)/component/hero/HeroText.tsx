"use client";
import React from "react";

interface HeroTextProps {
  tagline: string;
  title: string;
  description: string;
  slogan: string;
}

const HeroText: React.FC<HeroTextProps> = ({ tagline, title, description, slogan }) => {
  return (
    <div className="dom-optimized">
      <div className="space-y-2 md:space-y-4">
        <p className="text-sm sm:text-base md:text-lg font-medium text-brand-accent uppercase tracking-wider">
          {tagline}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <p className="text-xs sm:text-sm md:text-base text-brand-secondary font-medium">
          {slogan}
        </p>
      </div>
    </div>
  );
};

export default HeroText;
