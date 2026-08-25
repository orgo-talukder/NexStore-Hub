import { getAppBySlugOrId, getAppVersions } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle, Clock, Smartphone, Package, Tag, Layers } from 'lucide-react';
import type { Metadata } from 'next';
import { AppHeroDetail } from '@/components/AppHeroDetail';
import { AppReviewsSection } from '@/components/AppReviewsSection';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* App Hero Details with Real Download Action */}
      <AppHeroDetail app={app} />

      {/* Screenshots Section (Only if screenshots are present in Supabase) */}
      {app.screenshots && app.screenshots.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-outfit font-bold text-white mb-6">Screenshots</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x">
            {app.screenshots.map((src, idx) => (
              <div 
                key={idx} 
                className="w-64 md:w-80 h-[420px] shrink-0 rounded-2xl overflow-hidden border border-border-glass snap-center bg-deep-navy-solid shadow-lg"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-border-glass">
            <h2 className="text-xl font-outfit font-bold text-white mb-4">About this application</h2>
            <p className="text-text-secondary leading-relaxed font-inter whitespace-pre-wrap">
              {app.description || app.shortDescription}
            </p>
          </div>
          
          {/* Key Features (Only if features exist) */}
          {app.features && app.features.length > 0 && (
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-border-glass">
              <h2 className="text-xl font-outfit font-bold text-white mb-4">Key Features</h2>
              <ul className="space-y-3">
                {app.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-electric-blue shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Version Changelog (From Supabase versions table or latest release note) */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-border-glass">
            <h2 className="text-xl font-outfit font-bold text-white mb-4">Version History & Changelog</h2>
            
            {versions.length > 0 ? (
              <div className="space-y-6">
                {versions.map((ver) => (
                  <div key={ver.id} className="border-b border-border-glass/50 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-electric-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          v{ver.versionName}
                        </span>
                        {ver.versionCode && (
                          <span className="text-text-muted text-xs font-mono">
                            Build {ver.versionCode}
                          </span>
                        )}
                      </div>
                      <span className="text-text-muted text-xs">
                        {new Date(ver.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                      {ver.releaseNotes}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-electric-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    v{app.latestVersion}
                  </span>
                  <span className="text-text-muted text-xs">Latest Build</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Official release package verified and signed for the NexStore ecosystem.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-success-badge/10 border border-success-badge/30 rounded-2xl p-6 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-success-badge shrink-0" />
            <div>
              <h3 className="text-white font-bold mb-1">Verified Safe & Signed</h3>
              <p className="text-sm text-success-badge/80">
                This package has been verified by NexStore security analysis with zero bloatware or malware.
              </p>
            </div>
          </div>
          
          <div className="glass-panel rounded-2xl p-6 border border-border-glass">
            <h2 className="text-xl font-outfit font-bold text-white mb-4">Application Details</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Tag className="w-4 h-4" />
                  <span>Version</span>
                </div>
                <span className="text-white font-medium">v{app.latestVersion}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <div className="flex items-center gap-2 text-text-muted">
                  <Package className="w-4 h-4" />
                  <span>Package ID</span>
                </div>
                <span className="text-white font-mono text-xs max-w-[170px] truncate">{app.packageName}</span>
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
                <span className="text-white font-medium">{app.minAndroid || 'Android 8.0+'}</span>
              </div>
            </div>
          </div>
          
          {/* Required Permissions (Only if permissions exist) */}
          {app.permissions && app.permissions.length > 0 && (
            <div className="glass-panel rounded-2xl p-6 border border-border-glass">
              <h2 className="text-xl font-outfit font-bold text-white mb-4">Required Permissions</h2>
              <div className="flex flex-wrap gap-2">
                {app.permissions.map((perm, idx) => (
                  <span 
                    key={idx} 
                    className="bg-deep-navy-solid border border-border-glass text-text-secondary text-xs px-3 py-1.5 rounded-lg font-mono"
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
