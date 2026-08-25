'use client';

import Link from 'next/link';
import { Star, CheckCircle, ArrowRight, Download, HardDrive } from 'lucide-react';
import { motion } from 'motion/react';
import type { AppItem } from '@/lib/supabase';
import { useState } from 'react';

interface AppCardProps {
  app: AppItem;
  rankBadge?: number;
  featured?: boolean;
}

export function AppCard({ app, rankBadge, featured }: AppCardProps) {
  const [imgError, setImgError] = useState(false);

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-amber-400 to-amber-600 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      case 2:
        return 'bg-gradient-to-br from-slate-200 to-slate-400 text-black border-slate-200 shadow-[0_0_12px_rgba(203,213,225,0.4)]';
      case 3:
        return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white border-amber-500 shadow-[0_0_12px_rgba(180,83,9,0.4)]';
      default:
        return 'bg-deep-navy-solid text-electric-blue border-border-glass';
    }
  };

  return (
    <Link href={`/app/${app.slug || app.id}`} className="block h-full group">
      <motion.div 
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className={`glass-panel rounded-2xl p-5 flex flex-col h-full border transition-all duration-300 relative overflow-hidden ${
          featured 
            ? 'border-electric-blue/40 bg-gradient-to-b from-card-hover/90 to-card-bg/90 shadow-[0_10px_30px_rgba(59,130,246,0.15)]' 
            : 'border-border-glass hover:border-border-hover hover:bg-card-hover/80 hover:shadow-[0_12px_35px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Subtle glow background for top ranked */}
        {rankBadge === 1 && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
        )}
        {featured && (
          <div className="absolute top-0 right-0 w-36 h-36 bg-electric-blue/10 blur-3xl pointer-events-none rounded-full" />
        )}

        {/* Rank Badge */}
        {rankBadge !== undefined && (
          <div 
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 border ${getRankBadgeStyle(rankBadge)}`}
          >
            #{rankBadge}
          </div>
        )}

        <div className="flex items-start gap-4 mb-3.5">
          {/* App Icon */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-deep-navy-solid shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-border-glass flex items-center justify-center relative">
            {!imgError && app.iconUrl ? (
              <img 
                src={app.iconUrl} 
                alt={app.name} 
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-electric-blue/10 text-electric-blue font-bold text-2xl font-outfit">
                {app.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-outfit font-bold text-white truncate text-lg group-hover:text-electric-blue transition-colors">
                {app.name}
              </h3>
              <CheckCircle className="w-4 h-4 text-success-badge shrink-0" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-[11px] font-medium tracking-wide uppercase">
                {app.category ? app.category.replace(/-/g, ' ') : 'General'}
              </span>
              {app.latestVersion && (
                <span className="text-[11px] text-text-muted font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  v{app.latestVersion}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-grow font-inter leading-relaxed">
          {app.shortDescription || app.description}
        </p>

        {/* Footer Meta Details */}
        <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-border-glass/60">
          <div className="flex items-center gap-3">
            {/* Rating */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 text-star-rating fill-star-rating" />
              <span className="text-xs font-bold text-white">{app.rating}</span>
            </div>

            {/* Downloads */}
            <div className="flex items-center gap-1 text-text-muted text-xs font-medium">
              <Download className="w-3.5 h-3.5 text-electric-blue" />
              <span>{app.downloads.toLocaleString()}</span>
            </div>

            {/* Size */}
            {app.apkSize && (
              <div className="hidden sm:flex items-center gap-1 text-text-muted text-xs font-medium">
                <HardDrive className="w-3.5 h-3.5 text-cyber-purple" />
                <span>{app.apkSize}</span>
              </div>
            )}
          </div>
          
          {/* Action CTA */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-xs font-bold px-4 py-2 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
            <span>GET</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80 -ml-1 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}


