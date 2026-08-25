import { AppGridSkeleton, Shimmer } from '@/components/Skeletons';

export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="border-b border-border-glass pb-6 space-y-3">
        <Shimmer className="h-10 w-72 rounded-xl" />
        <Shimmer className="h-5 w-96 rounded-md" />
      </div>
      <AppGridSkeleton count={6} />
    </div>
  );
}
