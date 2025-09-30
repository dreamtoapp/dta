"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import HeroContent from "./HeroContent";
import HeroAuroraOverlays from "./HeroAuroraOverlays";
import HeroCTA from "./HeroCTA";

type ImageHeroProps = {
  publicIdOrUrl: string; // Cloudinary public_id (preferred) or full URL
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  // Optional Cloudinary transform when using public_id
  transform?: string; // e.g. "f_auto,q_auto,w_1600,c_fill,g_auto"
};

const ImageHero: React.FC<ImageHeroProps> = ({
  publicIdOrUrl,
  alt,
  className = "",
  sizes = "100vw",
  priority = true,
  transform = "f_auto,q_auto,w_1920,c_fill,g_auto",
}) => {
  const locale = useLocale();
  const t = useTranslations("homepage");

  // Determine if it's a Cloudinary public_id or full URL
  const isCloudinaryPublicId = !publicIdOrUrl.startsWith("http");

  // Build the final image URL
  const imageUrl = isCloudinaryPublicId
    ? `https://res.cloudinary.com/dhjy2k0fu/image/upload/${transform}/${publicIdOrUrl}`
    : publicIdOrUrl;

  const heroProps = {
    logoAlt: t("organization.name"),
    tagline: t("hero.tagline"),
    title: t("hero.title"),
    description: t("hero.description"),
    ctaPrimary: t("hero.ctaPrimary"),
    ctaSecondary: t("hero.ctaSecondary"),
    slogan: t("hero.slogan"),
    sectionsHero: t("sections.hero"),
    locale: locale,
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden ${className}`}>
      {/* Background Image */}

      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30" />

      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <HeroContent
          logoAlt={heroProps.logoAlt}
          tagline={heroProps.tagline}
          title={heroProps.title}
          description={heroProps.description}
          ctaPrimary={heroProps.ctaPrimary}
          ctaSecondary={heroProps.ctaSecondary}
          slogan={heroProps.slogan}
          sectionsHero={heroProps.sectionsHero}
          locale={heroProps.locale}
        />
      </div>
    </div>
  );
};

export default ImageHero;
