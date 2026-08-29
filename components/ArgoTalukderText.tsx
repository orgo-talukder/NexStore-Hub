'use client';

import React from 'react';
import { motion } from 'motion/react';

interface ArgoTalukderTextProps {
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showGlow?: boolean;
  showSparkle?: boolean;
  subtext?: string;
}

export function ArgoTalukderText({
  className = '',
  size = 'base',
  showGlow = true,
  showSparkle = true,
  subtext,
}: ArgoTalukderTextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
    '4xl': 'text-4xl sm:text-5xl lg:text-6xl',
  };

  const nameLetters = "Argo Talukder".split("");

  return (
    <span className={`inline-flex items-center gap-1.5 relative group cursor-pointer select-none ${className}`}>
      {/* Background Animated Glow Halo */}
      {showGlow && (
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-electric-blue via-cyber-purple via-pink-500 to-amber-400 opacity-30 blur-lg group-hover:opacity-75 transition-opacity duration-500 animate-gradient-flow pointer-events-none" />
      )}

      {/* Main Animated Text Unit */}
      <motion.span
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`relative z-10 font-outfit font-extrabold tracking-tight ${sizeClasses[size]} inline-flex items-center overflow-hidden py-0.5`}
      >
        {/* Animated Multi-color Fluid Gradient Text */}
        <span className="text-transparent bg-clip-text bg-[length:300%_300%] bg-gradient-to-r from-electric-blue via-sky-300 via-cyber-purple via-rose-500 via-amber-400 via-emerald-400 to-electric-blue animate-gradient-flow drop-shadow-[0_2px_12px_rgba(59,130,246,0.35)] flex items-center">
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 0 }}
              whileHover={{ y: -3, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className="inline-block transition-transform"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>

        {/* Smooth Metallic Shimmer Sweep Light across the text */}
        <motion.span
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3,
            duration: 2,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 opacity-40 mix-blend-overlay"
        />
      </motion.span>

      {/* Optional Sparkle Icon */}
      {showSparkle && (
        <motion.span
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.25, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'linear',
          }}
          className="relative z-10 text-amber-300 text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
        >
          ✨
        </motion.span>
      )}

      {/* Optional Subtext / Badge */}
      {subtext && (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-sky-300 font-semibold tracking-wider uppercase ml-1">
          {subtext}
        </span>
      )}
    </span>
  );
}
