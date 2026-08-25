'use client';

import { useState } from 'react';
import { Star, ShieldCheck, Download, HardDrive, Bookmark, Share2, Check } from 'lucide-react';
import { DownloadButton } from '@/components/DownloadButton';
import { useSavedApps } from '@/lib/savedStore';
import type { AppItem } from '@/lib/supabase';

export function AppHeroDetail({ app }: { app: AppItem }) {
  const [downloadCount, setDownloadCount] = useState(app.downloads);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isSaved, toggleSave } = useSavedApps();
  const saved = isSaved(app.id);

  const handleDownloadSuccess = (newCount?: number) => {
    if (typeof newCount === 'number') {
      setDownloadCount(newCount);
    } else {
      setDownloadCount((prev) => prev + 1);
    }
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${app.name} on NexStore`,
            text: `Download ${app.name} APK safely on NexStore`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch {
        // user aborted share
      }
    }
  };

  return (
    <>
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mb-8 sm:mb-12 relative overflow-hidden border border-border-glass">
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-purple/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start text-center md:text-left">
          {/* App Icon */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-border-glass shrink-0 bg-deep-navy-solid flex items-center justify-center">
            {!imgError && app.iconUrl ? (
              <img 
                src={app.iconUrl} 
                alt={app.name} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-electric-blue/15 text-electric-blue font-bold text-3xl sm:text-4xl font-outfit">
                {app.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-outfit font-bold text-white tracking-tight">{app.name}</h1>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                {app.category}
              </span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 mb-6 text-xs sm:text-sm text-text-secondary">
              <span className="font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-text-muted">
                {app.packageName || app.id}
              </span>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 mb-8 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
              {/* Rating */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-medium">Rating</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-star-rating fill-star-rating" />
                  <span className="text-white font-bold text-lg sm:text-xl">{app.rating}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden sm:block" />

              {/* Downloads */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-medium">Downloads</span>
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-electric-blue" />
                  <span className="text-white font-bold text-lg sm:text-xl">{downloadCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden sm:block" />

              {/* Size */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-medium">Size</span>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-cyber-purple" />
                  <span className="text-white font-bold text-lg sm:text-xl">{app.apkSize || 'N/A'}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden sm:block" />

              {/* Version */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-medium">Version</span>
                <span className="text-white font-bold text-lg sm:text-xl">v{app.latestVersion}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <DownloadButton 
                appId={app.id} 
                downloadUrl={app.apkUrl} 
                onDownloadComplete={handleDownloadSuccess}
              />

              <button
                type="button"
                onClick={() => toggleSave(app.id)}
                aria-label={saved ? 'Remove from saved' : 'Save to library'}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md ${
                  saved
                    ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple'
                    : 'bg-card-bg/90 border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share app"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl sm:rounded-2xl border border-border-glass bg-card-bg/90 text-text-secondary hover:text-white hover:border-electric-blue/40 text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
