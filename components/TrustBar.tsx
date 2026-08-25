import { ShieldCheck, Zap, History, LockOpen } from 'lucide-react';

export function TrustBar() {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Verified & Safe APKs',
      description: 'Signature-checked & malware scanned',
    },
    {
      icon: <Zap className="w-5 h-5 text-electric-blue" />,
      title: 'Direct High-Speed CDN',
      description: 'Zero wait times or throttle gates',
    },
    {
      icon: <History className="w-5 h-5 text-cyber-purple" />,
      title: 'Version History Archive',
      description: 'Full changelogs & past releases',
    },
    {
      icon: <LockOpen className="w-5 h-5 text-amber-400" />,
      title: 'Instant 1-Click Access',
      description: 'No login or registration required',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {features.map((f, i) => (
        <div
          key={i}
          className="glass-panel rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-border-glass flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-white/20 transition-all duration-300 group shadow-sm hover:shadow-lg"
        >
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-deep-navy-solid border border-border-glass flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            {f.icon}
          </div>
          <div className="min-w-0 w-full">
            <h4 className="text-white font-outfit font-semibold text-xs sm:text-sm truncate group-hover:text-electric-blue transition-colors">
              {f.title}
            </h4>
            <p className="text-text-muted text-[11px] sm:text-xs truncate font-inter mt-0.5">
              {f.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
