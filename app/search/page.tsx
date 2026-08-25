import { getAllApps, getCategories } from '@/lib/supabase';
import { AppCard } from '@/components/AppCard';
import { EmptyState } from '@/components/Skeletons';
import { Search, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim() : undefined;

  const [results, categories] = await Promise.all([
    q ? getAllApps({ search: q }) : Promise.resolve([]),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 border-b border-border-glass pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-2">
              {q ? `Search Results for "${q}"` : 'Global Ecosystem Search'}
            </h1>
            <p className="text-text-secondary text-sm">
              {q 
                ? `Found ${results.length} published application${results.length === 1 ? '' : 's'} matching your query in Supabase`
                : 'Search across titles, package identifiers, keywords, descriptions, and categories'}
            </p>
          </div>

          {q && results.length > 0 && (
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-semibold self-start sm:self-auto">
              {results.length} Matches Found
            </div>
          )}
        </div>
      </div>

      {/* When no query is entered yet */}
      {!q && (
        <div className="space-y-12">
          <div className="glass-panel rounded-3xl p-12 text-center max-w-2xl mx-auto border border-border-glass">
            <div className="w-20 h-20 rounded-3xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue mx-auto mb-6">
              <Search className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-outfit font-bold text-white mb-3">Explore the Application Store</h2>
            <p className="text-text-secondary mb-8">
              Use the search bar above to look up applications by name, package ID, or functionality.
            </p>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-blue to-cyber-purple text-white font-bold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Browse All Applications</span>
            </Link>
          </div>

          {categories.length > 0 && (
            <div>
              <h3 className="text-xl font-outfit font-bold text-white mb-4 text-center">Popular Categories</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/apps?category=${encodeURIComponent(cat.id)}`}
                    className="glass-panel border-border-glass text-text-secondary hover:text-white hover:border-electric-blue px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                  >
                    <span>{cat.icon || '📱'}</span> {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* When results are found */}
      {q && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}

      {/* When query has 0 matches */}
      {q && results.length === 0 && (
        <EmptyState
          title="No Matching Applications"
          description={`We couldn't find any published applications matching "${q}". Try checking for spelling or searching for another keyword.`}
          icon="🔍"
          actionLink="/categories"
          actionText="Browse Categories"
        />
      )}
    </div>
  );
}
