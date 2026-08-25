'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import type { BannerItem } from '@/lib/supabase';

export function HeroSlider({ banners }: { banners: BannerItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      handleNext(); // Swiped left -> next
    } else if (diff < -45) {
      handlePrev(); // Swiped right -> prev
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused, handleNext]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  if (!currentBanner) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const bannerContent = (
    <AnimatePresence initial={false} custom={direction} mode="popLayout">
      <motion.div
        key={currentBanner.id || `banner-${currentIndex}`}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', stiffness: 280, damping: 32 },
          opacity: { duration: 0.25 },
        }}
        className="absolute inset-0 w-full h-full"
      >
        {currentBanner.imageUrl ? (
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title || 'Marketplace Banner'}
            className="w-full h-full object-cover select-none"
            draggable={false}
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 flex items-center justify-center text-text-muted">
            <span>Banner Image</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl group mb-8 sm:mb-12 aspect-[16/9] sm:aspect-[21/8] lg:aspect-[24/8] bg-deep-navy-solid border border-border-glass shadow-2xl touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Image Container */}
      {currentBanner.linkUrl ? (
        <Link
          href={currentBanner.linkUrl}
          className="block w-full h-full cursor-pointer relative"
          aria-label={currentBanner.title || 'View featured app'}
        >
          {bannerContent}
        </Link>
      ) : (
        <div className="w-full h-full relative">
          {bannerContent}
        </div>
      )}

      {/* Slider Controls (Only if multiple banners exist) */}
      {banners.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cosmic-obsidian/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-cosmic-obsidian hover:scale-110 shadow-lg z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cosmic-obsidian/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-cosmic-obsidian hover:scale-110 shadow-lg z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-cosmic-obsidian/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 bg-electric-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

