"use client";

import { memo } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

type Props = {
  logos: { id: string; url: string }[];
};

const ClientMarqueeClient = memo(function ClientMarqueeClient({ logos }: Props) {
  if (!Array.isArray(logos) || logos.length === 0) return null;

  return (
    <div className="w-full min-w-0">
      <Card className="border-0 shadow-sm bg-card/30 backdrop-blur-sm min-w-0">
        <div className="p-6 min-w-0">
          <h2 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
            Trusted by Leading Brands
          </h2>

          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex gap-8 pb-4 min-w-0">
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="relative w-32 h-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <Image
                    src={logo.url}
                    alt="Client logo"
                    fill
                    sizes="128px"
                    className="object-contain"
                    loading="lazy"
                    quality={75}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
});

export default ClientMarqueeClient;