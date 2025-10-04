import React from "react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import HeroContent from "./HeroContent";
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

const ImageHero: React.FC<ImageHeroProps> = async ({
  publicIdOrUrl,
  alt,
  className = "",
  sizes = "100vw",
  priority = true,
  transform = "f_auto,q_auto,w_1920,c_fill,g_auto",
}) => {
  const locale = await getLocale();
  const t = await getTranslations("homepage");

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
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center"
        quality={85}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <HeroContent
          logoAlt={heroProps.logoAlt}
          tagline={heroProps.tagline}
          title={heroProps.title}
          description={heroProps.description}
          slogan={heroProps.slogan}
          sectionsHero={heroProps.sectionsHero}
          locale={heroProps.locale}
        />

        {/* CTA Section */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <HeroCTA
            ctaPrimary={heroProps.ctaPrimary}
            ctaSecondary={heroProps.ctaSecondary}
            locale={heroProps.locale}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
