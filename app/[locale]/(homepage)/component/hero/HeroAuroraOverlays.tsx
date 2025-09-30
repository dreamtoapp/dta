"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroAuroraOverlaysProps = {
  respectReducedMotion?: boolean; // when true (default), disables motion if user prefers reduced motion
};

/**
 * Senior UI/UX Enhanced Aurora Overlay System
 * 
 * Design Principles Applied:
 * - Performance: Optimized animation count and complexity
 * - Visual Hierarchy: Strategic layering for depth without distraction
 * - User Focus: Enhances content readability, never competes with it
 * - Accessibility: Full reduced motion support
 * - Modern Aesthetics: Sophisticated gradients with purpose
 */
const HeroAuroraOverlays: React.FC<HeroAuroraOverlaysProps> = ({
  respectReducedMotion = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = respectReducedMotion ? !prefersReducedMotion : true;

  // Smooth easing curve for professional feel
  const smoothEasing = [0.43, 0.13, 0.23, 0.96] as const;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden my-4 rounded-2xl" aria-hidden="true">
      {/* PRIMARY LAYER: Dynamic Aurora Wave - Eye-catching base */}
      <motion.div
        className="absolute -left-1/4 -top-1/3 w-[95%] h-[85%] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 35% 45%, rgba(215, 165, 13, 0.55) 0%, transparent 55%), radial-gradient(ellipse 65% 65% at 65% 55%, rgba(153, 228, 255, 0.45) 0%, transparent 55%)",
          filter: "blur(50px)",
          borderRadius: "45% 55% 48% 52% / 55% 45% 55% 45%",
        }}
        animate={shouldAnimate ? {
          x: [0, 80, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.45, 0.65, 0.4, 0.45],
          rotate: [0, 5, -5, 0],
          borderRadius: [
            "45% 55% 48% 52% / 55% 45% 55% 45%",
            "55% 45% 52% 48% / 45% 55% 45% 55%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "45% 55% 48% 52% / 55% 45% 55% 45%",
          ],
        } : undefined}
        transition={{
          duration: 15,
          ease: smoothEasing,
          repeat: Infinity,
        }}
      />

      {/* SECONDARY LAYER: Vibrant Plasma Flow - Catchy movement */}
      <motion.div
        className="absolute -right-1/4 top-1/4 w-[90%] h-[75%] opacity-45"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 55% 45%, rgba(13, 58, 215, 0.6) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 35% 65%, rgba(215, 165, 13, 0.4) 0%, transparent 55%)",
          filter: "blur(48px)",
          mixBlendMode: "screen",
        }}
        animate={shouldAnimate ? {
          x: [0, -80, 40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.4, 0.6, 0.35, 0.4],
          rotate: [0, -8, 8, 0],
        } : undefined}
        transition={{ duration: 14, ease: smoothEasing, repeat: Infinity, delay: 1 }}
      />

      {/* TERTIARY LAYER: Color-Shifting Accent - Mesmerizing bottom glow */}
      <motion.div
        className="absolute left-0 -bottom-1/4 w-[80%] h-[70%] opacity-40"
        style={{
          background:
            "conic-gradient(from 45deg at 50% 60%, rgba(153, 228, 255, 0.5) 0deg, rgba(215, 165, 13, 0.45) 120deg, rgba(13, 58, 215, 0.4) 240deg, rgba(153, 228, 255, 0.5) 360deg)",
          filter: "blur(45px)",
        }}
        animate={shouldAnimate ? {
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.95, 1],
          opacity: [0.35, 0.55, 0.3, 0.35],
          rotate: [0, 180, 360],
        } : undefined}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, delay: 2 }}
      />

      {/* ACCENT LAYER: Dynamic Light Sweep - Eye-catching shimmer */}
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(215, 165, 13, 0.3) 30%, rgba(153, 228, 255, 0.4) 50%, rgba(13, 58, 215, 0.3) 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={shouldAnimate ? {
          x: ["-150%", "150%"],
          opacity: [0.15, 0.35, 0.15],
        } : undefined}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      />

      {/* DETAIL LAYER: Vibrant Floating Orbs - Catchy particle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full shadow-lg"
          style={{
            width: `${10 + i * 3}px`,
            height: `${10 + i * 3}px`,
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
            background:
              i % 3 === 0
                ? "radial-gradient(circle, rgba(215, 165, 13, 0.85) 0%, rgba(215, 165, 13, 0.2) 60%, transparent 80%)"
                : i % 3 === 1
                  ? "radial-gradient(circle, rgba(153, 228, 255, 0.8) 0%, rgba(153, 228, 255, 0.2) 60%, transparent 80%)"
                  : "radial-gradient(circle, rgba(13, 58, 215, 0.75) 0%, rgba(13, 58, 215, 0.2) 60%, transparent 80%)",
            filter: "blur(1px)",
            boxShadow: i % 3 === 0
              ? "0 0 20px rgba(215, 165, 13, 0.6)"
              : i % 3 === 1
                ? "0 0 20px rgba(153, 228, 255, 0.5)"
                : "0 0 20px rgba(13, 58, 215, 0.5)",
          }}
          animate={shouldAnimate ? {
            y: [0, -60, -30, 0],
            x: [0, 25 * (i % 2 === 0 ? 1 : -1), 10 * (i % 2 === 0 ? -1 : 1), 0],
            opacity: [0.4, 0.85, 0.5, 0.4],
            scale: [1, 1.5, 0.8, 1],
          } : undefined}
          transition={{
            duration: 6 + i * 0.8,
            ease: smoothEasing,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* FOCUS LAYER: Pulsing Spotlight - Dramatic attention grabber */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(13, 58, 215, 0.4) 0%, rgba(153, 228, 255, 0.2) 30%, transparent 65%)",
          filter: "blur(25px)",
          mixBlendMode: "screen",
        }}
        animate={shouldAnimate ? {
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.25, 0.45, 0.2, 0.25],
        } : undefined}
        transition={{ duration: 4, ease: smoothEasing, repeat: Infinity }}
      />

      {/* BONUS LAYER: Rotating Light Beams - Ultra catchy */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0%, rgba(215, 165, 13, 0.4) 15%, transparent 30%, rgba(153, 228, 255, 0.35) 45%, transparent 60%, rgba(13, 58, 215, 0.3) 75%, transparent 90%)",
          filter: "blur(35px)",
        }}
        animate={shouldAnimate ? {
          rotate: [0, 360],
          scale: [0.95, 1.05, 0.95],
          opacity: [0.15, 0.3, 0.15],
        } : undefined}
        transition={{
          rotate: { duration: 20, ease: "linear", repeat: Infinity },
          scale: { duration: 8, ease: smoothEasing, repeat: Infinity },
          opacity: { duration: 6, ease: smoothEasing, repeat: Infinity },
        }}
      />

      {/* CLARITY LAYER: Balanced Vignette - Keeps text readable while showing colors */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.18) 75%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      {/* GLASSMORPHISM HINT: Subtle modern texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
          `,
        }}
      />
    </div>
  );
};

export default HeroAuroraOverlays;