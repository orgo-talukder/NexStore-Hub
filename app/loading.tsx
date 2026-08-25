import { HeroSliderSkeleton, CategoryPillsSkeleton, AppGridSkeleton } from '@/components/Skeletons';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 animate-pulse">
      {/* Hero Carousel Skeleton */}
      <HeroSliderSkeleton />

      {/* Category Pills Skeleton */}
      <CategoryPillsSkeleton />

      {/* Grid Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/5 rounded-lg" />
        <AppGridSkeleton count={6} />
      </div>
    </div>
  );
}
