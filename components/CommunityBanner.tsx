import Link from 'next/link';
import { Search, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export function CommunityBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-glass bg-gradient-to-r from-deep-navy-solid via-card-bg to-card-hover p-8 sm:p-10 shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyber-purple/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover More Content</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-white tracking-tight">
            Can&apos;t find what you are looking for?
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            Search our comprehensive application directory or filter by custom categories to find verified APK builds for your device.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/search"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            <Search className="w-4 h-4 text-electric-blue" />
            <span>Search Library</span>
          </Link>
          <Link
            href="/apps"
            className="flex items-center gap-2 bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-blue-500 hover:to-purple-500 text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
          >
            <span>Browse All Apps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
