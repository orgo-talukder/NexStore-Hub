'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  CheckCircle2, 
  GraduationCap, 
  Wrench, 
  PlaySquare, 
  Star, 
  Download, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  Flame, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ChevronLeft
} from 'lucide-react';
import type { AppItem, BannerItem, CategoryItem } from '@/lib/supabase';

interface MobileAppStoreViewProps {
  banners: BannerItem[];
  categories: CategoryItem[];
  topApps: AppItem[];
  latestApps: AppItem[];
  spotlightApps: AppItem[];
}

export function MobileAppStoreView({
  banners,
  categories,
  topApps,
  latestApps,
  spotlightApps,
}: MobileAppStoreViewProps) {
  // Built-in category icons mapping for vivid mobile squircles
  const defaultCategoryBadges = [
    {
      id: 'games',
      name: 'Games',
      icon: Gamepad2,
      gradient: 'from-indigo-600 to-purple-600 text-white shadow-purple-500/25',
      href: '/categories?category=games',
    },
    {
      id: 'productivity',
      name: 'Productivity',
      icon: CheckCircle2,
      gradient: 'from-blue-600 to-cyan-500 text-white shadow-blue-500/25',
      href: '/categories?category=productivity',
    },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      gradient: 'from-emerald-600 to-teal-500 text-white shadow-emerald-500/25',
      href: '/categories?category=education',
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: Wrench,
      gradient: 'from-amber-500 to-orange-600 text-white shadow-orange-500/25',
      href: '/categories?category=tools',
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: PlaySquare,
      gradient: 'from-rose-600 to-pink-600 text-white shadow-rose-500/25',
      href: '/categories?category=entertainment',
    },
  ];

  // Pick apps for sections
  const editorsChoiceApps = spotlightApps.length > 0 ? spotlightApps : topApps.slice(0, 4);
  const topGamesOrReleases = latestApps.length > 0 ? latestApps.slice(0, 4) : topApps.slice(4, 8);

  return (
    <div className="w-full space-y-6 pb-6 text-white font-inter select-none">
      
      {/* 1. MOBILE TOUCH BANNER SLIDER */}
      <MobileBannerSlider banners={banners} />

      {/* 2. TOP CATEGORIES SQUIRCLE ROW (WITHOUT VISIBLE SCROLLBAR) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-outfit font-bold text-white tracking-wide">
            Top Categories
          </h3>
          <Link
            href="/categories"
            className="text-xs font-semibold text-electric-blue hover:text-sky-300 transition-colors flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Horizontal Touch Carousel with zero scrollbar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar hide-scrollbar touch-pan-x scroll-smooth overscroll-x-contain">
          {defaultCategoryBadges.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform w-[68px]"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors truncate max-w-full text-center">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. EDITORS' CHOICE (POPULAR APPS SQUIRCLE GRID) */}
      {editorsChoiceApps.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-outfit font-bold text-white tracking-wide">
              Editors&apos; Choice
            </h3>
            <Link
              href="/apps?sort=popular"
              className="text-xs font-semibold text-electric-blue hover:text-sky-300 transition-colors flex items-center gap-0.5"
            >
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {editorsChoiceApps.slice(0, 4).map((app) => (
              <MobileSquircleAppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      )}

      {/* 4. TOP GAMES / FRESH DROPS SECTION */}
      {topGamesOrReleases.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-outfit font-bold text-white tracking-wide">
              Top Games &amp; Apps
            </h3>
            <Link
              href="/apps?sort=newest"
              className="text-xs font-semibold text-electric-blue hover:text-sky-300 transition-colors flex items-center gap-0.5"
            >
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {topGamesOrReleases.slice(0, 4).map((app) => (
              <MobileSquircleAppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      )}

      {/* 5. TRENDING APPS COMPACT LIST FEED (WITH FAST "GET" BUTTON) */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-outfit font-bold text-white tracking-wide">
              Trending Applications
            </h3>
          </div>
          <Link
            href="/apps"
            className="text-xs font-semibold text-electric-blue hover:text-sky-300 transition-colors flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {topApps.slice(0, 6).map((app, idx) => (
            <Link
              key={app.id}
              href={`/app/${app.slug || app.id}`}
              className="flex items-center justify-between p-3 rounded-2xl bg-card-bg/90 border border-border-glass hover:border-electric-blue/40 transition-all active:scale-[0.98] shadow-md group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                {/* Ranking number */}
                <span className="font-outfit font-bold text-xs text-text-muted w-4 text-center">
                  {idx + 1}
                </span>

                {/* App Icon */}
                <div className="w-12 h-12 rounded-xl bg-deep-navy-solid overflow-hidden border border-white/10 shrink-0 shadow-sm flex items-center justify-center">
                  {app.iconUrl ? (
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="font-outfit font-bold text-electric-blue text-lg">
                      {app.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <h4 className="font-outfit font-bold text-white text-sm truncate group-hover:text-electric-blue transition-colors">
                      {app.name}
                    </h4>
                    {app.releaseChannel && (
                      <span className={`text-[9px] font-bold font-mono px-1.5 py-0.2 rounded uppercase border shrink-0 ${
                        app.releaseChannel.toLowerCase() === 'beta'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : app.releaseChannel.toLowerCase() === 'alpha'
                          ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {app.releaseChannel}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted capitalize truncate font-normal">
                    {app.category ? app.category.replace(/-/g, ' ') : 'Productivity'} &bull; {app.rating} ★ &bull; {app.apkSize || '29 MB'}
                  </p>
                </div>
              </div>

              {/* GET Button */}
              <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/10 text-electric-blue font-bold text-xs group-hover:bg-electric-blue group-hover:text-white transition-all shadow-sm">
                GET
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TRUST HIGHLIGHT BANNER */}
      <div className="p-4 rounded-2xl bg-[#091024] border border-border-glass flex items-center justify-around text-center text-xs text-slate-300 shadow-md">
        <div className="space-y-1">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
          <span className="text-[10px] font-semibold text-white block">100% Safe</span>
          <span className="text-[9px] text-text-muted">Verified</span>
        </div>
        <div className="w-[1px] h-8 bg-white/10" />
        <div className="space-y-1">
          <Zap className="w-5 h-5 text-electric-blue mx-auto" />
          <span className="text-[10px] font-semibold text-white block">Lightning</span>
          <span className="text-[9px] text-text-muted">Fast Speed</span>
        </div>
        <div className="w-[1px] h-8 bg-white/10" />
        <div className="space-y-1">
          <Star className="w-5 h-5 text-amber-400 mx-auto fill-amber-400" />
          <span className="text-[10px] font-semibold text-white block">Top Rated</span>
          <span className="text-[9px] text-text-muted">Curated</span>
        </div>
      </div>

    </div>
  );
}

// 📱 Subcomponent: Touch-enabled Mobile Banner Carousel Slider
function MobileBannerSlider({ banners }: { banners: BannerItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Default fallback promo banners if database has fewer items
  const activeBanners = banners && banners.length > 0 ? banners : [
    {
      id: 'default-1',
      title: 'Mega Deals',
      subtitle: 'Best apps & games with lightning-fast downloads up to 70% OFF',
      badgeText: 'FEATURED',
      linkUrl: '/apps',
      imageUrl: '',
      isActive: true,
      sortOrder: 0,
      createdAt: new Date().toISOString()
    }
  ];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  }, [activeBanners.length]);

  // Touch Swipe Handlers for mobile screens
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40) {
      handleNext(); // Swiped left -> next banner
    } else if (diff < -40) {
      handlePrev(); // Swiped right -> prev banner
    }
    setTouchStartX(null);
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Auto-play interval
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [activeBanners.length, isPaused, handleNext]);

  const current = activeBanners[currentIndex];
  if (!current) return null;

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

  return (
    <div 
      className="relative w-full rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] touch-pan-y border border-white/[0.1] bg-[#0d1633]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-[175px] overflow-hidden">
        
        {/* Ambient Neon Backlights */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyber-purple/35 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-electric-blue/25 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id || `mobile-banner-${currentIndex}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 32 },
              opacity: { duration: 0.25 },
            }}
            className="w-full h-full"
          >
            {/* If banner has a custom photo, display flush edge-to-edge with no padding or gaps */}
            {current.imageUrl ? (
              <Link 
                href={current.linkUrl || '/apps'} 
                className="relative block w-full h-full group"
              >
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                {/* Subtle bottom shadow overlay to keep pagination dots & text clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-obsidian/80 via-transparent to-black/20 pointer-events-none" />
                
                {/* Optional overlay text if banner has custom title */}
                {current.badgeText && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#060911]/80 backdrop-blur-md border border-white/20 text-[9px] font-bold uppercase tracking-wider text-sky-300">
                      {current.badgeText}
                    </span>
                  </div>
                )}
              </Link>
            ) : (
              /* If banner is a promotional Card without custom image (3D Graphic style) */
              <div className="w-full h-full p-4 flex items-center justify-between gap-3 bg-gradient-to-br from-[#121c3b] via-[#192452] to-[#251b4d]">
                <div className="space-y-1.5 max-w-[65%]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-electric-blue/20 border border-electric-blue/40 text-[10px] font-bold uppercase tracking-wider text-sky-300">
                    {current.badgeText || 'FEATURED'}
                  </span>
                  <h2 className="text-lg font-outfit font-extrabold tracking-tight text-white leading-tight line-clamp-1">
                    {current.title || 'NexStore'}
                  </h2>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    {current.subtitle || 'Best apps & games with lightning-fast direct downloads.'}
                  </p>
                  <div className="pt-1">
                    <Link
                      href={current.linkUrl || '/apps'}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-xs font-bold shadow-lg shadow-electric-blue/30 active:scale-95 transition-transform"
                    >
                      <span>Explore Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* 3D Visual Box / Gift Graphic */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center relative shadow-inner">
                    <div className="p-3 rounded-xl bg-gradient-to-tr from-cyber-purple to-electric-blue text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] transform -rotate-6">
                      <Gift className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-400 text-black shadow-md">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Dots (Only if multiple banners exist) */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-cosmic-obsidian/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-md">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-5 bg-electric-blue shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                    : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Subcomponent: Individual Squircle App Card (Matches the phone UI in reference image)
function MobileSquircleAppCard({ app }: { app: AppItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/app/${app.slug || app.id}`}
      className="flex flex-col items-center text-center group active:scale-95 transition-transform"
    >
      {/* App Squircle Icon */}
      <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-[#0d1633] border border-white/[0.12] shadow-lg flex items-center justify-center p-0.5 relative group-hover:border-electric-blue/50 transition-colors">
        {!imgError && app.iconUrl ? (
          <img
            src={app.iconUrl}
            alt={app.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-[14px] bg-gradient-to-tr from-electric-blue/20 to-cyber-purple/20 flex items-center justify-center text-electric-blue font-bold text-xl font-outfit">
            {app.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* App Title */}
      <span className="text-xs font-semibold text-white mt-1.5 truncate max-w-[76px] leading-tight group-hover:text-electric-blue transition-colors">
        {app.name}
      </span>

      {/* Category Subtitle */}
      <span className="text-[10px] text-text-muted truncate max-w-[76px] leading-none mt-0.5 capitalize">
        {app.category ? app.category.replace(/-/g, ' ') : 'General'}
      </span>
    </Link>
  );
}

