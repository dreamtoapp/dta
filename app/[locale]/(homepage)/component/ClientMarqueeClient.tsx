"use client";

import { memo } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

type Props = {
  logos: { id: string; url: string }[];
  durationSec?: number;
};

const ClientMarqueeClient = memo(function ClientMarqueeClient({ logos, durationSec = 20 }: Props) {
  if (!Array.isArray(logos) || logos.length === 0) return null;

  // Calculate speed: react-fast-marquee default is 50, adjust based on duration
  const speed = Math.max(20, Math.min(80, 1000 / durationSec));

  // Duplicate logos for seamless infinite scroll (5 times to fill viewport)
  const duplicatedLogos = Array(5).fill(logos).flat();

  return (
    <div className="py-8">
      <Marquee
        speed={speed}
        gradient={false}
        pauseOnHover={true}
        play={true}
        direction="left"
        loop={0}
      >
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="relative w-48 h-20 mx-4">
            <Image
              src={logo.url}
              alt=""
              fill
              sizes="(max-width: 768px) 160px, 192px"
              className="object-contain"
              loading="lazy"
              quality={75}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
});

export default ClientMarqueeClient;