import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Eye, 
  FileText, 
  Server, 
  Globe, 
  Mail, 
  Cookie, 
  Download, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Trash2,
  Search,
  Sparkles
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | NexStore - Official Nex App Marketplace',
  description: 'Learn how NexStore collects, uses, stores, and protects information when you use our official marketplace website and services.',
};

export default function PrivacyPolicyPage() {
  const currentDate = 'August 25, 2026';
  const currentYear = new Date().getFullYear();

  const aboutFeatures = [
    'Discover official applications',
    'Search and browse applications',
    'View application information',
    'View screenshots and release information',
    'Access available application downloads',
    'Receive information about application updates',
  ];

  const userProvidedInfo = [
    'Name',
    'Email address',
    'Messages or support requests',
    'Other information you choose to provide',
  ];

  const autoCollectedInfo = [
    'IP address',
    'Browser type',
    'Device type',
    'Operating system',
    'Approximate location derived from IP address',
    'Pages visited',
    'Referring pages',
    'Date and time of access',
    'Basic website interaction information',
    'Error and diagnostic information',
  ];

  const searchBrowsingPurposes = [
    'Improve search functionality',
    'Understand which applications are being viewed',
    'Improve website navigation',
    'Improve application discovery',
    'Analyze website performance',
  ];

  const cookiePurposes = [
    'Maintain necessary website functionality',
    'Remember preferences',
    'Improve user experience',
    'Understand website usage',
    'Detect abnormal or potentially harmful activity',
  ];

  const supabaseServices = [
    'Database storage',
    'Authentication',
    'User account management',
    'Application data management',
    'Backend services',
  ];

  const thirdPartyServices = [
    { name: 'Supabase', desc: 'backend, database, and authentication services where applicable' },
    { name: 'GitHub', desc: 'hosting or distribution of application release files where applicable' },
    { name: 'Image hosting services', desc: 'hosting application icons and screenshots where applicable' },
    { name: 'Analytics services', desc: 'understanding website usage and performance where applicable' },
    { name: 'Hosting and infrastructure providers', desc: 'delivering and securing the website' },
  ];

  const howWeUseInfo = [
    'Operate NexStore',
    'Provide requested features',
    'Maintain application listings',
    'Improve search and discovery',
    'Improve website performance',
    'Monitor website reliability',
    'Detect and prevent abuse',
    'Protect the security of our services',
    'Troubleshoot technical problems',
    'Respond to support requests',
    'Understand general usage trends',
    'Develop and improve Nex products and services',
    'Comply with applicable legal obligations',
  ];

  const securityMeasures = [
    'Authentication controls',
    'Database access controls',
    'Security rules and permissions',
    'Secure connections',
    'Restricted administrative access',
    'Monitoring and logging where appropriate',
  ];

  const retentionFactors = [
    'The type of information',
    'The purpose for which it was collected',
    'Security requirements',
    'Legal requirements',
    'Operational requirements',
  ];

  const dataSharingProviders = [
    'Hosting',
    'Database infrastructure',
    'Authentication',
    'Analytics',
    'Security',
    'Image hosting',
    'Application distribution',
    'Technical support',
  ];

  const privacyRights = [
    'Requesting access to certain personal information',
    'Requesting correction of inaccurate information',
    'Requesting deletion of certain information',
    'Requesting restriction of certain processing',
    'Objecting to certain processing',
    'Requesting a copy of certain information',
  ];

  const accountDataPoints = [
    'Email address',
    'User identifier',
    'Account creation information',
    'Authentication-related information',
    'Preferences associated with the account',
  ];

  const summaryPoints = [
    'NexStore may collect limited technical and usage information.',
    'We use information to operate, secure, and improve NexStore.',
    'Supabase may be used for backend, database, and authentication functionality.',
    'Application downloads may use third-party services such as GitHub.',
    'We do not sell your personal information.',
    'We take reasonable measures to protect information.',
    'You can contact us regarding privacy questions or applicable data rights.',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-electric-blue" />
          Official Documentation
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          PRIVACY POLICY
        </h1>

        <p className="text-text-muted text-sm font-mono">
          Last Updated: <span className="text-electric-blue font-semibold">{currentDate}</span>
        </p>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass text-left space-y-3 mt-6">
          <p className="text-base sm:text-lg text-white font-medium">
            Welcome to NexStore.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            NexStore is an official application marketplace for the Nex ecosystem. We respect your privacy and are committed to being transparent about how information is collected, used, stored, and protected when you use our website and services.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            By accessing or using NexStore, you agree to the practices described in this Privacy Policy.
          </p>
        </div>
      </section>

      {/* 1. ABOUT NEXSTORE */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            1. ABOUT NEXSTORE
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore is a software distribution and discovery platform created for applications that are part of the Nex ecosystem.
        </p>
        <p className="text-xs uppercase font-semibold text-text-muted tracking-wider pt-1">
          NexStore is designed to allow users to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {aboutFeatures.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. INFORMATION WE COLLECT */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-border-glass pb-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            2. INFORMATION WE COLLECT
          </h2>
        </div>

        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          The information we collect depends on how you use NexStore. We may collect the following categories of information:
        </p>

        {/* 2.1 INFORMATION YOU PROVIDE */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <h3 className="text-lg font-outfit font-bold text-white">
            2.1 INFORMATION YOU PROVIDE
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            If you voluntarily contact us or provide information through a feature of NexStore, we may receive information such as:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {userProvidedInfo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-text-muted font-inter pt-2">
            We only use information provided by you for the purpose for which it was submitted or for legitimate operational purposes.
          </p>
        </div>

        {/* 2.2 AUTOMATICALLY COLLECTED INFORMATION */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <h3 className="text-lg font-outfit font-bold text-white">
            2.2 AUTOMATICALLY COLLECTED INFORMATION
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            When you access NexStore, certain technical information may be collected automatically, depending on the services and analytics features enabled on the website. This may include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {autoCollectedInfo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
                <ChevronRight className="w-3.5 h-3.5 text-electric-blue shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-text-muted font-inter pt-2">
            We use this information primarily to maintain, secure, analyze, and improve NexStore.
          </p>
        </div>
      </section>

      {/* 3. SEARCH AND BROWSING INFORMATION */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Search className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            3. SEARCH AND BROWSING INFORMATION
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore may process information related to searches, navigation, and interactions with application pages. This information may be used to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {searchBrowsingPurposes.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-white font-medium font-inter pt-2">
          We do not sell users&apos; personal information simply because they browse or search NexStore.
        </p>
      </section>

      {/* 4. COOKIES AND SIMILAR TECHNOLOGIES */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cookie className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            4. COOKIES AND SIMILAR TECHNOLOGIES
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore may use cookies, local storage, session storage, or similar technologies where necessary for website functionality, preferences, security, analytics, or performance. These technologies may be used to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {cookiePurposes.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <Cookie className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-text-muted font-inter pt-2">
          You may be able to control cookies through your browser settings. Disabling certain cookies may affect some website functionality.
        </p>
      </section>

      {/* 5. SUPABASE */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            5. SUPABASE
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore uses Supabase as part of its backend infrastructure.
        </p>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          Depending on the features enabled on NexStore, Supabase may be used for services such as:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {supabaseServices.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 text-xs sm:text-sm text-text-secondary space-y-2">
          <p>
            Information processed through Supabase is handled according to the functionality implemented by NexStore and the applicable Supabase services.
          </p>
          <p className="text-text-muted">
            We configure our application and database access controls to limit unauthorized access to information.
          </p>
        </div>
      </section>

      {/* 6. THIRD-PARTY SERVICES */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            6. THIRD-PARTY SERVICES
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          NexStore may use third-party services to provide or support certain website functionality. These services may include:
        </p>
        <div className="space-y-2.5">
          {thirdPartyServices.map((service, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm">
              <span className="text-white font-semibold">{service.name}</span>
              <span className="text-text-secondary"> — {service.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted font-inter pt-2">
          Third-party services may process information according to their own privacy policies and terms.
        </p>
      </section>

      {/* 7. APPLICATION DOWNLOADS */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Download className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            7. APPLICATION DOWNLOADS
          </h2>
        </div>
        <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          <p>
            NexStore may provide download links for applications.
          </p>
          <p>
            Application files may be hosted on third-party infrastructure, such as GitHub Releases.
          </p>
          <p>
            When you select a download link, you may be redirected to a third-party service.
          </p>
          <p>
            The third-party service may collect technical information according to its own policies.
          </p>
          <p className="text-text-muted text-xs sm:text-sm pt-1">
            NexStore does not control the privacy practices of third-party websites or services.
          </p>
        </div>
      </section>

      {/* 8. HOW WE USE INFORMATION */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            8. HOW WE USE INFORMATION
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          We may use collected information to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {howWeUseInfo.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-electric-blue shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. HOW WE PROTECT INFORMATION */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            9. HOW WE PROTECT INFORMATION
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          We take reasonable technical and organizational measures to protect information against unauthorized access, alteration, disclosure, or destruction. Security measures may include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {securityMeasures.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted font-inter pt-2">
          However, no internet service can guarantee absolute security.
        </p>
      </section>

      {/* 10. DATA RETENTION & 11. DATA SHARING */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 10. DATA RETENTION */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
            10. DATA RETENTION
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            We retain information only for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by applicable law.
          </p>
          <p className="text-xs uppercase font-semibold text-text-muted tracking-wider">
            Retention periods may vary depending on:
          </p>
          <ul className="space-y-1.5">
            {retentionFactors.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <ChevronRight className="w-3.5 h-3.5 text-cyber-purple shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 11. DATA SHARING */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
              11. DATA SHARING
            </h2>
            <p className="text-white font-medium text-sm">
              We do not sell your personal information.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed font-inter">
              We may share or allow access to information with service providers when necessary to operate NexStore. This may include providers responsible for:
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-text-secondary">
              {dataSharingProviders.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-deep-navy-solid border border-border-glass">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-text-muted font-inter pt-2">
            We may also disclose information when required to comply with applicable law, legal process, or valid governmental requests.
          </p>
        </div>
      </section>

      {/* 12. CHILDREN'S PRIVACY & 13. THIRD-PARTY LINKS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <h2 className="text-lg font-outfit font-bold text-white">
            12. CHILDREN&apos;S PRIVACY
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            NexStore is not designed to knowingly collect unnecessary personal information from children.
          </p>
          <p className="text-xs text-text-muted font-inter">
            If you believe that a child has provided personal information to us without appropriate authorization, please contact us so that we can review and take appropriate action where necessary.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <h2 className="text-lg font-outfit font-bold text-white">
            13. THIRD-PARTY LINKS
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            NexStore may contain links to third-party websites and services. Examples may include application download pages, GitHub, documentation, support pages, or other external services.
          </p>
          <p className="text-xs text-text-muted font-inter">
            We are not responsible for the privacy practices, content, or security of third-party websites. We recommend reviewing the privacy policy of any third-party service you visit.
          </p>
        </div>
      </section>

      {/* 14. YOUR PRIVACY RIGHTS */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            14. YOUR PRIVACY RIGHTS
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          Depending on your location and applicable law, you may have rights regarding your personal information. These rights may include:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {privacyRights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-text-muted font-inter pt-2">
          To make a privacy-related request, contact us using the information provided below.
        </p>
      </section>

      {/* 15. ACCOUNT DATA & 16. DATA DELETION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 15. ACCOUNT DATA */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
          <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
            15. ACCOUNT DATA
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            If NexStore provides account or authentication functionality, information associated with an account may include information such as:
          </p>
          <ul className="space-y-1.5">
            {accountDataPoints.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                <ChevronRight className="w-3.5 h-3.5 text-electric-blue shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-text-muted font-inter pt-1">
            Authentication and account-related data may be processed through Supabase when Supabase Authentication is used. You may request information about your account or request deletion where applicable.
          </p>
        </div>

        {/* 16. DATA DELETION */}
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              <h2 className="text-lg sm:text-xl font-outfit font-bold text-white tracking-tight">
                16. DATA DELETION
              </h2>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed font-inter">
              If NexStore provides user accounts, users may request deletion of their account and associated personal information, subject to legitimate legal, security, or operational retention requirements.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-deep-navy-solid border border-border-glass space-y-1.5">
            <span className="text-xs text-text-muted block">To request deletion, contact:</span>
            <span className="text-rose-400 font-mono font-medium text-sm">support@nexstore.app</span>
          </div>
        </div>
      </section>

      {/* 17. INTERNATIONAL DATA PROCESSING & 18. CHANGES */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-outfit font-bold text-white">
              17. INTERNATIONAL DATA PROCESSING
            </h2>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            NexStore and its service providers may process information using infrastructure located in countries other than your country of residence.
          </p>
          <p className="text-xs text-text-muted font-inter">
            Where applicable, we take reasonable steps to ensure that information is handled in accordance with applicable privacy requirements.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyber-purple" />
            <h2 className="text-lg font-outfit font-bold text-white">
              18. CHANGES TO THIS PRIVACY POLICY
            </h2>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            We may update this Privacy Policy from time to time. When changes are made, we will update the &quot;Last Updated&quot; date at the beginning of this policy.
          </p>
          <p className="text-xs text-text-muted font-inter">
            For significant changes, we may provide additional notice where appropriate.
          </p>
        </div>
      </section>

      {/* 19. CONTACT US */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-electric-blue/30 space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            19. CONTACT US
          </h2>
        </div>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
          If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your information, please contact us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-inter">
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">NexStore Support Email:</span>
            <span className="text-electric-blue font-mono font-medium">support@nexstore.app</span>
          </div>
          <div className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass">
            <span className="text-xs text-text-muted block mb-1">Official Website:</span>
            <span className="text-white font-medium">Official NexStore Portal</span>
          </div>
        </div>
      </section>

      {/* 20. SUMMARY */}
      <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-electric-blue/40 bg-gradient-to-r from-deep-navy-solid via-card-bg to-deep-navy-solid space-y-4">
        <div className="flex items-center gap-3 border-b border-border-glass/60 pb-3">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/20 border border-electric-blue/40 flex items-center justify-center text-electric-blue">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white tracking-tight">
            20. SUMMARY
          </h2>
        </div>
        <p className="text-white font-medium text-sm sm:text-base">
          In simple terms:
        </p>
        <div className="space-y-2 pt-1">
          {summaryPoints.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
              <div className="w-1.5 h-1.5 rounded-full bg-electric-blue shrink-0 mt-1.5" />
              <span>{item}</span>
            </div>
          ))}
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
