"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useTranslations } from 'next-intl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { serviceIcon, misc, technology } from "@/constant/icons";
import MobileBrand from "./MobileBrand";

// Enhanced Mobile Menu Component
const MobileMenu: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('homepage');
  const navbarT = useTranslations('navbar');
  const [activeItem, setActiveItem] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize menuItems to prevent recreation on every render
  const menuItems = useMemo(() => [
    { href: '/', label: t('home'), icon: misc.home, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
    { href: '/services', label: t('services'), icon: serviceIcon.website.icon, color: '#0d3ad7', rippleColor: '#0d3ad7', bgColor: '#0d3ad7' },
    { href: '/influencers', label: 'Influencers', icon: serviceIcon.website.icon, color: '#8B5CF6', rippleColor: '#8B5CF6', bgColor: '#8B5CF6' },
    { href: '/worksample', label: t('portfolio'), icon: technology.workSample.icon, color: '#99e4ff', rippleColor: '#99e4ff', bgColor: '#99e4ff' },
    { href: '/contactus', label: t('contact'), icon: misc.emailIcon, color: '#d7a50d', rippleColor: '#d7a50d', bgColor: '#d7a50d' },
  ], [t]);

  // Set mounted state to true after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set active item based on current pathname - only after mounting
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

  const handleItemClick = (itemHref: string, itemColor: string) => {
    // Close the sheet first
    setIsSheetOpen(false);

    // Create global ripple effect on navbar
    const navbar = document.querySelector('header') as HTMLElement;
    if (navbar) {
      try {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${itemColor}40;
          transform: scale(0);
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
          z-index: 9999;
          transform-origin: top left;
        `;

        // Add to navbar
        navbar.style.position = 'relative';
        navbar.appendChild(ripple);

        // Trigger ripple animation with requestAnimationFrame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ripple.style.transform = 'scale(100)';
            ripple.style.opacity = '0.6';
          });
        });

        // Start fade out animation
        setTimeout(() => {
          ripple.style.opacity = '0';
          ripple.style.transform = 'scale(120)';
        }, 600);

        // Remove ripple after fade out
        setTimeout(() => {
          if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 1000);
      } catch (error) {
        console.warn('Ripple animation failed:', error);
      }
    }

    // Navigate after a short delay
    setTimeout(() => {
      window.location.href = `/${locale}${itemHref}`;
    }, 500);
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group transition-all duration-300 hover:bg-primary/10"
            aria-label={navbarT("openMenu")}
          >
            <div className="relative">
              <Menu className="h-5 w-5 transition-all duration-300 group-hover:rotate-90" />
              <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50 light-mode-depth bg-gradient-brand-soft flex flex-col">
          <SheetHeader className="pb-4 border-b border-border/20">
            <SheetTitle className="text-center">
              <MobileBrand locale={locale} />
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col flex-1">
            <nav className="pt-4 layout-stable prevent-layout-shift" style={{ minHeight: '20rem', contain: 'layout' }}>
              <div className="space-y-2">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleItemClick(item.href, item.color)}
                      className="relative flex items-center w-full px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 group hover:bg-muted/20 layout-stable"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        backgroundColor: 'transparent',
                        minHeight: '3.5rem',
                        contain: 'layout'
                      }}
                    >
                      {/* Icon Container */}
                      <div className="relative flex items-center justify-center w-10 h-10 mr-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${item.bgColor}15` }}>
                        <IconComponent
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: item.color }}
                        />
                      </div>

                      {/* Label */}
                      <span
                        className="transition-all duration-300 group-hover:translate-x-1"
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* CTA Section - Fixed at bottom */}
          <div className="mt-auto pt-6 px-4 py-4 bg-brand-accent-subtle rounded-xl border border-border/30 light-mode-depth">
            <div className="text-center mb-3">
              <p className="text-sm font-medium text-foreground mb-1">
                {navbarT("readyToStart")}
              </p>
              <p className="text-xs text-muted-foreground">
                {navbarT("getInTouch")}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => handleItemClick('/contactus', '#d7a50d')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] text-white rounded-lg text-sm font-semibold hover:from-[#f4c430] hover:to-[#d7a50d] transition-all duration-300 hover:scale-105 light-mode-depth hover:light-mode-depth-hover transform hover:-translate-y-1"
              >
                <span>{navbarT("startProject")}</span>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative group transition-all duration-300 hover:bg-primary/10"
          aria-label={navbarT("openMenu")}
        >
          <div className="relative">
            <Menu className="h-5 w-5 transition-all duration-300 group-hover:rotate-90" />
            <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl flex flex-col">
        <SheetHeader className="pb-4 border-b border-border/20">
          <SheetTitle className="text-center">
            <MobileBrand locale={locale} />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1">
          <nav className="pt-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.href;

                return (
                  <button
                    key={item.href}
                    onClick={() => handleItemClick(item.href, item.color)}
                    className="relative flex items-center w-full px-4 py-4 text-lg font-medium rounded-xl transition-all duration-300 group hover:bg-muted/20"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      backgroundColor: isActive ? `${item.bgColor}20` : 'transparent'
                    }}
                  >
                    {/* Icon Container */}
                    <div className="relative flex items-center justify-center w-10 h-10 mr-8 rounded-lg transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.bgColor}15` }}>
                      <IconComponent
                        className="w-5 h-5 transition-colors duration-300"
                        style={{ color: item.color }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: isActive ? item.color : undefined }}
                    >
                      {item.label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className="absolute right-4 w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* CTA Section - Fixed at bottom */}
        <div className="mt-auto pt-6 px-4 py-4 bg-gradient-to-r from-[#d7a50d]/15 to-[#f4c430]/15 rounded-xl border border-[#d7a50d]/30 shadow-lg">
          <div className="text-center mb-3">
            <p className="text-sm font-medium text-foreground mb-1">
              {navbarT("readyToStart")}
            </p>
            <p className="text-xs text-muted-foreground">
              {navbarT("getInTouch")}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleItemClick('/contactus', '#d7a50d')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d7a50d] to-[#f4c430] text-white rounded-lg text-sm font-semibold hover:from-[#f4c430] hover:to-[#d7a50d] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#d7a50d]/30 transform hover:-translate-y-1"
            >
              <span>{navbarT("startProject")}</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu; 