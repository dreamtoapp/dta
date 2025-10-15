import React from "react";

import { getLocale, getTranslations } from "next-intl/server";
import { whyChooseUs } from "@/constant/icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MotionDiv from "@/components/MotionDiv";

// Define the type for the feature items
type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

// List of features
const features: Feature[] = [
  {
    icon: whyChooseUs.dollar,
    title: "costEfficiencyTitle",
    description: "costEfficiencyDescription",
  },
  {
    icon: whyChooseUs.ecustom,
    title: "onDemandTitle",
    description: "onDemandDescription",
  },
  {
    icon: whyChooseUs.expert,
    title: "itExpertsTitle",
    description: "itExpertsDescription",
  },
  {
    icon: whyChooseUs.timeFlex,
    title: "timeFlexibilityTitle",
    description: "timeFlexibilityDescription",
  },
  {
    icon: whyChooseUs.shield,
    title: "securePrivacyTitle",
    description: "securePrivacyDescription",
  },
];

const WhyChooseUs: React.FC = async () => {
  const t = await getTranslations("whyChooseUs");
  const locale = await getLocale();

  return (
    <section
      id="whyChooseUs"
      className="w-full dom-optimized"
      aria-labelledby="why-choose-us-heading"
      role="region"
    >
      {/* Section Header */}
      <header className="text-center mb-12 sm:mb-16">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h2
            id="why-choose-us-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          >
            <span className="text-[#d7a50d]">{t("sectionTitle")}</span>
          </h2>
          {/* <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("whatMakesUsDifferent")}
          </p> */}
        </div>
      </header>

      {/* Features Grid - Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 grid-optimized">
        {features.slice(0, 5).map((feature, index) => (
          <MotionDiv
            whileHoverEffect={{ scale: 1.05 }}
            whileTapEffect={{ scale: 0.98 }}
            key={index}
            className="group card-optimized"
          >
            <Card
              className="h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-[#0d3ad7]/30"
              aria-label={t(feature.title)}
            >
              <CardHeader className="flex flex-col items-center space-y-4 p-6 sm:p-8">
                {/* Icon Container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#d7a50d]/10 to-[#0d3ad7]/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:from-[#d7a50d]/20 group-hover:to-[#0d3ad7]/20 transition-all duration-300">
                  {feature.icon && (
                    <feature.icon
                      className="w-8 h-8 sm:w-10 sm:h-10 text-[#0d3ad7] group-hover:text-[#d7a50d] transition-colors"
                      aria-label={t(feature.title)}
                      role="img"
                    />
                  )}
                </div>
                {/* Title */}
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight">
                  {t(feature.title)}
                </CardTitle>
              </CardHeader>
              {/* Description */}
              <CardContent className="text-center p-6 sm:p-8 pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  {t(feature.description)}
                </p>
              </CardContent>
            </Card>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
