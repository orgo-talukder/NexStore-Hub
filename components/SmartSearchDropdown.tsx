'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Star, Download, ArrowRight, X, Sparkles, Smartphone } from 'lucide-react';
import { getAllPublishedApps, type AppItem } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function SmartSearchDropdown({
  onSelect,
  isMobile = false,
}: {
  onSelect?: () => void;
  isMobile?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [apps, setApps] = useState<AppItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllPublishedApps();
        setApps(data);
      } catch {
        // quiet error
      }
    }
    loadData();
  }, []);

  // Filter apps
  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed.length > 0
    ? apps.filter((app) => 
        app.name.toLowerCase().includes(trimmed) ||
        app.category.toLowerCase().includes(trimmed) ||
        app.packageName.toLowerCase().includes(trimmed) ||
        (app.shortDescription && app.shortDescription.toLowerCase().includes(trimmed))
      ).slice(0, 5)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filtered[selectedIndex]) {
        router.push(`/app/${filtered[selectedIndex].slug || filtered[selectedIndex].id}`);
        setIsOpen(false);
        if (onSelect) onSelect();
      } else if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
        setIsOpen(false);
        if (onSelect) onSelect();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setIsOpen(false);
      if (onSelect) onSelect();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${isMobile ? 'w-full' : 'w-56 lg:w-72'}`}>
      <form onSubmit={handleFormSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search apps, games, tools..."
          value={query}
          onFocus={() => {
            if (trimmed.length > 0) setIsOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full bg-deep-navy-solid/90 border border-border-glass text-white text-xs sm:text-sm rounded-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all ${
            isMobile ? 'shadow-inner' : ''
          }`}
        />
        <Search className="absolute left-3 sm:left-3.5 top-2.5 sm:top-3 h-4 w-4 text-text-muted" />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-3 top-2.5 sm:top-3 text-text-muted hover:text-white p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown List */}
      {isOpen && trimmed.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 rounded-2xl bg-[#091024]/98 backdrop-blur-2xl border border-electric-blue/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-fadeIn">
          {filtered.length > 0 ? (
            <div className="p-2 divide-y divide-white/5">
              <div className="px-3 py-1.5 flex items-center justify-between text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                <span>Suggestions ({filtered.length})</span>
                <span className="text-[10px] text-electric-blue font-mono">Press ↵ Enter</span>
              </div>

              {filtered.map((app, idx) => (
                <Link
                  key={app.id}
                  href={`/app/${app.slug || app.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    if (onSelect) onSelect();
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    idx === selectedIndex
                      ? 'bg-electric-blue/20 text-white'
                      : 'hover:bg-white/5 text-text-secondary hover:text-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-deep-navy-solid border border-white/10 shrink-0 flex items-center justify-center">
                    {app.iconUrl ? (
                      <img src={app.iconUrl} alt={app.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-electric-blue">
                        {app.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-outfit font-bold text-white truncate">
                        {app.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold ml-2">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <span>{app.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-muted">
                      <span className="capitalize">{app.category}</span>
                      <span>•</span>
                      <span>{app.apkSize || 'APK'}</span>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="pt-2 px-2 pb-1">
                <Link
                  href={`/search?q=${encodeURIComponent(trimmed)}`}
                  onClick={() => {
                    setIsOpen(false);
                    if (onSelect) onSelect();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-xs text-electric-blue font-semibold transition-colors"
                >
                  <span>See all results for &quot;{trimmed}&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center space-y-1">
              <p className="text-xs text-text-secondary font-medium">
                No instant match for &quot;{trimmed}&quot;
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(trimmed)}`}
                onClick={() => {
                  setIsOpen(false);
                  if (onSelect) onSelect();
                }}
                className="inline-block text-[11px] text-electric-blue hover:underline pt-1"
              >
                Search all catalog entries &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
