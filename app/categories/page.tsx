import Link from 'next/link';
import { getCategoriesWithCounts } from '@/lib/supabase';
import { ArrowRight, Layers } from 'lucide-react';
import { EmptyState } from '@/components/Skeletons';

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Ecosystem</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
          Marketplace Categories
        </h1>
        <p className="text-lg text-text-secondary font-inter">
          Explore specialized collections of verified applications organized for every workflow.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = cat.appCount ?? 0;
            return (
              <Link 
                key={cat.id} 
                href={`/apps?category=${encodeURIComponent(cat.id)}`}
                className="group"
              >
                <div className="glass-panel rounded-2xl p-8 flex items-center justify-between group hover:bg-card-hover hover:border-border-hover transition-all duration-300 border border-border-glass h-full">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-deep-navy-solid border border-border-glass flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      {cat.icon || '📱'}
                    </div>
                    <div>
                      <h2 className="text-xl font-outfit font-bold text-white group-hover:text-electric-blue transition-colors">
                        {cat.name}
                      </h2>
                      <p className="text-sm text-text-muted mt-1 font-medium">
                        {count} {count === 1 ? 'App' : 'Apps'} Available
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-deep-navy-solid border border-border-glass flex items-center justify-center text-text-muted group-hover:bg-electric-blue group-hover:text-white group-hover:border-electric-blue transition-all duration-300 shrink-0">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Categories Available"
          description="Categories configured in your Supabase database will appear here."
          icon="📂"
          actionLink="/apps"
          actionText="Browse All Apps"
        />
      )}
    </div>
  );
}
