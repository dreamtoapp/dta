"use client";
import React from "react";

type DreamToAppCSSProps = {
  size?: number; // square size in px
  className?: string;
  animated?: boolean;
};

/**
 * Pure CSS brand mark inspired by DreamToApp.
 * - Draws a geometric "D" with a carved inner shape and accent dot.
 * - Uses Tailwind utilities + inline style for size; no images or SVG.
 */
const DreamToAppCSS: React.FC<DreamToAppCSSProps> = ({ size = 96, className = "", animated = true }) => {
  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="DreamToApp mark"
      role="img"
    >
      {/* Outer D body */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0d3ad7] via-[#3b82f6] to-[#99e4ff] shadow-[0_12px_40px_rgba(13,58,215,0.35)]" />

      {/* Inner carve to form the D counter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[68%] w-[50%] rounded-l-xl bg-background/95 backdrop-blur-sm"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
      />

      {/* Vertical spine hint */}
      <div className="absolute left-[18%] top-[16%] bottom-[16%] w-[10%] rounded-full bg-white/20" />

      {/* Accent dot (the "to" point) */}
      <div
        className={`absolute -right-[10%] top-1/2 -translate-y-1/2 h-[22%] w-[22%] rounded-full bg-gradient-to-br from-[#d7a50d] to-[#f4c430] shadow-[0_8px_24px_rgba(215,165,13,0.45)] ${animated ? "animate-pulse" : ""
          }`}
      />

      {/* Subtle gloss */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/10 to-white/20 mix-blend-overlay" />
    </div>
  );
};

export default DreamToAppCSS;




