'use client';

import Link from 'next/link';
import type { CategoryItem } from '@/lib/supabase';

export function CategoryPills({ categories, activeCategory }: { categories: CategoryItem[], activeCategory?: string }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full relative mb-6 sm:mb-8">
      {/* Scrollable Container with native smooth scrolling */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar no-scrollbar flex items-center gap-2 sm:gap-3 touch-pan-x scroll-smooth">
        <Link
          href="/apps"
          className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 font-medium text-xs sm:text-sm shrink-0 active:scale-95 ${
            !activeCategory 
              ? 'bg-electric-blue/15 border-electric-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] font-semibold' 
              : 'glass-panel border-border-glass text-text-secondary hover:text-white hover:border-white/20'
          }`}
        >
          <span>🚀</span>
          <span>All Apps</span>
        </Link>
        
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/apps?category=${encodeURIComponent(cat.id)}`}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 font-medium text-xs sm:text-sm shrink-0 active:scale-95 ${
              activeCategory?.toLowerCase() === cat.id.toLowerCase()
                ? 'bg-electric-blue/15 border-electric-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] font-semibold' 
                : 'glass-panel border-border-glass text-text-secondary hover:text-white hover:border-white/20'
            }`}
          >
            <span>{cat.icon || '📁'}</span>
            <span>{cat.name}</span>
            {cat.appCount !== undefined && (
              <span className="text-[11px] bg-white/10 px-1.5 py-0.5 rounded-full text-text-muted">
                {cat.appCount}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

