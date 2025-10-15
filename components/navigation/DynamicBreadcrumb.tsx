"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';
import { misc, serviceIcon } from '@/constant/icons';

interface DynamicBreadcrumbProps {
  locale: string;
}

export default function DynamicBreadcrumb({ locale }: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const t = useTranslations('breadcrumb');

  // Get icon for path segment - using same icons as navbar
  const getIconForSegment = (segment: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'services': serviceIcon.serviceMenu.icon,  // Same as navbar
      'team': misc.users,                        // Same as navbar
      'blog': misc.blog,                         // Same as navbar
      'contactus': misc.emailIcon,               // Same as navbar
      'free-consultation': misc.emailIcon,       // Same as contact
      'start-your-dream': misc.rocket,           // Rocket for starting projects
      'worksample': misc.portfolio,              // Same as navbar
      'influencers': misc.influencer,            // Same as navbar
      'privacy': misc.formIcon,                  // FileText for legal pages
      'terms': misc.formIcon,                    // FileText for legal pages
      'thank-you': misc.emailIcon,               // Mail for thank you
    };

    return iconMap[segment] || misc.formIcon;
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Always start with home
    breadcrumbs.push({
      name: t('home'),
      href: `/${locale}`,
      isCurrentPage: pathSegments.length === 0,
      icon: misc.home  // Same as navbar
    });

    // Build path segments
    let currentPath = `/${locale}`;
    pathSegments.forEach((segment, index) => {
      // Skip the locale segment
      if (segment === locale) return;

      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      breadcrumbs.push({
        name: segment,
        href: currentPath,
        isCurrentPage: isLast,
        icon: getIconForSegment(segment)
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on homepage if it's just "Home"
  if (breadcrumbs.length === 1) {
    return null;
  }

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const IconComponent = breadcrumb.icon;
              return (
                <React.Fragment key={breadcrumb.href}>
                  <BreadcrumbItem>
                    {breadcrumb.isCurrentPage ? (
                      <BreadcrumbPage className="text-primary font-medium">
                        <IconComponent className="w-5 h-5" />
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={breadcrumb.href}
                        className="hover:text-primary transition-colors"
                        title={breadcrumb.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
