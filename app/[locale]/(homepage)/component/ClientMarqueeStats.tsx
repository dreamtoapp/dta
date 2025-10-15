"use client";

import { useTranslations } from 'next-intl';

export default function ClientMarqueeStats() {
  const t = useTranslations('homepage.clientMarquee.stats');

  const stats = [
    {
      number: "100%",
      label: t('clientSatisfaction'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      number: "2+",
      label: t('yearsExperience'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "24/7",
      label: t('supportAvailable'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative text-center space-y-3">
            {/* Icon */}
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
              {stat.icon}
            </div>

            {/* Number */}
            <div className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {stat.number}
            </div>

            {/* Label */}
            <div className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
