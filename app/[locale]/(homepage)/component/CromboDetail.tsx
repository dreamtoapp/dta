import React from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CromboDialog from './CromboDialog';

async function CromboDetail() {
  const t = await getTranslations("crombo");

  return (
    <>
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#0d3ad7]/95 via-[#0d3ad7]/90 to-[#d7a50d]/90 border-0 shadow-2xl backdrop-blur-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d7a50d]/15 to-[#99e4ff]/15" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7a50d]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#99e4ff]/10 rounded-full blur-2xl" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          {/* Header Section */}
          <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8">
            <CardTitle className="flex flex-col items-center gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                {t("name")}
              </h1>
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl lg:text-2xl font-medium text-[#99e4ff]/90 max-w-2xl mx-auto leading-relaxed">
              {t("title")}
            </CardDescription>
          </CardHeader>

          {/* Main Content Section */}
          <CardContent className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 pb-6 sm:pb-8">
            {/* Product Image */}
            <div className="relative w-28 h-40 sm:w-32 sm:h-48 lg:w-40 lg:h-56 flex-shrink-0 image-container" style={{ aspectRatio: '7/10' }}>
              <Image
                src="/assets/homepage/cromboPlugin.avif"
                fill
                alt="Crombo Plugin promotional image for DreamToApp"
                className="object-contain object-center drop-shadow-2xl"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                priority
                style={{ aspectRatio: '7/10' }}
              />
            </div>

            {/* Description */}
            <div className="flex-1 text-center lg:text-start">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#99e4ff]/90 max-w-3xl">
                {t("description")}
              </p>
            </div>
          </CardContent>

          {/* Footer Section */}
          <CardFooter className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#99e4ff]/20">
            {/* Call-to-Action */}
            <div className="text-center space-y-3 sm:space-y-4">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-[#d7a50d] animate-pulse">
                {t("free")}
              </span>
              <p className="text-[#99e4ff]/80 text-sm sm:text-base leading-relaxed">
                احصل على خدمة كرومبو مجاناً لمدة شهر كامل
              </p>
            </div>

            {/* Action Button - This will be handled by the Client Component */}
            <CromboDialog
              name={t("name")}
              title={t("title")}
            />
          </CardFooter>
        </div>
      </Card>
    </>
  );
}

export default CromboDetail;
