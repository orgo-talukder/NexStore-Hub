'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Grid, 
  Layers, 
  Info, 
  Sparkles, 
  Bookmark, 
  UploadCloud, 
  DownloadCloud,
  ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSavedApps } from '@/lib/savedStore';
import { SmartSearchDropdown } from '@/components/SmartSearchDropdown';

export function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { savedCount } = useSavedApps();
  const [pwaPrompt, setPwaPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Listen for beforeinstallprompt event for PWA install capability
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPwaPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const mql = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsInstalled(true);
    };
    mql.addEventListener('change', handleMediaChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      mql.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (pwaPrompt) {
      pwaPrompt.prompt();
      const choiceResult = await pwaPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setPwaPrompt(null);
    } else {
      alert('To install NexStore on your phone, tap the browser menu (⋮ or Share) and select "Add to Home Screen" / "Install App".');
    }
  };

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Apps', path: '/apps', icon: Grid },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'My Library', path: '/saved', icon: Bookmark, badge: savedCount },
    { name: 'Submit App', path: '/submit', icon: UploadCloud },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-cosmic-obsidian/90 backdrop-blur-xl border-b border-border-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="block group">
                <Image 
                  src="https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png" 
                  alt="NexStore Logo" 
                  width={150} 
                  height={48} 
                  priority
                  className="h-7 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative text-sm font-medium transition-colors hover:text-white py-2 flex items-center gap-1.5 ${
                      isActive ? 'text-white font-semibold' : 'text-text-secondary'
                    }`}
                  >
                    <span>{link.name}</span>
                    {typeof link.badge === 'number' && link.badge > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-cyber-purple text-white rounded-full leading-tight">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute -bottom-4 lg:-bottom-6 left-0 right-0 h-1 bg-electric-blue shadow-[0_-2px_10px_rgba(59,130,246,0.8)] rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Smart Search Autocomplete */}
            <div className="hidden md:flex items-center">
              <SmartSearchDropdown />
            </div>

            {/* Mobile Actions (Search + Menu on Right) */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                type="button"
                aria-label="Toggle search"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 rounded-xl bg-card-bg border border-border-glass text-text-secondary hover:text-white focus:outline-none"
              >
                {isMobileSearchOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Search className="h-5 w-5 text-electric-blue" />
                )}
              </button>

              <button
                type="button"
                aria-label="Open navigation sidebar"
                onClick={() => setIsSidebarOpen(true)}
                className="relative p-2 rounded-xl bg-card-bg border border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40 transition-colors focus:outline-none"
              >
                <Menu className="h-5 w-5 text-white" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-purple rounded-full ring-2 ring-cosmic-obsidian" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Expandable Autocomplete Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 pb-4 pt-1 bg-cosmic-obsidian/98 border-b border-border-glass">
            <SmartSearchDropdown isMobile onSelect={() => setIsMobileSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* Mobile Slide-Out Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Sidebar Content Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-4/5 max-w-xs bg-cosmic-obsidian border-r border-border-glass h-full flex flex-col z-10 shadow-2xl p-5 overflow-y-auto"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-5 border-b border-border-glass">
                <Link href="/" onClick={() => setIsSidebarOpen(false)} className="block">
                  <Image 
                    src="https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png" 
                    alt="NexStore Logo" 
                    width={130} 
                    height={40} 
                    className="h-8 w-auto object-contain" 
                  />
                </Link>
                <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl bg-card-bg border border-border-glass text-text-secondary hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Search Bar */}
              <div className="mt-5 mb-5">
                <SmartSearchDropdown isMobile onSelect={() => setIsSidebarOpen(false)} />
              </div>

              {/* Main Navigation Links */}
              <div className="space-y-1.5 flex-1">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-3 mb-2 font-inter">
                  Navigation
                </p>
                {navLinks.map((link) => {
                  const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-electric-blue/15 text-white border border-electric-blue/30 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                          : 'text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-electric-blue' : 'text-text-muted'}`} />
                        <span>{link.name}</span>
                      </div>
                      {typeof link.badge === 'number' && link.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-cyber-purple text-white rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Quick Discovery */}
                <div className="pt-5 mt-5 border-t border-border-glass space-y-2">
                  <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider px-3 mb-2 font-inter">
                    Quick Discovery
                  </p>
                  <Link
                    href="/apps?sort=popular"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-text-secondary hover:text-white hover:bg-white/5"
                  >
                    <span>Top Downloads</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                  <Link
                    href="/apps?sort=newest"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-text-secondary hover:text-white hover:bg-white/5"
                  >
                    <span>Latest Updates</span>
                    <span className="text-[10px] bg-cyber-purple/20 text-cyber-purple px-1.5 py-0.5 rounded font-mono">NEW</span>
                  </Link>
                </div>

                {/* PWA Install Button */}
                {!isInstalled && (
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleInstallPWA}
                      className="w-full p-3 rounded-2xl bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 border border-electric-blue/40 text-white flex items-center justify-center gap-2 text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md"
                    >
                      <DownloadCloud className="w-4 h-4 text-electric-blue" />
                      <span>Install NexStore Web App</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="pt-4 mt-auto border-t border-border-glass text-center">
                <p className="text-xs text-text-muted font-inter">
                  NexStore Ecosystem &copy; {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
