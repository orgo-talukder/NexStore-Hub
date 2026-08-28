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
  Layers,
  Sparkles
} from 'lucide-react';
import { DownloadButton } from '@/components/DownloadButton';
import { useSavedApps } from '@/lib/savedStore';
import { formatApkSize, formatVersion, type AppItem, type VersionItem } from '@/lib/supabase';

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
        className: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        dotClass: 'bg-amber-400',
      };
    case 'alpha':
      return {
        label: 'ALPHA',
        className: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30',
        dotClass: 'bg-fuchsia-400',
      };
    case 'nightly':
      return {
        label: 'NIGHTLY',
        className: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        dotClass: 'bg-cyan-400',
      };
    case 'stable':
    default:
      return {
        label: 'STABLE',
        className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        dotClass: 'bg-emerald-400',
      };
  }
}

function formatMinAndroidDisplay(minAndroid?: string): { version: string; full: string } {
  if (!minAndroid) return { version: '8.0+', full: 'Android 8.0+' };
  const cleaned = minAndroid.replace(/^android\s+/i, '').trim();
  return {
    version: cleaned || '8.0+',
    full: `Android ${cleaned || '8.0+'}`,
  };
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
  const effectiveMinAndroid = latestVersion?.minAndroidVersion || app.minAndroid || 'Android 8.0+';
  const effectiveSize = latestVersion?.apkSizeDisplay || latestVersion?.apkSizeBytes || app.apkSize;
  const channelBadge = getChannelBadge(effectiveChannel);
  const androidDisplay = formatMinAndroidDisplay(effectiveMinAndroid);

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

  const cleanVersion = formatVersion(app.latestVersion);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-10 overflow-hidden bg-gradient-to-b from-[#0e172e]/90 via-[#0a1022]/90 to-[#060913]/95 border border-white/[0.08] shadow-2xl backdrop-blur-xl">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-electric-blue/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyber-purple/15 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        {/* Top Section: App Header on Mobile & Tablet */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start">
          
          {/* App Header Row (Icon + Title Side-by-Side on Mobile) */}
          <div className="flex items-center md:items-start gap-4 sm:gap-5 w-full md:w-auto">
            {/* App Squircle Icon */}
            <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl sm:rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/[0.12] shrink-0 bg-deep-navy-solid flex items-center justify-center relative p-0.5">
              {!imgError && app.iconUrl ? (
                <img 
                  src={app.iconUrl} 
                  alt={app.name} 
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-[inherit]" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-electric-blue/15 text-electric-blue font-bold text-2xl sm:text-3xl md:text-4xl font-outfit rounded-[inherit]">
                  {app.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Title & Micro Meta on Mobile */}
            <div className="flex-1 min-w-0 md:hidden">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="px-2 py-0.5 rounded-md bg-electric-blue/15 border border-electric-blue/30 text-electric-blue text-[10px] font-bold uppercase tracking-wider">
                  {app.category}
                </span>
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1 ${channelBadge.className}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${channelBadge.dotClass} animate-pulse`} />
                  <span>{channelBadge.label}</span>
                </span>
              </div>

              <h1 className="text-xl xs:text-2xl font-outfit font-bold text-white tracking-tight leading-tight truncate">
                {app.name}
              </h1>

              <p className="text-xs text-text-muted mt-0.5 font-mono truncate">
                {app.packageName || app.id}
              </p>
            </div>
          </div>

          {/* Desktop/Tablet Title & Chips Area */}
          <div className="flex-1 min-w-0 w-full">
            {/* Desktop Headline & Badges */}
            <div className="hidden md:flex flex-wrap items-center gap-3 mb-2.5">
              <h1 className="text-3xl lg:text-4xl font-outfit font-bold text-white tracking-tight">
                {app.name}
              </h1>
              
              <span className="px-3 py-1 rounded-full bg-electric-blue/15 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
                {app.category}
              </span>

              <span className={`px-3 py-1 rounded-full border text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${channelBadge.className}`}>
                <span className={`w-2 h-2 rounded-full ${channelBadge.dotClass} animate-pulse`} />
                <span>{channelBadge.label}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary text-xs font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-text-muted" />
                <span>{formatArchitecture(effectiveArch)}</span>
              </span>
            </div>

            {/* Desktop / Tablet Sub-bar: Package ID & Security */}
            <div className="hidden md:flex flex-wrap items-center gap-3 mb-6 text-xs text-text-secondary">
              <button
                type="button"
                onClick={handleCopyPackage}
                title="Click to copy package ID"
                className="font-mono bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl text-text-muted hover:text-white transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>{app.packageName || app.id}</span>
                {copiedPkg ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                )}
              </button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VirusTotal Clean & Verified</span>
              </span>
            </div>

            {/* Mobile / Tablet Chips Bar (Clean wrapped badges, zero overflow) */}
            <div className="flex md:hidden flex-wrap items-center gap-1.5 xs:gap-2 mb-3.5">
              <button
                type="button"
                onClick={handleCopyPackage}
                className="max-w-[170px] xs:max-w-[210px] font-mono text-[11px] bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-text-muted flex items-center gap-1 active:scale-95 transition-all"
              >
                <span className="truncate">{app.packageName || app.id}</span>
                {copiedPkg ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 opacity-60 shrink-0" />}
              </button>

              <span className="text-[11px] font-mono bg-white/5 border border-white/10 text-text-secondary px-2 py-1 rounded-lg flex items-center gap-1">
                <Cpu className="w-3 h-3 text-text-muted shrink-0" />
                <span>{formatArchitecture(effectiveArch)}</span>
              </span>

              <span className="text-[11px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Safe</span>
              </span>

              <span className="text-[11px] text-text-muted bg-white/5 border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-text-muted shrink-0" />
                <span>{androidDisplay.full}</span>
              </span>
            </div>

            {/* App Store Style 4-Column Stat Box (Zero Overflow Guarantee) */}
            <div className="bg-[#070b16]/80 border border-white/[0.08] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 mb-4 sm:mb-6 w-full">
              <div className="grid grid-cols-4 divide-x divide-white/[0.08] text-center">
                
                {/* 1. Rating */}
                <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-white font-bold text-sm sm:text-base md:text-lg">
                    <span>{app.rating}</span>
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-star-rating fill-star-rating shrink-0" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Rating</span>
                </div>

                {/* 2. Downloads */}
                <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-0.5 sm:gap-1 text-white font-bold text-sm sm:text-base md:text-lg font-outfit">
                    <span>{downloadCount > 999 ? `${(downloadCount / 1000).toFixed(1)}k` : downloadCount}</span>
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-electric-blue shrink-0" />
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Downloads</span>
                </div>

                {/* 3. Size */}
                <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
                  <div className="text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg font-outfit truncate max-w-full">
                    {formatApkSize(effectiveSize)}
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Size</span>
                </div>

                {/* 4. Version */}
                <div className="px-1 sm:px-2 flex flex-col items-center justify-center">
                  <div className="text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg font-mono truncate max-w-full" title={cleanVersion}>
                    {cleanVersion}
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Version</span>
                </div>

              </div>
            </div>

            {/* Action Bar: Download Button + Save + Share */}
            <div className="flex items-center gap-2.5 sm:gap-3 w-full">
              <div className="flex-1 min-w-0">
                <DownloadButton 
                  appId={app.id} 
                  downloadUrl={latestVersion?.apkUrl || app.apkUrl} 
                  onDownloadComplete={handleDownloadSuccess}
                />
              </div>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={() => toggleSave(app.id)}
                aria-label={saved ? 'Remove from saved' : 'Save to library'}
                className={`p-3.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl border text-sm font-semibold transition-all duration-200 active:scale-90 shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer ${
                  saved
                    ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple'
                    : 'bg-[#0d152a] border-white/[0.1] text-text-secondary hover:text-white hover:border-electric-blue/40'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share app"
                className="p-3.5 sm:px-4 sm:py-3.5 rounded-xl sm:rounded-2xl border border-white/[0.1] bg-[#0d152a] text-text-secondary hover:text-white hover:border-electric-blue/40 text-sm font-semibold transition-all duration-200 active:scale-90 shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedShare ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                <span className="hidden sm:inline">{copiedShare ? 'Copied' : 'Share'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

