import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface HeroCTAProps {
  ctaPrimary: string;
  ctaSecondary: string;
  locale: string;
}

const HeroCTA: React.FC<HeroCTAProps> = async ({ ctaPrimary, ctaSecondary, locale }) => {
  const t = await getTranslations("homepage.hero.ctaCards");

  const ctaCards = [
    {
      href: "/start-your-dream",
      title: t("startDream.title"),
      description: t("startDream.description"),
      className: "bg-white/80 text-black border-gray-200",
      imageUrl: "https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1759568642/freepik__assistant__10764_melidv.png"
    },
    {
      href: "/team/apply",
      title: t("joinTeam.title"),
      description: t("joinTeam.description"),
      className: "bg-white/80 text-black border-gray-200",
      imageUrl: "https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1759568487/yellow-light-bulb-with-word-team-it_toaife.jpg"
    },
    {
      href: "/influencers/register",
      title: t("becomeInfluencer.title"),
      description: t("becomeInfluencer.description"),
      className: "bg-white/80 text-black border-gray-200",
      imageUrl: "https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1759566493/freepik__assistant__12855_s0hoen.png"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mobile: 2 cards in first row */}
      <div className="grid grid-cols-2 md:hidden gap-4 mb-4">
        {ctaCards.slice(0, 2).map((card, index) => (
          <Link
            key={index}
            href={card.href}
            locale={locale}
            className={`flex items-center h-16 border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${card.className}`}
          >
            {/* Image */}
            <div className="h-16 w-16 flex-shrink-0">
              <Image
                src={card.imageUrl}
                alt={`${card.title} - ${locale === 'ar' ? 'صورة توضيحية' : 'illustration'}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className={`flex-1 p-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h3 className="font-bold text-base truncate">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: 1 card full width in second row */}
      <div className="md:hidden mb-4">
        {ctaCards.slice(2, 3).map((card, index) => (
          <Link
            key={index + 2}
            href={card.href}
            locale={locale}
            className={`flex items-center h-auto min-h-16 border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${card.className}`}
          >
            {/* Image */}
            <div className="h-16 w-16 flex-shrink-0">
              <Image
                src={card.imageUrl}
                alt={`${card.title} - ${locale === 'ar' ? 'صورة توضيحية' : 'illustration'}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className={`flex-1 p-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h3 className="font-bold text-base truncate">{card.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: 3 cards in one row */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {ctaCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            locale={locale}
            className={`flex items-center h-20 border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow ${card.className}`}
          >
            {/* Image */}
            <div className="h-20 w-20 flex-shrink-0">
              <Image
                src={card.imageUrl}
                alt={`${card.title} - ${locale === 'ar' ? 'صورة توضيحية' : 'illustration'}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className={`flex-1 p-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h3 className="font-bold text-sm truncate">{card.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroCTA;
