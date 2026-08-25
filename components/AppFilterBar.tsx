'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import type { CategoryItem } from '@/lib/supabase';
import { useState, useTransition } from 'react';

export function AppFilterBar({
  categories,
  currentCategory = '',
  currentSort = 'popular',
  currentSearch = '',
}: {
  categories: CategoryItem[];
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);

  const updateFilters = (newCategory?: string, newSort?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    const cat = newCategory !== undefined ? newCategory : (params.get('category') || '');
    const s = newSort !== undefined ? newSort : (params.get('sort') || 'popular');
    const q = newSearch !== undefined ? newSearch : (params.get('q') || '');

    if (cat) params.set('category', cat);
    else params.delete('category');

    if (s && s !== 'popular') params.set('sort', s);
    else if (s === 'popular') params.delete('sort');

    if (q) params.set('q', q);
    else params.delete('q');

    startTransition(() => {
      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(undefined, undefined, search);
  };

  const clearSearch = () => {
    setSearch('');
    updateFilters(undefined, undefined, '');
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-8 border border-border-glass">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name, package, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search query"
              className="absolute right-3 top-3 p-0.5 rounded-full text-text-muted hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Filters Group */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Dynamic Categories Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[160px]">
            <select
              value={currentCategory}
              onChange={(e) => updateFilters(e.target.value, undefined, undefined)}
              aria-label="Filter by category"
              className="w-full appearance-none bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl pl-9 pr-8 py-3 focus:outline-none focus:border-electric-blue cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon ? `${cat.icon} ` : ''}{cat.name}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-3.5 h-4 w-4 text-text-muted pointer-events-none" />
            <div className="absolute right-3 top-4 pointer-events-none text-text-muted text-xs">▼</div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[160px]">
            <select
              value={currentSort}
              onChange={(e) => updateFilters(undefined, e.target.value, undefined)}
              aria-label="Sort applications"
              className="w-full appearance-none bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl pl-9 pr-8 py-3 focus:outline-none focus:border-electric-blue cursor-pointer"
            >
              <option value="popular">Most Popular (Downloads)</option>
              <option value="newest">Newest Releases</option>
              <option value="rating">Highest Rated</option>
              <option value="az">Alphabetical (A - Z)</option>
              <option value="za">Alphabetical (Z - A)</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-3.5 h-4 w-4 text-text-muted pointer-events-none" />
            <div className="absolute right-3 top-4 pointer-events-none text-text-muted text-xs">▼</div>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="mt-3 flex items-center gap-2 text-xs text-electric-blue font-medium animate-pulse">
          <span>Filtering applications from Supabase...</span>
        </div>
      )}
    </div>
  );
}
