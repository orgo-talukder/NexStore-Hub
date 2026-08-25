'use client';

import React from 'react';

export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-white/5 rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
    />
  );
}

export function HeroSliderSkeleton() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl mb-12 aspect-[21/9] sm:aspect-[21/8] lg:aspect-[24/8] bg-deep-navy-solid border border-border-glass">
      <Shimmer className="w-full h-full" />
    </div>
  );
}

export function CategoryPillsSkeleton() {
  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
      <div className="flex gap-3 min-w-max">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Shimmer key={i} className="h-11 w-32 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function AppCardSkeleton() {
  return (
    <div className="glass-panel rounded-2xl p-4 flex flex-col h-full border border-border-glass">
      <div className="flex items-start gap-4 mb-3">
        <Shimmer className="w-16 h-16 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <Shimmer className="h-5 w-3/4 rounded-md" />
          <Shimmer className="h-4 w-20 rounded-full" />
        </div>
      </div>
      <div className="space-y-2 mb-4 flex-grow">
        <Shimmer className="h-4 w-full rounded" />
        <Shimmer className="h-4 w-4/5 rounded" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border-glass/50 mt-auto">
        <div className="flex items-center gap-3">
          <Shimmer className="h-6 w-14 rounded-md" />
          <Shimmer className="h-4 w-12 rounded" />
        </div>
        <Shimmer className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function AppGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <AppCardSkeleton key={idx} />
      ))}
    </div>
  );
}

export function AppDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="glass-panel rounded-3xl p-6 md:p-10 mb-12 border border-border-glass">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Shimmer className="w-32 h-32 md:w-40 md:h-40 rounded-[30px] shrink-0" />
          <div className="flex-1 space-y-4 w-full">
            <Shimmer className="h-10 w-2/3 rounded-xl" />
            <Shimmer className="h-5 w-48 rounded-md" />
            <div className="flex gap-6 py-2">
              <Shimmer className="h-10 w-20 rounded-lg" />
              <Shimmer className="h-10 w-24 rounded-lg" />
              <Shimmer className="h-10 w-20 rounded-lg" />
            </div>
            <Shimmer className="h-14 w-52 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No applications found",
  description = "There are currently no items available in this section.",
  icon = "📦",
  actionLink,
  actionText,
}: {
  title?: string;
  description?: string;
  icon?: string;
  actionLink?: string;
  actionText?: string;
}) {
  return (
    <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center border border-border-glass max-w-2xl mx-auto my-8">
      <div className="text-6xl mb-4 select-none">{icon}</div>
      <h3 className="text-2xl font-outfit font-bold text-white mb-2">{title}</h3>
      <p className="text-text-secondary mb-6 max-w-md">{description}</p>
      {actionLink && actionText && (
        <a
          href={actionLink}
          className="bg-electric-blue hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-full transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          {actionText}
        </a>
      )}
    </div>
  );
}
