'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Trash2, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Star,
  HardDrive,
  Grid
} from 'lucide-react';
import { useSavedApps } from '@/lib/savedStore';
import { getAllPublishedApps, type AppItem } from '@/lib/supabase';
import { AppCard } from '@/components/AppCard';

export default function SavedAppsPage() {
  const { savedIds, removeSaved, clearAll, isLoaded } = useSavedApps();
  const [allApps, setAllApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function loadApps() {
      try {
        const apps = await getAllPublishedApps();
        setAllApps(apps);
      } catch (err) {
        console.error('Failed to load apps for saved page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadApps();
  }, []);

  const savedApps = allApps.filter((app) => savedIds.includes(app.id));

  // Filter based on local search & category
  const filteredSavedApps = savedApps.filter((app) => {
    const matchesSearch = searchQuery.trim() === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const categories = Array.from(new Set(savedApps.map((a) => a.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Hero / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-glass">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyber-purple/20 border border-cyber-purple/30 text-cyber-purple shadow-lg shadow-cyber-purple/10">
              <Bookmark className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-outfit font-extrabold text-white">
                My Library & Saved Apps
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                Quick access to your bookmarked APK packages and favorite tools.
              </p>
            </div>
          </div>
        </div>

        {savedApps.length > 0 && (
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-text-muted px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono">
              {savedApps.length} {savedApps.length === 1 ? 'App' : 'Apps'} Saved
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to clear all saved apps from your library?')) {
                  clearAll();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Library</span>
            </button>
          </div>
        )}
      </div>

      {/* Content State */}
      {loading || !isLoaded ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white/5 border border-border-glass" />
          ))}
        </div>
      ) : savedApps.length === 0 ? (
        /* Empty State */
        <div className="max-w-md mx-auto py-16 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-electric-blue/20 to-cyber-purple/20 border border-white/10 flex items-center justify-center text-text-muted shadow-2xl">
            <Bookmark className="w-10 h-10 text-electric-blue/60" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
              Your Library is Empty
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              You haven&apos;t bookmarked any apps yet. Click the bookmark icon on any app detail card to save it here for instant direct downloads.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-sm font-bold shadow-lg shadow-electric-blue/30 hover:opacity-95 active:scale-95 transition-all"
            >
              <Grid className="w-4 h-4" />
              <span>Explore Top Apps & Games</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Saved List with Filters */
        <div className="space-y-6">
          {/* Quick Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between glass-panel p-3.5 rounded-2xl border border-border-glass">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter your saved apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-deep-navy-solid border border-border-glass text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-electric-blue"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-text-muted" />
            </div>

            {categories.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-electric-blue text-white'
                      : 'bg-white/5 text-text-secondary hover:text-white'
                  }`}
                >
                  All ({savedApps.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-electric-blue text-white'
                        : 'bg-white/5 text-text-secondary hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apps Grid */}
          {filteredSavedApps.length === 0 ? (
            <div className="py-12 text-center text-text-muted text-sm glass-panel rounded-2xl border border-border-glass">
              No saved apps matched your search &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSavedApps.map((app) => (
                <div key={app.id} className="relative group">
                  <AppCard app={app} />
                  {/* Remove button overlay */}
                  <button
                    type="button"
                    onClick={() => removeSaved(app.id)}
                    title="Remove from saved"
                    aria-label={`Remove ${app.name} from library`}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-[#060911]/90 backdrop-blur-md border border-white/15 text-text-muted hover:text-red-400 hover:border-red-500/40 opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
