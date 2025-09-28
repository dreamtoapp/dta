"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroAuroraOverlaysProps = {
  respectReducedMotion?: boolean; // when true (default), disables motion if user prefers reduced motion
};

const HeroAuroraOverlays: React.FC<HeroAuroraOverlaysProps> = ({
  respectReducedMotion = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = respectReducedMotion ? !prefersReducedMotion : true;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Plasma Wave Aurora - Liquid Movement */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 w-[80%] h-[70%] opacity-50"
        style={{
          background:
            "conic-gradient(from 180deg at 40% 60%, #d7a50d60 0deg, #99e4ff50 120deg, #0d3ad770 240deg, #d7a50d60 360deg)",
          filter: "blur(40px)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
        animate={shouldAnimate ? {
          x: [-120, 150, -80, 120, -120],
          y: [-80, 100, -40, 80, -80],
          scale: [1, 1.4, 0.7, 1.2, 1],
          rotate: [0, 360],
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 70% 70% 30% / 40% 60% 30% 70%",
            "70% 30% 40% 60% / 70% 40% 60% 30%",
            "40% 60% 60% 40% / 30% 70% 40% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        } : undefined}
        transition={{
          duration: 22,
          ease: "easeInOut",
          repeat: Infinity,
          borderRadius: { duration: 16, ease: "easeInOut" },
        }}
      />

      {/* Neural Network Aurora - Interconnected */}
      <motion.div
        className="absolute right-0 top-0 w-[75%] h-[65%] opacity-55"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 70%, #99e4ff70 0%, transparent 30%), radial-gradient(ellipse 60% 40% at 70% 30%, #0d3ad760 0%, transparent 40%), radial-gradient(ellipse 50% 60% at 50% 50%, #d7a50d50 0%, transparent 50%)",
          filter: "blur(35px)",
          transform: "skew(-10deg, 5deg)",
        }}
        animate={shouldAnimate ? {
          x: [80, -120, 60, -100, 80],
          y: [-60, 80, -40, 70, -60],
          scale: [1.2, 0.6, 1.5, 0.8, 1.2],
          skewX: [-10, 15, -5, 8, -10],
          skewY: [5, -8, 12, -15, 5],
          opacity: [0.4, 0.8, 0.3, 0.7, 0.4],
        } : undefined}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
      />

      {/* Quantum Field Aurora - Morphing Shapes */}
      <motion.div
        className="absolute left-1/4 bottom-0 w-[65%] h-[55%] opacity-45"
        style={{
          background:
            "linear-gradient(45deg, #0d3ad740 0%, transparent 30%), linear-gradient(-45deg, #99e4ff60 0%, transparent 40%), linear-gradient(135deg, #d7a50d50 0%, transparent 35%)",
          filter: "blur(32px)",
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
        }}
        animate={shouldAnimate ? {
          x: [-40, 60, -30, 50, -40],
          y: [60, -80, 40, -60, 60],
          scale: [0.9, 1.6, 0.5, 1.3, 0.9],
          rotate: [0, 120, 240, 360],
          clipPath: [
            "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)",
            "polygon(20% 0%, 80% 0%, 100% 20%, 80% 80%, 20% 100%, 0% 80%)",
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
          ],
        } : undefined}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2.5,
          clipPath: { duration: 20, ease: "easeInOut" },
        }}
      />

      {/* Stellar Nebula Aurora - Multi-layered */}
      <motion.div
        className="absolute right-1/3 top-1/2 w-[45%] h-[40%] opacity-55"
        style={{
          background:
            "conic-gradient(from 45deg, #d7a50d80, #99e4ff60, #0d3ad770, #d7a50d50, #99e4ff80)",
          filter: "blur(28px)",
          mixBlendMode: "color-dodge",
        }}
        animate={shouldAnimate ? {
          x: [30, -50, 40, -40, 30],
          y: [-30, 60, -20, 50, -30],
          scale: [1, 0.4, 1.8, 0.7, 1],
          rotate: [0, -180, -360],
          opacity: [0.3, 0.9, 0.2, 0.7, 0.3],
        } : undefined}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity, delay: 3 }}
      />

      {/* Energy Vortex Aurora - Spiral Motion */}
      <motion.div
        className="absolute left-1/2 top-1/4 w-[40%] h-[45%] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, #0d3ad750 30%, transparent 45%, #99e4ff60 55%, transparent 70%, #d7a50d40 80%, transparent 100%)",
          filter: "blur(36px)",
        }}
        animate={shouldAnimate ? {
          x: [0, 40, -60, 20, -30, 0],
          y: [0, -50, 30, -40, 60, 0],
          scale: [1, 1.3, 0.6, 1.7, 0.4, 1],
          rotate: [0, 720],
          opacity: [0.4, 0.8, 0.2, 0.9, 0.1, 0.4],
        } : undefined}
        transition={{
          duration: 32,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 4,
          rotate: { duration: 20, ease: "linear" },
        }}
      />

      {/* Dynamic Light Sweep - Diagonal */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(45deg, transparent 0%, #d7a50d20 20%, #99e4ff30 50%, #0d3ad720 80%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={shouldAnimate ? {
          x: ["-100%", "100%"],
          opacity: [0.1, 0.4, 0.2, 0.1],
        } : undefined}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />

      {/* Counter Light Sweep */}
      <motion.div
        className="absolute inset-0 opacity-18"
        style={{
          background:
            "linear-gradient(-45deg, transparent 0%, #99e4ff25 30%, #d7a50d20 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={shouldAnimate ? {
          x: ["100%", "-100%"],
          opacity: [0.05, 0.3, 0.1, 0.05],
        } : undefined}
        transition={{ duration: 12, ease: "linear", repeat: Infinity, delay: 1 }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full shadow-lg"
          style={{
            width: `${8 + i * 2}px`,
            height: `${8 + i * 2}px`,
            left: `${15 + i * 15}%`,
            top: `${20 + i * 10}%`,
            background: i % 3 === 0 ? "#d7a50d" : i % 3 === 1 ? "#99e4ff" : "#0d3ad7",
            opacity: 0.5,
            filter: "blur(1px)",
          }}
          animate={shouldAnimate ? {
            y: [-30, -80, -30],
            x: [-10, 20, -15, 10, -10],
            opacity: [0.2, 0.8, 0.1, 0.6, 0.2],
            scale: [0.5, 1.2, 0.3, 1, 0.5],
          } : undefined}
          transition={{
            duration: 6 + i * 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Pulsing Center Glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle at center, #0d3ad730 0%, transparent 60%)",
          filter: "blur(18px)",
        }}
        animate={shouldAnimate ? {
          scale: [1, 1.2, 0.8, 1.1, 1],
          opacity: [0.1, 0.3, 0.05, 0.2, 0.1],
        } : undefined}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Rotating Ring Effect */}
      <motion.div
        className="absolute inset-0 opacity-12"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #d7a50d40 25%, transparent 50%, #99e4ff40 75%, transparent 100%)",
          filter: "blur(20px)",
          borderRadius: "50%",
        }}
        animate={shouldAnimate ? {
          rotate: [0, 360],
          scale: [0.8, 1.1, 0.9, 1.0, 0.8],
        } : undefined}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      />

      {/* Subtle vignette to increase text clarity */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.18) 40%, transparent 65%)",
        }}
      />
    </div>
  );
};

export default HeroAuroraOverlays;


