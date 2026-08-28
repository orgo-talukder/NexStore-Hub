'use client';

import { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Download, 
  HardDrive, 
  Bookmark, 
  Share2, 
  Check, 
  Cpu, 
  Smartphone, 
  Copy,
  Layers
} from 'lucide-react';
import { DownloadButton } from '@/components/DownloadButton';
import { useSavedApps } from '@/lib/savedStore';
import { formatApkSize, type AppItem, type VersionItem } from '@/lib/supabase';

function formatArchitecture(arch?: string): string {
  if (!arch) return 'Universal (All ABIs)';
  const lower = arch.toLowerCase().trim();
  if (lower === 'universal' || lower === 'all') return 'Universal (All ABIs)';
  if (lower === 'arm64-v8a' || lower === 'arm64') return 'ARM64-v8a';
  if (lower === 'armeabi-v7a' || lower === 'armv7' || lower === 'armeabi') return 'ARMv7';
  if (lower === 'x86_64' || lower === 'x86-64') return 'x86_64';
  if (lower === 'x86') return 'x86';
  return arch;
}

function getChannelBadge(channel?: string) {
  const ch = (channel || 'stable').toLowerCase().trim();
  switch (ch) {
    case 'beta':
      return {
        label: 'BETA',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      };
    case 'alpha':
      return {
        label: 'ALPHA',
        className: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40 shadow-[0_0_12px_rgba(217,70,239,0.2)]',
      };
    case 'nightly':
      return {
        label: 'NIGHTLY',
        className: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]',
      };
    case 'stable':
    default:
      return {
        label: 'STABLE',
        className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
      };
  }
}

export function AppHeroDetail({ 
  app, 
  latestVersion 
}: { 
  app: AppItem; 
  latestVersion?: VersionItem;
}) {
  const [downloadCount, setDownloadCount] = useState(app.downloads);
  const [imgError, setImgError] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedPkg, setCopiedPkg] = useState(false);
  const { isSaved, toggleSave } = useSavedApps();
  const saved = isSaved(app.id);

  const effectiveChannel = latestVersion?.releaseChannel || app.releaseChannel || 'stable';
  const effectiveArch = latestVersion?.architecture || app.architecture || 'universal';
  const effectiveMinAndroid = latestVersion?.minAndroidVersion || app.minAndroid || '8.0+';
  const effectiveSize = latestVersion?.apkSizeDisplay || latestVersion?.apkSizeBytes || app.apkSize;
  const channelBadge = getChannelBadge(effectiveChannel);

  const handleDownloadSuccess = (newCount?: number) => {
    if (typeof newCount === 'number') {
      setDownloadCount(newCount);
    } else {
      setDownloadCount((prev) => prev + 1);
    }
  };

  const handleCopyPackage = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(app.packageName || app.id);
      setCopiedPkg(true);
      setTimeout(() => setCopiedPkg(false), 2000);
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
          setCopiedShare(true);
          setTimeout(() => setCopiedShare(false), 2000);
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
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-border-glass shrink-0 bg-deep-navy-solid flex items-center justify-center relative group">
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
            {/* Title & Badges Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2.5">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-outfit font-bold text-white tracking-tight">{app.name}</h1>
              
              {/* Category Badge */}
              <span className="px-2.5 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                {app.category}
              </span>

              {/* Prominent Release Channel Badge */}
              <span className={`px-2.5 py-1 rounded-full border text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1 shadow-sm ${channelBadge.className}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span>{channelBadge.label}</span>
              </span>

              {/* Architecture Chip */}
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary text-[11px] sm:text-xs font-mono flex items-center gap-1">
                <Cpu className="w-3 h-3 text-text-muted" />
                <span>{formatArchitecture(effectiveArch)}</span>
              </span>
            </div>

            {/* Subrow: Package Name & Security Badge */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6 text-xs sm:text-sm text-text-secondary">
              <button
                type="button"
                onClick={handleCopyPackage}
                title="Click to copy package ID"
                className="font-mono bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-text-muted hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{app.packageName || app.id}</span>
                {copiedPkg ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                )}
              </button>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VirusTotal Clean & Signed</span>
              </span>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 mb-8 p-3.5 sm:p-4 md:p-0 rounded-2xl bg-white/[0.02] sm:bg-white/[0.01] md:bg-transparent border border-white/5 md:border-0">
              {/* Rating */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Rating</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-star-rating fill-star-rating" />
                  <span className="text-white font-bold text-lg sm:text-xl">{app.rating}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden md:block" />

              {/* Downloads */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Downloads</span>
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-electric-blue" />
                  <span className="text-white font-bold text-lg sm:text-xl">{downloadCount.toLocaleString()}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden md:block" />

              {/* Size */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Size</span>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-cyber-purple" />
                  <span className="text-white font-bold text-lg sm:text-xl">{formatApkSize(effectiveSize)}</span>
                </div>
              </div>

              <div className="w-px h-10 bg-border-glass hidden md:block" />

              {/* Version */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Version</span>
                <span className="text-white font-bold text-lg sm:text-xl font-mono">
                  {app.latestVersion.startsWith('v') || app.latestVersion.startsWith('V') ? app.latestVersion : `v${app.latestVersion}`}
                </span>
              </div>

              <div className="w-px h-10 bg-border-glass hidden md:block" />

              {/* Channel */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Channel</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border mt-0.5 ${channelBadge.className}`}>
                  {channelBadge.label}
                </span>
              </div>

              <div className="w-px h-10 bg-border-glass hidden md:block" />

              {/* Min Android */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-text-muted text-[11px] sm:text-xs uppercase tracking-wider mb-1 font-semibold">Requires</span>
                <div className="flex items-center gap-1 text-white font-bold text-sm sm:text-base mt-0.5">
                  <Smartphone className="w-4 h-4 text-text-muted" />
                  <span>Android {effectiveMinAndroid}</span>
                </div>
              </div>
            </div>
            
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <DownloadButton 
                appId={app.id} 
                downloadUrl={latestVersion?.apkUrl || app.apkUrl} 
                onDownloadComplete={handleDownloadSuccess}
              />

              <button
                type="button"
                onClick={() => toggleSave(app.id)}
                aria-label={saved ? 'Remove from saved' : 'Save to library'}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md cursor-pointer ${
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
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl sm:rounded-2xl border border-border-glass bg-card-bg/90 text-text-secondary hover:text-white hover:border-electric-blue/40 text-sm font-semibold transition-all duration-300 active:scale-95 shadow-md cursor-pointer"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
