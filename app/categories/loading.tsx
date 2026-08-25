import { Shimmer } from '@/components/Skeletons';

export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Shimmer className="h-6 w-36 rounded-full mx-auto" />
        <Shimmer className="h-12 w-80 rounded-2xl mx-auto" />
        <Shimmer className="h-5 w-full rounded-md" />
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-8 flex items-center justify-between border border-border-glass"
          >
            <div className="flex items-center gap-5">
              <Shimmer className="w-14 h-14 rounded-2xl shrink-0" />
              <div className="space-y-2">
                <Shimmer className="h-6 w-32 rounded-md" />
                <Shimmer className="h-4 w-20 rounded" />
              </div>
            </div>
            <Shimmer className="w-10 h-10 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
