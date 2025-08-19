"use client";

import React from "react";
import LangSwitcher from "./LangSwicher";
import ThemeSwitch from "./ThemeSwitch";

// Enhanced Action Buttons Component
const NavbarActions: React.FC<{ locale: string }> = ({ locale }) => {
  return (
    <div className="flex items-center gap-2">
      <ThemeSwitch />
      <LangSwitcher locale={locale} />
    </div>
  );
};

export default NavbarActions; 