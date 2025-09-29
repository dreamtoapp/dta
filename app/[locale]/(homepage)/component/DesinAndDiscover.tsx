import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

import { getTranslations } from "next-intl/server";

export const DesinAndDiscover = async () => {
  const t = await getTranslations("homepage");

  return (
    <Card className="flex flex-col justify-between border border-[#0d3ad7]/30 rounded-xl shadow-lg overflow-hidden hover:border-[#0d3ad7]/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#0d3ad7]/5 to-[#99e4ff]/5">
      {/* Header Section with Image */}
      <CardHeader className="relative p-0">
        <div className="relative h-48 sm:h-56 lg:h-72 w-full">
          <Image
            src="https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1759092841/freepik__assistant__12597_draipi.png"
            fill
            alt="Discover Canon Project - DreamToApp"
            priority
            className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-4 sm:size-6 bg-gradient-to-r from-[#0d3ad7] to-[#99e4ff] animate-pulse rounded-full" />
      </CardHeader>

      {/* Content Section - Better Structure */}
      <div className="flex-1 flex flex-col p-6 sm:p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d3ad7] leading-tight mb-4">
            {t("discoverTitle")}
          </h3>
        </div>

        {/* Main Content - Single Instance */}
        <div className="bg-gradient-to-r from-[#0d3ad7]/10 to-[#99e4ff]/10 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("discoverContent")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section - Clean without button */}
      <div className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-gradient-to-t from-[#0d3ad7]/5 to-transparent">
        <div className="text-center">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            ابدأ رحلتك اليوم واحصل على دليل مجاني للخطوات الأولى
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DesinAndDiscover;
