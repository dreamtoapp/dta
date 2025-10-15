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
      href: "/influencers/register",
      title: t("becomeInfluencer.title"),
      description: t("becomeInfluencer.description"),
      className: "bg-gradient-to-br from-white/95 to-white/85 text-gray-900 border-white/30 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/100",
      imageUrl: "https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1759566493/freepik__assistant__12855_s0hoen.png",
      icon: "🌟",
      gradient: "from-purple-400/20 to-pink-500/20"
    },
    {
      href: "/team/apply",
      title: t("joinTeam.title"),
      description: t("joinTeam.description"),
      className: "bg-gradient-to-br from-white/95 to-white/85 text-gray-900 border-white/30 shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/100",
      imageUrl: "https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_160,h_160,c_fill,g_auto/v1759568487/yellow-light-bulb-with-word-team-it_toaife.jpg",
      icon: "👥",
      gradient: "from-yellow-400/20 to-orange-500/20"
    },

  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mobile: 2 cards in first row - Improved */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3 mb-4">
        {ctaCards.slice(0, 2).map((card, index) => (
          <Link
            key={index}
            href={card.href}
            locale={locale}
            className={`group relative flex items-center h-24 sm:h-20 border-2 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out ${card.className}`}
          >
            {/* Background Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Image */}
            <div className="relative h-24 w-24 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-l-2xl">
              <Image
                src={card.imageUrl}
                alt={`${card.title} - ${locale === 'ar' ? 'صورة توضيحية' : 'illustration'}`}
                width={96}
                height={96}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Text */}
            <div className={`relative flex-1 p-3 sm:p-4 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg sm:text-base">{card.icon}</span>
                <h3 className="font-bold text-sm sm:text-xs truncate group-hover:text-gray-800 transition-colors duration-300">{card.title}</h3>
              </div>
              <p className="text-xs sm:text-xs text-gray-600 line-clamp-2 sm:line-clamp-1 group-hover:text-gray-700 transition-colors duration-300">{card.description}</p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>


      {/* Desktop: 2 cards in one row - Enhanced */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {ctaCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            locale={locale}
            className={`group relative flex items-center h-24 border-2 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out ${card.className}`}
          >
            {/* Background Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Image */}
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-l-3xl">
              <Image
                src={card.imageUrl}
                alt={`${card.title} - ${locale === 'ar' ? 'صورة توضيحية' : 'illustration'}`}
                width={96}
                height={96}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Text */}
            <div className={`relative flex-1 p-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{card.icon}</span>
                <h3 className="font-bold text-lg group-hover:text-gray-800 transition-colors duration-300">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">{card.description}</p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroCTA;
