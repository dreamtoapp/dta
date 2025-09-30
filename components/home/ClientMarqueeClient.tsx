"use client";

import Marquee from "react-fast-marquee";

type Props = {
  logos: { id: string; url: string }[];
  durationSec?: number;
};

export default function ClientMarqueeClient({ logos, durationSec = 70 }: Props) {
  if (!Array.isArray(logos) || logos.length === 0) return null;

  const speed = Math.max(10, Math.min(200, 1000 / durationSec));

  return (
    <Marquee speed={speed} pauseOnHover={false} gradient={false} autoFill>
      {logos.map((logo) => (
        <div key={logo.id} className="mx-3 sm:mx-4">
          <div className="h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-border/50 bg-white/60 dark:bg-white/5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md">
            <img
              src={logo.url}
              alt=""
              aria-hidden="true"
              width={200}
              height={80}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, (max-width: 1280px) 220px, 240px"
              className="h-full w-auto object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </Marquee>
  );
}


