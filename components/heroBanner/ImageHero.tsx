"use client";
import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import HeroContent from "./HeroContent";
import HeroAuroraOverlays from "./HeroAuroraOverlays";

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
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1536px) 90vw, 1920px",
  priority = true,
  transform = "f_auto,q_auto,w_1920,c_fill,g_auto",
}) => {
  const locale = useLocale();
  const t = useTranslations('homepage');

  // If a Cloudinary public_id is provided, build an optimized URL
  const isFullUrl = /^https?:\/\//.test(publicIdOrUrl);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
  const src = isFullUrl
    ? publicIdOrUrl
    : cloudName
      ? `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicIdOrUrl}`
      : publicIdOrUrl; // fallback to provided string to avoid SSR/CSR mismatch

  return (
    <section
      aria-label={alt}
      className={`w-full bg-gradient-to-br from-background via-background to-muted/10 ${className}`}
    >
      <div className="container mx-auto px-4 py-2 md:py-6">
        <div
          className="relative w-full overflow-hidden rounded-2xl  shadow-xl min-h-[360px] sm:min-h-[420px] md:min-h-0 md:aspect-[16/9]"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover bg-background"
            priority={priority}
          />
          <div className="absolute inset-0 md:hidden bg-black/55 backdrop-blur-[1px]" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 mix-blend-multiply" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          {/* <HeroAuroraOverlays /> */}
          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
            <div className="max-w-5xl w-full">
              <HeroContent
                logoAlt={t('logo.alt')}
                tagline={t('tagline')}
                title={t('title')}
                description={t('description')}
                ctaPrimary={t('cta.primary')}
                ctaSecondary={t('cta.secondary')}
                slogan={t('slogon')}
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageHero;


