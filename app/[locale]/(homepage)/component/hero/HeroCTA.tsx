"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Briefcase, Megaphone } from "lucide-react";

interface HeroCTAProps {
  ctaPrimary: string;
  ctaSecondary: string;
  locale: string;
}

const HeroCTA: React.FC<HeroCTAProps> = ({ ctaPrimary, ctaSecondary, locale }) => {
  const hiringText = locale === 'ar' ? 'انضم لفريقنا' : 'Join Our Team';
  const influencerText = locale === 'ar' ? 'سجل كمؤثر' : 'Become an Influencer';

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap backdrop-blur-sm bg-background/20 p-6 rounded-2xl border border-border/50">
      {/* Primary CTA */}
      <Link
        href="/start-your-dream"
        locale={locale}
        className="group inline-flex items-center gap-2 rounded-lg bg-brand-primary px-8 py-4 font-bold text-brand-accent shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:bg-brand-primary/90"
      >
        {ctaPrimary}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Hiring CTA */}
      <Link
        href="/team/apply"
        locale={locale}
        className="group inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all hover:scale-105 hover:bg-brand-accent/90"
      >
        <Briefcase className="h-4 w-4 transition-transform group-hover:rotate-12" />
        {hiringText}
      </Link>

      {/* Influencer CTA */}
      <Link
        href="/influencers/register"
        locale={locale}
        className="group inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-6 py-3 font-semibold text-brand-primary shadow-md hover:shadow-lg transition-all hover:scale-105 hover:bg-brand-secondary/90"
      >
        <Megaphone className="h-4 w-4 transition-transform group-hover:scale-110" />
        {influencerText}
      </Link>
    </div>
  );
};

export default HeroCTA;
