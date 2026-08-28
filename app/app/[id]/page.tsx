import { getAppBySlugOrId, getAppVersions, formatVersion } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle, Clock, Smartphone, Package, Tag, Layers, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { AppHeroDetail } from '@/components/AppHeroDetail';
import { AppReviewsSection } from '@/components/AppReviewsSection';
import { AppVersionHistory } from '@/components/AppVersionHistory';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export const revalidate = 30;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const app = await getAppBySlugOrId(id);
  
  if (!app) {
    return { title: 'App Not Found | NexStore' };
  }
  
  return {
    title: `${app.name} - Download APK | NexStore`,
    description: app.shortDescription || app.description,
    openGraph: {
      title: `${app.name} - NexStore Official App`,
      description: app.shortDescription,
      images: app.iconUrl ? [{ url: app.iconUrl }] : [],
    },
  };
}

export default async function AppDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const app = await getAppBySlugOrId(id);
  
  if (!app) {
    notFound();
  }

  // Fetch real version changelog from versions table
  const versions = await getAppVersions(app.id);

  const cleanMinAndroid = app.minAndroid 
    ? (app.minAndroid.toLowerCase().startsWith('android') ? app.minAndroid : `Android ${app.minAndroid}`)
    : 'Android 8.0+';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* App Hero Details with Real Download Action */}
      <AppHeroDetail app={app} latestVersion={versions[0]} />

      {/* Screenshots Section (Only if screenshots are present in Supabase) */}
      {app.screenshots && app.screenshots.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-4 sm:mb-6">Screenshots</h2>
          <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 hide-scrollbar snap-x">
            {app.screenshots.map((src, idx) => (
              <div 
                key={idx} 
                className="w-56 sm:w-64 md:w-80 h-[360px] sm:h-[420px] shrink-0 rounded-2xl overflow-hidden border border-white/[0.1] snap-center bg-deep-navy-solid shadow-lg"
              >
                <img 
                  src={src} 
                  alt={`${app.name} preview ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Description */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 md:p-8 border border-border-glass">
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white mb-3 sm:mb-4">About this application</h2>
            <p className="text-text-secondary leading-relaxed font-inter text-sm sm:text-base whitespace-pre-wrap">
              {app.description || app.shortDescription}
            </p>
          </div>
          
          {/* Key Features (Only if features exist) */}
          {app.features && app.features.length > 0 && (
            <div className="glass-panel rounded-2xl p-5 sm:p-6 md:p-8 border border-border-glass">
              <h2 className="text-lg sm:text-xl font-outfit font-bold text-white mb-3 sm:mb-4">Key Features</h2>
              <ul className="space-y-2.5 sm:space-y-3">
                {app.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-electric-blue shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* What's New in Latest Release */}
          <div className="glass-panel rounded-2xl p-5 sm:p-6 md:p-8 border border-border-glass">
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-electric-blue" />
              <span>What&apos;s New in {formatVersion(app.latestVersion)}</span>
            </h2>
            <div className="p-3.5 sm:p-4 rounded-xl bg-deep-navy-solid border border-border-glass font-inter">
              <MarkdownRenderer 
                content={versions[0]?.changelog || versions[0]?.releaseNotes || (app.description ? `Latest official stable release with core architectural upgrades, performance optimizations, and security patches.` : 'Official release package verified and signed for the NexStore ecosystem.')}
              />
            </div>
          </div>
          
          {/* Version History & Previous APK Downloads */}
          <AppVersionHistory app={app} versions={versions} />
        </div>
        
        {/* Sidebar Info */}
        <div className="space-y-5 sm:space-y-6">
          <div className="bg-success-badge/10 border border-success-badge/30 rounded-2xl p-5 sm:p-6 flex items-start gap-3 sm:gap-4">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-success-badge shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-1 text-sm sm:text-base">Verified Safe & Signed</h3>
              <p className="text-xs sm:text-sm text-success-badge/80">
                This package has been verified by NexStore security analysis with zero bloatware or malware.
              </p>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-border-glass">
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white mb-4">Application Details</h2>
            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Tag className="w-4 h-4" />
                  <span>Version</span>
                </div>
                <span className="text-white font-medium font-mono">{formatVersion(app.latestVersion)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Package className="w-4 h-4" />
                  <span>Package ID</span>
                </div>
                <span className="text-white font-mono text-xs max-w-[150px] sm:max-w-[170px] truncate">{app.packageName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Clock className="w-4 h-4" />
                  <span>Last Updated</span>
                </div>
                <span className="text-white font-medium">
                  {new Date(app.updatedAt || app.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Layers className="w-4 h-4" />
                  <span>Category</span>
                </div>
                <span className="text-white font-medium capitalize">{app.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-text-muted">
                  <Smartphone className="w-4 h-4" />
                  <span>Requires Android</span>
                </div>
                <span className="text-white font-medium">{cleanMinAndroid}</span>
              </div>
            </div>
          </div>
          
          {/* Required Permissions (Only if permissions exist) */}
          {app.permissions && app.permissions.length > 0 && (
            <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-border-glass">
              <h2 className="text-lg sm:text-xl font-outfit font-bold text-white mb-3 sm:mb-4">Required Permissions</h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {app.permissions.map((perm, idx) => (
                  <span 
                    key={idx} 
                    className="bg-deep-navy-solid border border-border-glass text-text-secondary text-xs px-2.5 py-1 rounded-lg font-mono"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Community Ratings & Reviews Section */}
      <AppReviewsSection app={app} />
    </div>
  );
}
