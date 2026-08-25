import Link from 'next/link';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Lock, 
  Globe, 
  Mail, 
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | NexStore - Official Nex App Marketplace',
  description: 'Read the official Terms of Service governing the use of NexStore website, applications, and related services.',
};

export default function TermsOfServicePage() {
  const currentDate = 'August 25, 2026';
  const currentYear = new Date().getFullYear();

  const eligibilityRequirements = [
    'You are of legal age in your jurisdiction or have parental/guardian consent.',
    'You will comply with all applicable local, national, and international laws.',
    'You will not use NexStore for any unlawful, deceptive, or unauthorized activities.',
  ];

  const permittedPlatformUses = [
    'Discover and browse official Nex ecosystem applications.',
    'Access release notes, version histories, and application documentation.',
    'Download and install verified binary releases for personal or organizational use.',
    'Submit legitimate feedback, bug reports, and support inquiries.',
  ];

  const prohibitedActivities = [
    'Attempting to bypass security protocols, authentication barriers, or rate limits.',
    'Reverse engineering or redistributing proprietary marketplace assets without authorization.',
    'Deploying automated scrapers, bots, or data harvesting scripts on the platform.',
    'Impersonating NexStore, Nex team members, or misrepresenting official affiliation.',
    'Distributing malicious code, altered binaries, or viruses under the NexStore brand.',
  ];

  const userResponsibilities = [
    'Ensuring your local device meets minimum operating system requirements.',
    'Maintaining the security of your own devices and internet connections.',
    'Verifying downloaded packages against official release hashes when available.',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-electric-blue" />
          Legal Agreement
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          TERMS OF SERVICE
        </h1>

        <p className="text-text-muted text-sm font-mono">
          Last Updated: <span className="text-electric-blue font-semibold">{currentDate}</span>
        </p>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass text-left space-y-3 mt-6">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            Welcome to NexStore. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the NexStore website, applications, APIs, content, and related software distribution services.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            By accessing, browsing, or downloading applications from NexStore, you agree to be bound by these Terms. If you do not agree, please discontinue using the platform immediately.
          </p>
        </div>
      </section>

      {/* 1. ABOUT NEXSTORE & SERVICES */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            1. ABOUT NEXSTORE &amp; PLATFORM SERVICES
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore is the dedicated application marketplace and distribution platform for products developed within the Nex ecosystem. The platform enables users to discover, inspect, and obtain official software releases.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {permittedPlatformUses.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ELIGIBILITY & USER ACCOUNTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <ShieldCheck className="w-5 h-5 text-electric-blue" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              2. ELIGIBILITY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            By using NexStore, you represent and warrant that:
          </p>
          <ul className="space-y-2">
            {eligibilityRequirements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                <ChevronRight className="w-3.5 h-3.5 text-electric-blue shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <Lock className="w-5 h-5 text-cyber-purple" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              3. ACCOUNT SECURITY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            Where user accounts or administrative features are implemented via our Supabase infrastructure, you are responsible for maintaining the confidentiality of your credentials.
          </p>
          <p className="text-xs text-text-muted font-inter">
            You agree to notify us immediately of any unauthorized access or security breach involving your account.
          </p>
        </div>
      </section>

      {/* 4. PROHIBITED CONDUCT */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <XCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            4. PROHIBITED ACTIVITIES
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          To maintain a secure and reliable ecosystem, the following actions are strictly prohibited:
        </p>
        <div className="space-y-2 pt-1">
          {prohibitedActivities.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPLICATION LICENSES & INTELLECTUAL PROPERTY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <FileText className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              5. APPLICATION LICENSES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            All applications available on NexStore are distributed subject to their specific end-user licenses. Downloading an application grants you a non-exclusive license as detailed in the release notes or accompanying license agreement.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <Scale className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              6. INTELLECTUAL PROPERTY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            The NexStore brand, logos, graphics, and interface code are proprietary property of NexStore and the Nex ecosystem. For full copyright provisions, please refer to our{' '}
            <Link href="/copyright" className="text-electric-blue hover:underline">
              Copyright Policy
            </Link>.
          </p>
        </div>
      </section>

      {/* 7. DISCLAIMER OF WARRANTIES & 8. LIMITATION OF LIABILITY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-outfit font-bold text-white">
              7. DISCLAIMER OF WARRANTIES
            </h2>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
            NexStore and all distributed materials are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied, including fitness for a particular purpose.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-outfit font-bold text-white">
              8. LIMITATION OF LIABILITY
            </h2>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
            To the maximum extent permitted by applicable law, NexStore shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the platform.
          </p>
        </div>
      </section>

      {/* 9. TERMINATION & 10. MODIFICATIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <h2 className="text-lg font-outfit font-bold text-white">
            9. TERMINATION
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
            We reserve the right to suspend or terminate your access to the platform at our sole discretion, without prior notice, for conduct that violates these Terms or harms other users or the ecosystem.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <h2 className="text-lg font-outfit font-bold text-white">
            10. MODIFICATIONS TO TERMS
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
            We may update these Terms periodically to reflect evolving platform capabilities or legal requirements. Significant updates will be highlighted on this page.
          </p>
        </div>
      </section>

      {/* 11. CONTACT US */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-electric-blue/30 space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            11. CONTACT INFORMATION
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          If you have any questions or inquiries concerning these Terms of Service, please reach out to our legal and support team:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-inter">
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">Legal Inquiries:</span>
            <span className="text-electric-blue font-mono font-medium">legal@nexstore.app</span>
          </div>
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">General Support:</span>
            <span className="text-white font-medium">support@nexstore.app</span>
          </div>
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
