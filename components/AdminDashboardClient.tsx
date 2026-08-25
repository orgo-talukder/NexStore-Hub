'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  Grid, 
  DownloadCloud, 
  Star, 
  Plus, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Search,
  RefreshCw
} from 'lucide-react';
import type { AppItem, BannerItem, CategoryItem } from '@/lib/supabase';

export function AdminDashboardClient({
  initialApps,
  initialBanners,
  initialCategories,
}: {
  initialApps: AppItem[];
  initialBanners: BannerItem[];
  initialCategories: CategoryItem[];
}) {
  const [apps] = useState<AppItem[]>(initialApps);
  const [banners] = useState<BannerItem[]>(initialBanners);
  const [categories] = useState<CategoryItem[]>(initialCategories);
  const [activeTab, setActiveTab] = useState<'apps' | 'banners' | 'categories'>('apps');
  const [searchQuery, setSearchQuery] = useState('');

  const totalDownloads = apps.reduce((acc, app) => acc + (app.downloads || 0), 0);
  const filteredApps = apps.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-glass">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-electric-blue/15 border border-electric-blue/30 text-electric-blue">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
              NexStore Admin Console
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Real-time catalog metrics, repository state, and application lifecycle controls.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-xs sm:text-sm font-bold shadow-lg shadow-electric-blue/20 hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-border-glass space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Live Apps</span>
            <Grid className="w-4 h-4 text-electric-blue" />
          </div>
          <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
            {apps.length}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Verified Binaries
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-border-glass space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Downloads</span>
            <DownloadCloud className="w-4 h-4 text-cyber-purple" />
          </div>
          <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
            {totalDownloads.toLocaleString()}
          </div>
          <p className="text-[11px] text-electric-blue font-medium">
            Across global CDN nodes
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-border-glass space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Categories</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
            {categories.length}
          </div>
          <p className="text-[11px] text-text-muted font-medium">
            Curated app verticals
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-border-glass space-y-1">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wider">Featured Banners</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-outfit font-extrabold text-white">
            {banners.length}
          </div>
          <p className="text-[11px] text-text-muted font-medium">
            Active carousel spotlights
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border-glass pb-3 mb-6 overflow-x-auto hide-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('apps')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'apps'
              ? 'bg-electric-blue text-white shadow-md shadow-electric-blue/20'
              : 'bg-white/5 text-text-secondary hover:text-white'
          }`}
        >
          Applications ({apps.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'banners'
              ? 'bg-electric-blue text-white shadow-md shadow-electric-blue/20'
              : 'bg-white/5 text-text-secondary hover:text-white'
          }`}
        >
          Home Banners ({banners.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
            activeTab === 'categories'
              ? 'bg-electric-blue text-white shadow-md shadow-electric-blue/20'
              : 'bg-white/5 text-text-secondary hover:text-white'
          }`}
        >
          Categories ({categories.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'apps' ? (
        /* Apps Table */
        <div className="glass-panel rounded-2xl sm:rounded-3xl border border-border-glass overflow-hidden space-y-4">
          <div className="p-4 sm:p-6 border-b border-border-glass flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search apps by name, category, package ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-electric-blue"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-text-muted" />
            </div>
            <span className="text-xs text-text-muted self-end sm:self-center font-mono">
              Showing {filteredApps.length} of {apps.length} apps
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/[0.02] border-b border-border-glass text-text-muted uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">App</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Version</th>
                  <th className="py-3 px-4">Downloads</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-deep-navy-solid border border-white/10 shrink-0 flex items-center justify-center">
                          {app.iconUrl ? (
                            <img src={app.iconUrl} alt={app.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-electric-blue">{app.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white font-outfit truncate max-w-[180px] sm:max-w-[240px]">
                            {app.name}
                          </div>
                          <div className="text-[11px] text-text-muted font-mono truncate max-w-[180px] sm:max-w-[240px]">
                            {app.packageName}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 capitalize text-text-secondary">
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-[11px] border border-white/10">
                        {app.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-text-secondary">
                      <div className="flex items-center gap-1 font-mono text-xs">
                        <span>v{app.latestVersion}</span>
                        <span className="text-text-muted">• {app.apkSize || 'N/A'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-white">
                      {(app.downloads || 0).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{app.rating || '5.0'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <Link
                        href={`/app/${app.slug || app.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'banners' ? (
        /* Banners Manager */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="glass-panel rounded-2xl overflow-hidden border border-border-glass space-y-4"
            >
              <div className="relative aspect-[21/9] bg-deep-navy-solid overflow-hidden">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy-solid via-transparent to-transparent" />
                {banner.badgeText && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-electric-blue text-white text-[10px] font-bold uppercase tracking-wider">
                    {banner.badgeText}
                  </span>
                )}
              </div>
              <div className="p-5 pt-0 space-y-2">
                <h3 className="font-outfit font-bold text-white text-base">
                  {banner.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {banner.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-text-muted border-t border-white/5">
                  <span className="font-mono">Order #{banner.displayOrder}</span>
                  <Link
                    href={banner.linkUrl || '/'}
                    className="text-electric-blue hover:underline flex items-center gap-1"
                  >
                    <span>Target Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Categories Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl">{cat.icon || '📦'}</div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-electric-blue/15 text-electric-blue font-semibold">
                  {cat.appCount || 0} Apps
                </span>
              </div>
              <div>
                <h3 className="font-outfit font-bold text-white text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  Curated vertical for NexStore marketplace.
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-end">
                <Link
                  href={`/apps?category=${cat.id}`}
                  className="text-xs text-electric-blue font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Explore Apps</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
