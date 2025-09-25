import { FaRocket, FaCode, FaMobileAlt, FaCog, FaVial, FaUsers, FaStar } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MotionDiv from "@/components/MotionDiv";
import { memo } from "react";

// Define interfaces for better type safety and modularity
interface CardTag {
  text: string;
  icon: React.ElementType;
}

interface CardData {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: CardTag[];
  imagePublicId?: string;
}

interface CardComponentProps {
  card: CardData;
  t: (key: string) => string; // Translation function
  locale: string; // Locale for localization
}

/**
 * Enhanced Card Component
 * - Modern, accessible, and responsive UI/UX
 * - Semantic color classes and improved visual hierarchy
 */
const CardComponent: React.FC<CardComponentProps> = ({ card, t, locale }) => {
  return (
    <MotionDiv
      className="h-full flex flex-col min-w-[300px] bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-[#d7a50d]/60 hover:border-[#0d3ad7]/30 card-optimized"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <article className="h-full flex flex-col" aria-labelledby={`service-card-title-${t(card.title)}`}>
        {/* Header Section */}
        <CardHeader className="flex flex-col items-center text-center space-y-3 pt-6 pb-2">
          {card.imagePublicId && (
            <img
              src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_640,h_640,c_fill,g_auto/${card.imagePublicId}`}
              alt={t(card.title)}
              className="w-full object-cover rounded-xl mb-3"
              style={{ aspectRatio: '1 / 1' }}
              loading="lazy"
            />
          )}
          {/* Icon with animated ring on hover */}
          <div className="relative flex items-center justify-center mb-2">
            <span className="absolute inset-0 rounded-full bg-[#d7a50d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            {card.icon && (
              <card.icon
                className="w-12 h-12 sm:w-14 sm:h-14 text-[#0d3ad7] drop-shadow-md group-hover:scale-110 group-hover:text-[#d7a50d] transition-all duration-300"
                aria-label={t(card.title)}
                role="img"
              />
            )}
          </div>
          {/* Title */}
          <CardTitle className="text-xl sm:text-2xl font-bold text-foreground leading-tight" id={`service-card-title-${t(card.title)}`}>
            <h3 className="text-balance">{t(card.title)}</h3>
          </CardTitle>
          {/* Description */}
          <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p className="text-balance" aria-hidden="false">
              {t(card.description)}
            </p>
          </CardDescription>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col justify-end gap-3 pb-4">
          {/* Technology Used Label */}
          <span className="text-center mb-2 text-[#d7a50d] font-semibold tracking-wide text-xs sm:text-sm uppercase">
            {t("tecnoUsed")}
          </span>
          {/* Tags List - Limited to prevent excessive DOM */}
          <div className="flex flex-wrap gap-2 justify-center" role="list">
            {card.tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#0d3ad7]/15 via-[#0d3ad7]/10 to-[#99e4ff]/15 text-[#0d3ad7] border border-[#0d3ad7]/25 shadow-sm hover:shadow-md px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium hover:from-[#0d3ad7]/25 hover:via-[#0d3ad7]/20 hover:to-[#99e4ff]/25 hover:border-[#0d3ad7]/40 hover:scale-105 transition-all duration-300 group-hover:shadow-[#0d3ad7]/20"
                role="listitem"
              >
                {/* Tag Icon */}
                {tag.icon && (
                  <tag.icon
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0d3ad7] group-hover:text-[#d7a50d] transition-colors duration-300"
                    aria-hidden="true"
                    role="img"
                    aria-label={tag.text}
                  />
                )}
                {/* Tag Text */}
                <span className="capitalize font-medium">{tag.text}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </article>
    </MotionDiv>
  );
};

export default memo(CardComponent);
