import { getAllApps, getCategories } from '@/lib/supabase';
import { AppCard } from '@/components/AppCard';
import { AppFilterBar } from '@/components/AppFilterBar';
import { EmptyState } from '@/components/Skeletons';

export const dynamic = 'force-dynamic';

export default async function AppsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const sort = typeof params.sort === 'string' ? params.sort : 'popular';
  const query = typeof params.q === 'string' ? params.q : undefined;

  const [categories, apps] = await Promise.all([
    getCategories(),
    getAllApps({ category, sort, search: query }),
  ]);

  const activeCategoryObj = categories.find(
    (c) => c.id.toLowerCase() === (category || '').toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border-glass pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-2">
            {activeCategoryObj ? `${activeCategoryObj.icon || ''} ${activeCategoryObj.name}` : 'Browse Applications'}
          </h1>
          <p className="text-text-secondary text-sm">
            {query 
              ? `Search results for "${query}"`
              : activeCategoryObj 
                ? `Official and verified apps in the ${activeCategoryObj.name} category` 
                : 'Explore all verified applications directly from our repository'}
          </p>
        </div>
        
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-sm font-semibold self-start md:self-auto">
          {apps.length} {apps.length === 1 ? 'App' : 'Apps'} Available
        </div>
      </div>

      {/* Filter and Search Bar */}
      <AppFilterBar
        categories={categories}
        currentCategory={category}
        currentSort={sort}
        currentSearch={query}
      />

      {/* Apps Grid */}
      {apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Applications"
          description={
            query || category 
              ? "We couldn't find any published apps matching your search filters."
              : "There are currently no published applications in this repository."
          }
          icon={query ? "🔍" : "📦"}
          actionLink="/apps"
          actionText="Reset All Filters"
        />
      )}
    </div>
  );
}
