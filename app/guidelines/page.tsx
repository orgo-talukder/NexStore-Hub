import Link from 'next/link';
import { 
  Compass, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Check, 
  X, 
  Cpu, 
  Smartphone, 
  Box, 
  RefreshCw, 
  FileText, 
  ArrowRight 
} from 'lucide-react';

export const metadata = {
  title: 'Ecosystem Guidelines | NexStore - Official Nex App Marketplace',
  description: 'Review the technical, security, design, and release quality standards required for applications across the Nex ecosystem.',
};

export default function GuidelinesPage() {
  const currentYear = new Date().getFullYear();

  const corePrinciples = [
    {
      title: 'Design Consistency',
      desc: 'Applications should adopt clean typography, responsive layouts, intuitive navigation, and support both dark and light modes where appropriate.',
      icon: Sparkles,
      color: 'text-electric-blue',
      bg: 'bg-electric-blue/15 border-electric-blue/30',
    },
    {
      title: 'Security & Privacy First',
      desc: 'Apps must minimize data collection, encrypt sensitive credentials, and never bundle unverified third-party ad SDKs or tracking pixels.',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/30',
    },
    {
      title: 'Performance & Optimization',
      desc: 'Fast boot times, lightweight binary bundles, smooth 60fps animations, and efficient battery and memory usage.',
      icon: Cpu,
      color: 'text-cyber-purple',
      bg: 'bg-cyber-purple/15 border-cyber-purple/30',
    },
    {
      title: 'Reliable Release Cadence',
      desc: 'Detailed release changelogs, semver semantic versioning (vX.Y.Z), and verified GitHub release artifacts.',
      icon: RefreshCw,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/30',
    },
  ];

  const appChecklist = [
    'Clear application name, concise headline, and comprehensive feature breakdown.',
    'At least 3 high-resolution screenshots highlighting core interfaces.',
    'Documented minimum OS requirements (Android, Windows, macOS, Linux, Web).',
    'Semantic version number accompanied by meaningful release notes.',
    'Verified binary asset (APK, ZIP, DMG, EXE) with checksum hash where applicable.',
  ];

  const prohibitedContent = [
    'Malware, spyware, or keyloggers.',
    'Deceptive monetization tricks or hidden fees.',
    'Unregulated data harvesting or telemetry without disclosure.',
    'Pirated or copyright-infringing digital assets.',
    'Misleading claims about affiliation with unrelated external brands.',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-cyber-purple" />
          Standards &amp; Quality
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          ECOSYSTEM GUIDELINES
        </h1>

        <p className="text-text-muted text-sm font-inter max-w-2xl mx-auto">
          Our standards ensure that every application in the Nex ecosystem delivers a secure, delightful, and cohesive experience for all users.
        </p>
      </section>

      {/* Core Principles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {corePrinciples.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.bg} ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-outfit font-bold text-white">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
                {item.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* Quality Checklist */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            APPLICATION LISTING REQUIREMENTS
          </h2>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed font-inter">
          Before an application is published on NexStore, the product team verifies the following criteria:
        </p>
        <div className="space-y-2.5 pt-1">
          {appChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Prohibited Elements */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <X className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            PROHIBITED PRACTICES
          </h2>
        </div>
        <div className="space-y-2 pt-1">
          {prohibitedContent.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-electric-blue/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-outfit font-bold text-white">
            Explore Verified Applications
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Discover apps built following these ecosystem standards.
          </p>
        </div>
        <Link 
          href="/apps" 
          className="px-5 py-2.5 rounded-xl bg-electric-blue text-white font-medium text-sm hover:bg-sky-400 transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Browse Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Footer Copyright */}
      <section className="text-center pt-6 border-t border-border-glass text-xs text-text-muted font-inter space-y-1">
        <p>&copy; {currentYear} NexStore. All rights reserved.</p>
        <p className="text-text-secondary font-medium">NexStore is part of the Nex ecosystem.</p>
      </section>

    </div>
  );
}
