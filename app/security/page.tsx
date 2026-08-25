import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Server, 
  Key, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Globe, 
  Mail, 
  ChevronRight,
  Sparkles,
  Layers,
  Search
} from 'lucide-react';

export const metadata = {
  title: 'Data Security & Trust | NexStore - Official Nex App Marketplace',
  description: 'Learn how NexStore protects user privacy, secures application releases, and enforces robust database access controls.',
};

export default function SecurityPage() {
  const currentDate = 'August 25, 2026';
  const currentYear = new Date().getFullYear();

  const securityPillars = [
    {
      icon: Lock,
      title: 'Transport Encryption',
      desc: 'All communications between your device and NexStore servers are strictly encrypted using TLS 1.3 and HTTPS protocols.',
      color: 'text-electric-blue',
      bg: 'bg-electric-blue/15 border-electric-blue/30',
    },
    {
      icon: Database,
      title: 'Supabase Row-Level Security',
      desc: 'Our backend infrastructure implements granular Row-Level Security (RLS) policies, restricting data access solely to authorized services.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/30',
    },
    {
      icon: FileCheck,
      title: 'Cryptographic Integrity',
      desc: 'Application binaries and releases are vetted through automated CI/CD builds with SHA-256 cryptographic verification.',
      color: 'text-cyber-purple',
      bg: 'bg-cyber-purple/15 border-cyber-purple/30',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Malware Guarantee',
      desc: 'Every listed application is an official release within the Nex ecosystem, guaranteeing no third-party adware or spyware injections.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/30',
    },
  ];

  const verificationProtocols = [
    'Automated dependency auditing against known CVE vulnerabilities.',
    'Multi-tier admin authorization with zero-trust principle.',
    'Strict Content Security Policy (CSP) & CORS controls.',
    'Sanitized user inputs and parameterized SQL queries to eliminate injection risks.',
    'Real-time health monitoring and anomaly telemetry.',
    'Regular security patch cycles across hosting and edge nodes.',
  ];

  const vulnerabilitySteps = [
    'Email our security team with a detailed description of the potential vulnerability.',
    'Provide reproducible proof-of-concept (PoC) steps or technical logs.',
    'Allow reasonable time for our engineering team to investigate and remediate prior to public disclosure.',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Security &amp; Infrastructure
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          DATA SECURITY &amp; TRUST
        </h1>

        <p className="text-text-muted text-sm font-mono">
          Last Updated: <span className="text-emerald-400 font-semibold">{currentDate}</span>
        </p>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass text-left space-y-3 mt-6">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            Security and privacy are fundamental pillars of the Nex ecosystem. NexStore employs defense-in-depth engineering practices to ensure all application distributions, metadata, and user interactions remain safe and resilient.
          </p>
        </div>
      </section>

      {/* Security Architecture Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {securityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.bg} ${pillar.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-outfit font-bold text-white">
                {pillar.title}
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* Verification & Protection Standards */}
      <section id="infrastructure" className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            INFRASTRUCTURE &amp; DEFENSE PROTOCOLS
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          Our continuous integration and delivery architecture enforces rigorous checks on every code release:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {verificationProtocols.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Binary Distribution & GitHub Verification */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
            <FileCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            OFFICIAL APPLICATION INTEGRITY
          </h2>
        </div>
        <div className="space-y-3 text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
          <p>
            When downloading an APK, executable, or package from NexStore, binaries are sourced exclusively from official GitHub Releases authored by our verified repository maintainers.
          </p>
          <p>
            We advise all users to ensure their downloads match the official NexStore URLs and to refrain from installing mirrors from unverified sources.
          </p>
        </div>
      </section>

      {/* Responsible Vulnerability Disclosure */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/30 space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            RESPONSIBLE DISCLOSURE PROGRAM
          </h2>
        </div>
        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
          We welcome security researchers and community members to responsibly report any security concerns. If you discover a potential vulnerability, please follow our disclosure guidelines:
        </p>
        <ul className="space-y-2 pt-1">
          {vulnerabilitySteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
              <span className="w-5 h-5 rounded-full bg-deep-navy-solid border border-border-glass flex items-center justify-center text-amber-400 shrink-0 font-mono text-xs mt-0.5">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <div className="p-4 rounded-xl bg-deep-navy-solid border border-border-glass mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs sm:text-sm text-text-secondary">Direct Security Inquiries:</span>
          <span className="text-amber-400 font-mono font-medium text-sm">security@nexstore.app</span>
        </div>
      </section>

      {/* Footer Copyright */}
      <section className="text-center pt-6 border-t border-border-glass text-xs text-text-muted font-inter space-y-1">
        <p>&copy; {currentYear} NexStore. All rights reserved.</p>
        <p className="text-text-secondary font-medium">NexStore is part of the Nex ecosystem.</p>
      </section>

    </div>
  );
}
