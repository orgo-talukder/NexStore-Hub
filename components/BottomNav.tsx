'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Layers, Bookmark, Search, UploadCloud } from 'lucide-react';
import { useSavedApps } from '@/lib/savedStore';

export function BottomNav() {
  const pathname = usePathname();
  const { savedCount } = useSavedApps();

  // Hide bottom nav on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const items = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      exact: true,
    },
    {
      name: 'Apps',
      path: '/apps',
      icon: Grid,
      exact: false,
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: Layers,
      exact: false,
    },
    {
      name: 'Library',
      path: '/saved',
      icon: Bookmark,
      badge: savedCount,
      exact: false,
    },
    {
      name: 'Submit',
      path: '/submit',
      icon: UploadCloud,
      exact: false,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060911]/92 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.5)] transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const isActive = item.exact
            ? pathname === item.path
            : pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-90 ${
                isActive ? 'text-electric-blue' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active ambient glow pill */}
              {isActive && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-electric-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 min-w-[16px] text-[9px] font-bold bg-cyber-purple text-white rounded-full flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? 'font-bold text-white' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
