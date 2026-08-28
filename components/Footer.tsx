import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Server, RefreshCw, Zap, Bookmark, UploadCloud } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 sm:mt-20 border-t border-border-glass bg-deep-navy-solid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Links - Visible on Desktop/Tablet, streamlined on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1 text-center sm:text-left">
            <Link href="/" className="inline-block group">
              <Image 
                src="https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png" 
                alt="NexStore" 
                width={140}
                height={40}
                className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity mx-auto sm:mx-0" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-inter">
              The official app marketplace for the Nex ecosystem. Discover, explore, and download official applications with zero telemetry.
            </p>
          </div>
          
          {/* Desktop/Tablet Link Columns: Hidden on mobile since they are now in the mobile sidebar drawer */}
          <div className="hidden md:block">
            <h3 className="font-outfit font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Ecosystem</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary font-inter">
              <li><Link href="/" className="hover:text-electric-blue transition-colors">Home Store</Link></li>
              <li><Link href="/apps" className="hover:text-electric-blue transition-colors">Browse All Apps</Link></li>
              <li><Link href="/categories" className="hover:text-electric-blue transition-colors">Categories</Link></li>
              <li><Link href="/saved" className="hover:text-electric-blue transition-colors">My Library (Saved)</Link></li>
              <li><Link href="/submit" className="hover:text-electric-blue transition-colors">Submit an App</Link></li>
              <li><Link href="/guidelines" className="hover:text-electric-blue transition-colors">Developer Guidelines</Link></li>
            </ul>
          </div>

          {/* Quick Discovery */}
          <div className="hidden md:block">
            <h3 className="font-outfit font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Explore &amp; Admin</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary font-inter">
              <li><Link href="/apps?sort=popular" className="hover:text-electric-blue transition-colors">Top Downloads</Link></li>
              <li><Link href="/apps?sort=newest" className="hover:text-electric-blue transition-colors">Latest Releases</Link></li>
              <li><Link href="/about" className="hover:text-electric-blue transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-electric-blue transition-colors">Contact &amp; Support</Link></li>
              <li><Link href="/admin" className="hover:text-electric-blue transition-colors">Admin Console</Link></li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="hidden md:block">
            <h3 className="font-outfit font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Trust &amp; Legal</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary font-inter">
              <li><Link href="/privacy-policy" className="hover:text-electric-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-electric-blue transition-colors">Terms of Service</Link></li>
              <li><Link href="/copyright" className="hover:text-electric-blue transition-colors">Copyright &amp; IP</Link></li>
              <li><Link href="/security" className="hover:text-electric-blue transition-colors">Data Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 sm:py-8 border-t border-border-glass">
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">Official Builds</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <Server className="w-4 h-4 sm:w-5 sm:h-5 text-electric-blue shrink-0" />
            <span className="text-xs font-medium">Direct Downloads</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-purple shrink-0" />
            <span className="text-xs font-medium">Release Notes</span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 text-text-secondary">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            <span className="text-xs font-medium">Fast CDN Speeds</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-border-glass text-center text-xs text-text-muted font-inter space-y-1">
          <p>&copy; {currentYear} NexStore. All rights reserved.</p>
          <p className="text-text-secondary">NexStore is the official application marketplace for the Nex ecosystem.</p>
        </div>
      </div>
    </footer>
  );
}
