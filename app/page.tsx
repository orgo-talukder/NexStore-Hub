import Link from 'next/link';
import { getHomePageData } from '@/lib/supabase';
import { HeroSlider } from '@/components/HeroSlider';
import { CategoryPills } from '@/components/CategoryPills';
import { AppCard } from '@/components/AppCard';
import { TrustBar } from '@/components/TrustBar';
import { CommunityBanner } from '@/components/CommunityBanner';
import { MobileAppStoreView } from '@/components/MobileAppStoreView';
import { EmptyState } from '@/components/Skeletons';
import { Flame, Sparkles, Clock, Layers, ArrowRight } from 'lucide-react';

// Always fetch live data on request for real-time updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const {
    banners,
    categories,
    topApps,
    latestApps,
    spotlightApps,
    categoryHighlights,
  } = await getHomePageData();

  const hasAnyData = banners.length > 0 || topApps.length > 0 || latestApps.length > 0 || spotlightApps.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* 📱 MOBILE APP STORE VIEW (Visible on mobile screens, matches reference image) */}
      <div className="block md:hidden">
        <MobileAppStoreView
          banners={banners}
          categories={categories}
          topApps={topApps}
          latestApps={latestApps}
          spotlightApps={spotlightApps}
        />
      </div>

      {/* 🖥️ DESKTOP VIEW (Visible on tablet & desktop screens, preserved exactly) */}
      <div className="hidden md:block space-y-12 sm:space-y-16">
        {/* Hero Banner Carousel (Clean image slider) */}
        {banners.length > 0 ? (
          <HeroSlider banners={banners} />
        ) : null}

        {/* Quick Category Navigation Pills */}
        {categories.length > 0 && (
          <CategoryPills categories={categories} />
        )}

        {/* Trust & Guarantee Highlights Bar */}
        <TrustBar />

        {/* When no applications exist in the Supabase database */}
        {!hasAnyData && (
          <EmptyState
            title="No Published Applications"
            description="Your Supabase database is connected and ready. Publish applications or banners to see them live in the marketplace."
            icon="🚀"
            actionLink="/apps"
            actionText="Browse App Directory"
          />
        )}

        {/* Top Downloads Leaderboard */}
        {topApps.length > 0 && (
          <section id="top-downloads" className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-glass/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white">Top Downloads</h2>
                  <p className="text-sm text-text-muted">Most installed and downloaded applications</p>
                </div>
              </div>
              <Link 
                href="/apps?sort=popular" 
                className="text-sm font-medium text-electric-blue hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topApps.slice(0, 6).map((app, index) => (
                <AppCard key={app.id} app={app} rankBadge={index + 1} />
              ))}
            </div>
          </section>
        )}

        {/* Spotlight Picks (If spotlight apps configured) */}
        {spotlightApps.length > 0 && (
          <section id="spotlight-apps" className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-glass/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-electric-blue/10 border border-electric-blue/30 text-electric-blue shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white">Featured Picks</h2>
                  <p className="text-sm text-text-muted">Selected applications and highlights</p>
                </div>
              </div>
              <Link 
                href="/apps" 
                className="text-sm font-medium text-electric-blue hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>Explore All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlightApps.slice(0, 6).map((app) => (
                <AppCard key={app.id} app={app} featured />
              ))}
            </div>
          </section>
        )}

        {/* Latest Releases Section */}
        {latestApps.length > 0 && (
          <section id="latest-releases" className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-glass/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white">Fresh Drops & Updates</h2>
                  <p className="text-sm text-text-muted">Recently published builds with new features & patches</p>
                </div>
              </div>
              <Link 
                href="/apps?sort=newest" 
                className="text-sm font-medium text-electric-blue hover:text-white transition-colors flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Category Highlights */}
        {categoryHighlights
          .filter((item) => item.apps.length > 0)
          .map(({ category, apps }) => (
            <section key={category.id} className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-glass/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-deep-navy-solid border border-border-glass text-xl flex items-center justify-center">
                    {category.icon || <Layers className="w-6 h-6 text-electric-blue" />}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white">{category.name}</h2>
                    <p className="text-sm text-text-muted">Top rated applications in {category.name}</p>
                  </div>
                </div>
                <Link 
                  href={`/apps?category=${encodeURIComponent(category.id)}`} 
                  className="text-sm font-medium text-electric-blue hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Explore Category</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          ))}

        {/* Community Search & Explore Banner */}
        <CommunityBanner />
      </div>
    </div>
  );
}


