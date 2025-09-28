"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { Phone, MessageCircle } from 'lucide-react';

// WhatsApp Icon Component - Simplified to prevent chunk loading issues
const WhatsAppIcon = ({ className, ...props }: { className?: string;[key: string]: any }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

// Modern Professional Mobile Bottom Navigation Component
const MobileBottomNav: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const tConsultation = useTranslations('consultationCTA');
  const [activeItem, setActiveItem] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Professional menu items with modern icons and proper labels
  const menuItems = useMemo(() => [
    {
      href: '#consultation',
      label: tConsultation('cta'),
      icon: MessageCircle,
      activeColor: 'hsl(var(--primary))',
      inactiveColor: 'hsl(var(--muted-foreground))',
      type: 'consultation'
    },
    {
      href: '#whatsapp',
      label: 'WhatsApp',
      icon: WhatsAppIcon,
      activeColor: '#25D366', // WhatsApp green
      inactiveColor: 'hsl(var(--muted-foreground))',
      type: 'whatsapp'
    },
    {
      href: '#call',
      label: t('call'),
      icon: Phone,
      activeColor: '#007AFF', // iOS blue
      inactiveColor: 'hsl(var(--muted-foreground))',
      type: 'call'
    },
  ], [t, tConsultation]);

  // Set mounted state to true after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set active item based on current pathname
  useEffect(() => {
    if (!isMounted) return;

    const pathname = window.location.pathname;
    const currentItem = menuItems.find(item => {
      if (item.href === '/' && (pathname === `/${locale}` || pathname === '/')) return true;
      return pathname.includes(item.href);
    });

    if (currentItem) {
      setActiveItem(currentItem.href);
    }
  }, [locale, menuItems, isMounted]);

  const handleItemClick = (itemHref: string, itemType: string) => {
    if (itemType === 'whatsapp') {
      // Open WhatsApp with predefined message
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966554113107';
      const message = encodeURIComponent('مرحباً! أريد الاستفسار عن خدماتكم');
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    if (itemType === 'call') {
      // Open phone dialer
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966554113107';
      const telUrl = `tel:${phoneNumber}`;
      window.location.href = telUrl;
      return;
    }

    if (itemType === 'consultation') {
      // Scroll to consultation form or open consultation modal
      const consultationSection = document.querySelector('[data-consultation]');
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: scroll to top to show consultation form
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setActiveItem(itemHref);
  };

  // Always render, but show loading state if not mounted
  if (!isMounted) {
    return (
      <nav className="sticky bottom-0 left-0 right-0 z-50 md:hidden" role="navigation">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />
        <div className="relative px-4 pb-safe pt-3">
          <div className="flex items-center justify-around bg-card/60 backdrop-blur-md rounded-2xl px-2 py-2 shadow-lg border border-border/30">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center justify-center flex-1 py-2 px-1">
                <div className="w-8 h-8 mb-1 bg-muted animate-pulse rounded" />
                <div className="w-12 h-3 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  console.log('MobileBottomNav rendering, activeItem:', activeItem);

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 z-50 md:hidden"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Modern Glassmorphism Background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />

      {/* Safe Area Padding */}
      <div className="relative px-4 pb-safe pt-3">
        {/* Professional Navigation Container */}
        <div className="flex items-center justify-around bg-card/60 backdrop-blur-md rounded-2xl px-2 py-2 shadow-lg border border-border/30">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.href;

            return (
              <div
                key={item.href}
                onClick={() => handleItemClick(item.href, item.type)}
                className="relative flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-200 ease-out group cursor-pointer"
                aria-label={item.label}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(item.href, item.type);
                  }
                }}
              >
                {isActive ? (
                  // Active State - Modern Pill Design
                  <div className="relative flex flex-col items-center justify-center">
                    {/* Active Background Pill */}
                    <div
                      className="absolute inset-0 rounded-xl scale-110 transition-all duration-200"
                      style={{
                        backgroundColor: item.type === 'whatsapp' ? '#25D36620' :
                          item.type === 'call' ? '#007AFF20' :
                            'hsl(var(--primary) / 0.1)'
                      }}
                    />

                    {/* Active Icon */}
                    <div className="relative flex items-center justify-center w-8 h-8 mb-1">
                      <IconComponent
                        className="w-5 h-5 transition-all duration-200"
                        style={{
                          color: item.type === 'whatsapp' ? '#25D366' :
                            item.type === 'call' ? '#007AFF' :
                              'hsl(var(--primary))'
                        }}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Active Label */}
                    <span
                      className="text-xs font-medium transition-all duration-200"
                      style={{
                        color: item.type === 'whatsapp' ? '#25D366' :
                          item.type === 'call' ? '#007AFF' :
                            'hsl(var(--primary))'
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ) : (
                  // Inactive State - Clean Minimal Design
                  <div className="flex flex-col items-center justify-center group-hover:scale-105 transition-all duration-200">
                    {/* Inactive Icon */}
                    <div className="flex items-center justify-center w-8 h-8 mb-1">
                      <IconComponent
                        className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all duration-200"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Inactive Label */}
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-all duration-200">
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
