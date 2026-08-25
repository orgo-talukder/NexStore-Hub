import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  Copyright, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Mail, 
  Globe, 
  ExternalLink,
  ChevronRight,
  Scale,
  Building,
  Layers,
  Lock
} from 'lucide-react';

export const metadata = {
  title: 'Copyright & Intellectual Property | NexStore - Official Nex App Marketplace',
  description: 'Learn about copyright ownership, brand usage, intellectual property guidelines, and infringement reporting on NexStore.',
};

export default function CopyrightPage() {
  const currentDate = 'August 25, 2026';
  const currentYear = new Date().getFullYear();

  const originalContentItems = [
    'NexStore name and branding',
    'NexStore logo and visual identity',
    'Website design and interface',
    'Original text and documentation',
    'Graphics and illustrations',
    'App icons and screenshots where owned or licensed by us',
    'Original promotional materials',
    'Website source code and related materials',
    'Other original digital content',
  ];

  const brandRestrictions = [
    'You are officially affiliated with NexStore when you are not',
    'Your website or application is endorsed by NexStore when it is not',
    'Your product is an official NexStore product when it is not',
  ];

  const permittedUses = [
    'Browse publicly available NexStore pages',
    'View application information',
    'Download applications made available through the platform',
    'Share links to publicly available NexStore pages',
  ];

  const prohibitedUses = [
    'Copy substantial portions of NexStore website content',
    'Republish NexStore content as your own',
    'Sell or commercially redistribute proprietary NexStore materials',
    'Remove copyright or attribution notices',
    'Modify and redistribute protected NexStore materials',
    'Use NexStore branding to create a misleadingly similar service',
    'Reverse engineer or redistribute proprietary website materials beyond rights granted by applicable law',
  ];

  const reportChecklist = [
    'Your full name',
    'Contact information',
    'Identification of the copyrighted work',
    'Identification of the material you believe infringes your rights',
    'The relevant NexStore page or URL',
    'An explanation of your claim',
    'A statement confirming that the information provided is accurate',
  ];

  const possibleActions = [
    'Reviewing the reported content',
    'Temporarily restricting access',
    'Removing the reported material',
    'Contacting the relevant rights holder',
    'Requesting additional information',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <Copyright className="w-4 h-4 text-electric-blue" />
          Legal & Intellectual Property
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          COPYRIGHT
        </h1>

        <p className="text-text-muted text-sm font-mono">
          Last Updated: <span className="text-electric-blue font-semibold">{currentDate}</span>
        </p>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass text-left space-y-3 mt-6">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            NexStore and the content available through the NexStore website are protected by applicable copyright and intellectual property laws.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            NexStore is the official application marketplace for the Nex ecosystem. Unless otherwise stated, the website design, branding, logos, graphics, original text, application descriptions, interface elements, and other original materials presented on NexStore are owned by or licensed to NexStore and/or the respective rights holders.
          </p>
        </div>
      </section>

      {/* 1. COPYRIGHT OWNERSHIP */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            1. COPYRIGHT OWNERSHIP
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          All original content created for NexStore may include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {originalContentItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-white font-medium font-inter pt-2">
          Such materials may not be copied, reproduced, modified, distributed, republished, or used commercially without appropriate authorization.
        </p>
      </section>

      {/* 2. NEXSTORE BRAND */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
            <Building className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            2. NEXSTORE BRAND
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          &quot;NexStore&quot;, its logo, visual identity, and associated branding are intended to identify the official NexStore platform.
        </p>
        <p className="text-xs uppercase font-semibold text-text-muted tracking-wider pt-1">
          You may not use NexStore branding in a way that suggests:
        </p>
        <div className="space-y-2.5 pt-1">
          {brandRestrictions.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. APPLICATIONS AND THEIR CONTENT & 4. THIRD-PARTY CONTENT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3. APPLICATIONS AND THEIR CONTENT */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <Layers className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              3. APPLICATIONS &amp; CONTENT
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            <p>
              Applications distributed through NexStore may contain content, software, trademarks, logos, graphics, and other intellectual property belonging to their respective owners.
            </p>
            <p>
              The availability of an application through NexStore does not transfer ownership of that application&apos;s intellectual property to the user.
            </p>
            <p className="text-text-muted">
              Users receive only the rights granted under the applicable license or terms associated with the relevant application.
            </p>
          </div>
        </div>

        {/* 4. THIRD-PARTY CONTENT */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
              <Globe className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
                4. THIRD-PARTY CONTENT
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
              Some links, services, images, software, or other materials accessible through NexStore may be provided by third parties.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
              Third-party content remains the property of its respective owners and may be subject to separate copyright, trademark, license, and usage terms.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs text-text-muted">
            Independent license policies apply to external materials.
          </div>
        </div>
      </section>

      {/* 5. PERMITTED USE & 6. PROHIBITED USE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5. PERMITTED USE */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              5. PERMITTED USE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            You may access and use NexStore for lawful personal or organizational purposes. You may:
          </p>
          <ul className="space-y-2">
            {permittedUses.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-muted font-inter pt-2 border-t border-border-glass/40">
            You may not reproduce or redistribute NexStore&apos;s original website content for commercial purposes without permission.
          </p>
        </div>

        {/* 6. PROHIBITED USE */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border-glass/60 pb-2.5">
            <XCircle className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white">
              6. PROHIBITED USE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
            Unless permitted by applicable law or authorized by the relevant rights holder, you may not:
          </p>
          <ul className="space-y-2">
            {prohibitedUses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary">
                <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. COPYRIGHT INFRINGEMENT REPORTS */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            7. COPYRIGHT INFRINGEMENT REPORTS
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          If you believe that content available through NexStore infringes your copyright, you may contact us with sufficient information to allow us to review the matter.
        </p>
        <p className="text-xs uppercase font-semibold text-text-muted tracking-wider pt-1">
          A copyright report should include, where applicable:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {reportChecklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-deep-navy-solid border border-border-glass mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs sm:text-sm text-text-secondary">Please send copyright-related requests to:</span>
          <span className="text-electric-blue font-mono font-medium text-sm">copyright@nexstore.app</span>
        </div>
      </section>

      {/* 8. REMOVAL AND REVIEW & 9. COPYRIGHT OWNERS' RIGHTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 8. REMOVAL AND REVIEW */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
            8. REMOVAL AND REVIEW
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-inter">
            When we receive a valid copyright complaint, we may review the reported material and take appropriate action where necessary. Possible actions may include:
          </p>
          <ul className="space-y-1.5">
            {possibleActions.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <ChevronRight className="w-3.5 h-3.5 text-cyber-purple shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-muted font-inter pt-2 border-t border-border-glass/40">
            We do not guarantee that every report will result in removal, particularly where the claim is incomplete, disputed, or where applicable law provides an exception or defense.
          </p>
        </div>

        {/* 9. COPYRIGHT OWNERS' RIGHTS */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
                9. COPYRIGHT OWNERS&apos; RIGHTS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
              Nothing in this page is intended to limit any rights available to copyright owners under applicable law.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-inter">
              Copyright owners remain responsible for protecting their intellectual property and submitting accurate claims concerning alleged infringement.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs text-text-muted font-inter">
            Protection and enforcement governed by applicable statutory frameworks.
          </div>
        </div>
      </section>

      {/* 10. CHANGES TO THIS COPYRIGHT POLICY */}
      <section className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
        <h2 className="text-lg font-outfit font-bold text-white">
          10. CHANGES TO THIS COPYRIGHT POLICY
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed font-inter">
          We may update this Copyright Policy when necessary. When changes are made, the &quot;Last Updated&quot; date at the beginning of this page will be updated.
        </p>
      </section>

      {/* 11. CONTACT */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-electric-blue/30 space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            11. CONTACT
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          For copyright, intellectual property, or content-related questions, contact:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-inter">
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">Copyright Email:</span>
            <span className="text-electric-blue font-mono font-medium">copyright@nexstore.app</span>
          </div>
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">Official Website:</span>
            <span className="text-white font-medium">Official NexStore Portal</span>
          </div>
        </div>
        <div className="pt-2 text-xs sm:text-sm text-text-muted font-inter">
          <strong className="text-white">NexStore</strong> &bull; Official app marketplace for the Nex ecosystem.
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
