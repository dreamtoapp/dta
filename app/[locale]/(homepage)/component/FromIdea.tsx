// 'use client';
import React from 'react';
import {
  getTranslations,
} from 'next-intl/server';
import Image from 'next/image';
import {
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';

// Client Component for Image
const ImageWithErrorHandling = () => {
  return (
    <figure className="relative h-56 sm:h-64 lg:h-72 w-full image-container" style={{ aspectRatio: '16/9' }}>
      <Image
        src="https://res.cloudinary.com/dhjy2k0fu/image/upload/f_auto,q_auto,w_auto,dpr_auto/v1759083375/freepik__assistant__4830_jgvuty.png"
        fill
        alt="Website project showcase image for DreamToApp"
        priority
        className="object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ aspectRatio: '16/9' }}
      />
      <figcaption className="sr-only">Website project showcase image</figcaption>
    </figure>
  );
};

// Server Component
export const FromIdea = async () => {
  const t = await getTranslations("homepage");

  return (
    <article className="flex flex-col justify-between border border-[#d7a50d]/30 rounded-xl shadow-lg overflow-hidden hover:border-[#d7a50d]/50 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#d7a50d]/5 to-[#f4c430]/5">
      {/* Card Header with Image */}
      <CardHeader className="relative p-0">
        <ImageWithErrorHandling />
        {/* Animated Gradient Pulse Effect */}
        <div className="absolute -top-2 -left-2 size-4 sm:size-6 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] animate-pulse rounded-full" />
      </CardHeader>

      {/* Content Section - Better Structure */}
      <div className="flex-1 flex flex-col p-6 sm:p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d7a50d] leading-tight mb-4">
            {t("fromIdeaTitle")}
          </h3>
        </div>

        {/* Main Content - Single Instance */}
        <div className="bg-gradient-to-r from-[#d7a50d]/10 to-[#f4c430]/10 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("fromIdeaContent")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col items-center gap-4 p-6 sm:p-8 bg-gradient-to-t from-[#d7a50d]/5 to-transparent">
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            ابدأ رحلتك اليوم واحصل على دليل مجاني للخطوات الأولى
          </p>
        </div>
      </div>
    </article>
  );
};

export default FromIdea;
