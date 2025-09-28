"use client"
import React from 'react';
import Link from '@/components/link';

interface HeroCTAProps {
  ctaPrimary: string;
  ctaSecondary: string;
  locale: string;
}

const HeroCTA: React.FC<HeroCTAProps> = ({ ctaPrimary, ctaSecondary, locale }) => {
  // Ensure consistent href generation
  const primaryHref = `/${locale}/start-your-dream`;
  const secondaryHref = `/${locale}/services`;
  const tertiaryHref = `/${locale}/apply-job`;

  return (
    <div className="flex flex-nowrap gap-2 sm:gap-3 md:gap-4 justify-center items-center dom-optimized">
      <Link
        href={primaryHref}
        className="inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-primary-foreground shadow-[0_8px_30px_rgba(215,165,13,0.35)] bg-gradient-to-br from-[#d7a50d] to-[#f4c430] border border-[#e9c756]/60 transition-transform duration-200 hover:shadow-[0_12px_40px_rgba(215,165,13,0.5)] hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a50d]/70"
      >
        {ctaPrimary}
      </Link>
      <Link
        href={secondaryHref}
        className="inline-flex items-center justify-center rounded-full px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-[#99e4ff] bg-gradient-to-br from-[#0d3ad7]/10 to-[#99e4ff]/10 border border-[#99e4ff]/60 shadow-[0_8px_30px_rgba(153,228,255,0.2)] transition-transform duration-200 hover:text-white hover:border-[#99e4ff] hover:shadow-[0_12px_40px_rgba(153,228,255,0.35)] hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#99e4ff]/50"
      >
        {ctaSecondary}
      </Link>
      <Link
        href={tertiaryHref}
        className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-emerald-500 border border-emerald-600 text-white shadow-[0_8px_30px_rgba(16,185,129,0.35)] transition-transform duration-200 hover:bg-emerald-600 hover:shadow-[0_12px_40px_rgba(16,185,129,0.45)] hover:scale-[1.05] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        title="انضم إلى فريقنا"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      </Link>
    </div>
  );
};

export default HeroCTA; 