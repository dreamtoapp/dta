"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';

// Mobile Brand Component with Full Width Logo
const MobileBrand: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations('navbar');

  const getLogoPath = (isDark: boolean = false): string => {
    return isDark
      ? "/assets/dreamtoapp/dreamToApp-dark.svg"
      : "/assets/dreamtoapp/dreamToApp.svg";
  };

  return (
    <Link
      href={`/${locale}`}
      className="flex items-center justify-center w-full group transition-all duration-300"
      aria-label={t("dreamToAppHome")}
    >
      <div className="relative">
        <Image
          src={getLogoPath(false)}
          alt={t("dreamToAppLogo")}
          width={80}
          height={80}
          className="w-20 h-20 block dark:hidden transition-all duration-300"
          priority
        />
        <Image
          src={getLogoPath(true)}
          alt={t("dreamToAppLogo")}
          width={80}
          height={80}
          className="w-20 h-20 hidden dark:block transition-all duration-300"
          priority
        />
      </div>
    </Link>
  );
};

export default MobileBrand; 