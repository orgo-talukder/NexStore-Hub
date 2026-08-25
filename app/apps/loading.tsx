import { AppGridSkeleton, Shimmer } from '@/components/Skeletons';

export default function AppsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="border-b border-border-glass pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <Shimmer className="h-10 w-64 rounded-xl" />
          <Shimmer className="h-5 w-96 rounded-md" />
        </div>
        <Shimmer className="h-9 w-36 rounded-full" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="glass-panel p-4 rounded-2xl border border-border-glass flex flex-wrap gap-4">
        <Shimmer className="h-11 flex-1 min-w-[200px] rounded-xl" />
        <Shimmer className="h-11 w-44 rounded-xl" />
        <Shimmer className="h-11 w-44 rounded-xl" />
      </div>

      {/* Apps Grid */}
      <AppGridSkeleton count={9} />
    </div>
  );
}
