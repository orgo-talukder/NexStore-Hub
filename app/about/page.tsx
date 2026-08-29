import Image from 'next/image';
import Link from 'next/link';
import { ArgoTalukderText } from '@/components/ArgoTalukderText';
import { 
  Compass, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Mail, 
  Globe, 
  Cpu, 
  Box, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

export const metadata = {
  title: 'About Us | NexStore - Official Nex App Marketplace',
  description: 'Everything you need. One official place. Discover the official app marketplace for the Nex ecosystem.',
};

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const ecosystemCategories = [
    'Artificial Intelligence',
    'Education',
    'Productivity',
    'Security',
    'Utilities',
    'Music',
    'Entertainment',
    'Developer Tools',
    'Other digital products',
  ];

  const appDetailsList = [
    'App name',
    'Description',
    'Features',
    'Screenshots',
    'Version information',
    'Release notes',
    'System requirements',
    'Download information',
  ];

  const discoveryFeatures = [
    'Browse all available apps',
    'Explore categories',
    'Search for apps',
    'View detailed app information',
    'Check the latest version',
    'Read release information',
    'Access available downloads',
  ];

  const trustPrinciples = [
    'Clearly identify our official applications',
    'Provide accurate app information',
    'Keep release information organized',
    'Maintain consistent product pages',
    'Avoid unnecessary clutter',
    'Keep the platform simple and easy to use',
  ];

  const expectationList = [
    'Faster',
    'Simpler',
    'More organized',
    'More informative',
    'Easier to navigate',
    'Better integrated with the Nex ecosystem',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-24">
      
      {/* 1. Hero Header Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-widest">
          About NexStore
        </div>

        <div className="relative w-44 sm:w-52 h-14 sm:h-16 mx-auto">
          <Image
            src="https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png"
            alt="NexStore Logo"
            fill
            className="object-contain"
            referrerPolicy="no-referrer"
            priority
          />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-bold text-white tracking-tight leading-tight">
          Everything You Need.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-sky-400 to-cyber-purple">
            One Official Place.
          </span>
        </h1>

        <div className="space-y-4 text-base sm:text-lg text-text-secondary leading-relaxed font-inter">
          <p>
            NexStore is the official app marketplace for the Nex ecosystem.
          </p>
          <p>
            It is designed to provide a simple, reliable, and convenient place to discover, explore, and download our official applications.
          </p>
          <p>
            Instead of searching across different platforms for our apps and their latest releases, NexStore brings the entire Nex app ecosystem together in one place.
          </p>
        </div>
      </section>

      {/* 2. Our Mission */}
      <section id="mission" className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-border-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white tracking-tight">
              Our Mission
            </h2>
          </div>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-inter">
            Our mission is to make software discovery and distribution simpler.
          </p>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-inter">
            As we build more applications and digital products, we want users to have one trusted destination where they can find our official apps, learn about their features, see the latest updates, and access their available releases.
          </p>
        </div>
      </section>

      {/* 3. What is NexStore? & Official Apps */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* What is NexStore? */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
                <Box className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
                What is NexStore?
              </h2>
            </div>
            <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
              <p>
                NexStore is an official software distribution platform created for the Nex ecosystem.
              </p>
              <p>
                Unlike an open developer marketplace, NexStore is a curated platform dedicated to our own applications.
              </p>
              <p>
                Every application available on NexStore is published as part of the Nex ecosystem.
              </p>
              <p>
                This allows us to maintain a consistent experience across our products and provide users with a central place to discover them.
              </p>
            </div>
          </div>
        </div>

        {/* Official Apps */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
                Official Apps
              </h2>
            </div>
            <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
              <p>
                NexStore focuses exclusively on official Nex applications.
              </p>
              <p>
                Our goal is to make it easy for users to identify and discover the applications that belong to our ecosystem.
              </p>
              <p className="text-text-muted text-xs uppercase tracking-wider font-semibold pt-1">
                Each app page can provide important information such as:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {appDetailsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary bg-white/[0.03] border border-white/5 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Ecosystem */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-border-glass space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white tracking-tight">
              Our Ecosystem
            </h2>
          </div>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            NexStore is designed to grow together with the Nex ecosystem.
          </p>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            As new Nex products and applications are released, they can become available through NexStore. The ecosystem may include applications across different categories such as:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ecosystemCategories.map((category, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-2xl bg-deep-navy-solid border border-border-glass hover:border-electric-blue/40 transition-colors group"
            >
              <div className="w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0" />
              <span className="text-sm font-medium text-white group-hover:text-electric-blue transition-colors">
                {category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. App Discovery & App Updates */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* App Discovery */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
              App Discovery
            </h2>
          </div>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            NexStore is designed to make finding our applications simple. Users can:
          </p>
          <ul className="space-y-2.5">
            {discoveryFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                <ChevronRight className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* App Updates */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
                App Updates
              </h2>
            </div>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
              When a new version of an application becomes available, its information can be updated on NexStore.
            </p>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
              App pages can provide version information and release notes so users can understand what has changed between releases.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-text-muted font-inter">
            Clean version tracking and structured change histories for every build.
          </div>
        </div>
      </section>

      {/* 6. Our Approach to Trust */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 border border-border-glass space-y-6 relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white tracking-tight">
              Our Approach to Trust
            </h2>
          </div>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            We want NexStore to provide a clear and transparent experience. We aim to:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustPrinciples.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-deep-navy-solid border border-border-glass">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-white">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Why We Built NexStore & Built for the Nex Ecosystem */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Why We Built */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
            Why We Built NexStore
          </h2>
          <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            <p>
              As the number of applications in an ecosystem grows, finding the right product can become difficult.
            </p>
            <p>
              We built NexStore to solve that problem for our own ecosystem.
            </p>
            <p>
              Instead of maintaining separate destinations for every application, NexStore provides one central location for our products.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 space-y-1 font-outfit text-white font-medium text-sm">
            <div>One ecosystem.</div>
            <div>One destination.</div>
            <div className="text-electric-blue font-bold">One official place to discover our apps.</div>
          </div>
        </div>

        {/* Built for the Nex Ecosystem */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
            Built for the Nex Ecosystem
          </h2>
          <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            <p>
              NexStore is not intended to replace every major app marketplace.
            </p>
            <p>
              Its purpose is different.
            </p>
            <p>
              NexStore is the dedicated home for the applications and software products that are part of the Nex ecosystem.
            </p>
            <p>
              As the ecosystem grows, NexStore can grow with it.
            </p>
          </div>
        </div>
      </section>

      {/* 8. What You Can Expect & Our Future */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* What you can expect */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
            What You Can Expect
          </h2>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
            We aim to continuously improve NexStore by making it:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {expectationList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs sm:text-sm text-white font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Our Future */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-border-glass space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">
              Our Future
            </h2>
            <div className="space-y-3 text-text-secondary text-sm sm:text-base leading-relaxed font-inter">
              <p>
                NexStore is designed with the future of the Nex ecosystem in mind.
              </p>
              <p>
                As we create new applications and digital products, we plan to expand the platform with better discovery, improved product information, richer release details, and additional ecosystem experiences.
              </p>
              <p>
                Our goal is to build a unified software destination around the products we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NexStore Callout Card */}
      <section className="glass-panel rounded-3xl p-8 sm:p-12 border border-electric-blue/30 bg-gradient-to-r from-deep-navy-solid via-card-bg to-deep-navy-solid text-center space-y-6 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-outfit font-bold text-white tracking-tight">
            NEXSTORE
          </h2>
          <p className="text-electric-blue font-medium text-base sm:text-lg">
            Your official destination for Nex applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-white font-outfit font-bold text-lg sm:text-xl">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10">Discover.</span>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10">Explore.</span>
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10">Download.</span>
        </div>

        <p className="text-text-muted text-sm font-medium">
          All in one place.
        </p>

        <div className="pt-2">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-blue-500 hover:to-purple-500 text-white font-bold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all text-sm"
          >
            <span>Explore Official Apps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 10. Contact & Legal Section */}
      <section id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border-glass">
        {/* Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-electric-blue" />
            <h3 className="text-xl font-outfit font-bold text-white">Contact</h3>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            Have a question, suggestion, or issue?
          </p>
          <p className="text-text-secondary text-sm leading-relaxed font-inter">
            Contact us through our official support channel.
          </p>
          <div className="space-y-2 pt-2 text-sm font-inter">
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-white font-semibold">Support:</span>
              <span className="text-electric-blue font-mono">support@nexstore.app</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-white font-semibold">Website:</span>
              <span className="text-text-muted font-mono">Official NexStore Web Portal</span>
            </div>
          </div>
          <p className="text-xs text-text-muted font-inter pt-1">
            Follow our official channels for product announcements and updates.
          </p>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyber-purple" />
            <h3 className="text-xl font-outfit font-bold text-white">Legal</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm font-inter">
            <Link href="/privacy" className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40 transition-colors block">
              Privacy Policy
            </Link>
            <Link href="/terms" className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40 transition-colors block">
              Terms of Service
            </Link>
            <Link href="/copyright" className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40 transition-colors block">
              Copyright
            </Link>
            <Link href="/contact" className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-text-secondary hover:text-white hover:border-electric-blue/40 transition-colors block">
              Contact
            </Link>
          </div>
          <p className="text-xs text-text-muted font-inter pt-2">
            Official guidelines, terms of service, and ecosystem intellectual property notices.
          </p>
        </div>
      </section>

      {/* 11. Lead Creator & Architect Section */}
      <section className="glass-panel rounded-3xl p-8 sm:p-10 border border-electric-blue/30 bg-gradient-to-br from-[#0c1329] via-cosmic-obsidian to-[#120d2b] relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-electric-blue/20 via-cyber-purple/20 to-rose-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="inline-block px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-semibold uppercase tracking-wider text-sky-300">
          Lead Architect &amp; Creator
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-outfit font-extrabold text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-center">
            <span>Crafted &amp; Visioned by</span>
            <ArgoTalukderText size="3xl" showGlow showSparkle subtext="Pro" />
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed font-inter">
            Building next-generation digital experiences for the Nex ecosystem with seamless performance, high-frequency design principles, and zero compromise.
          </p>
        </div>
      </section>

      {/* Footer Statement */}
      <section className="text-center pt-8 border-t border-border-glass/40 text-xs sm:text-sm text-text-muted space-y-2 font-inter">
        <p>© {currentYear} NexStore. All rights reserved.</p>
        <p className="text-text-secondary font-medium">NexStore is part of the Nex ecosystem.</p>
        <div className="pt-3 flex items-center justify-center px-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-2xl sm:rounded-full bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-outfit font-medium text-white/90 shadow-md backdrop-blur-md text-center max-w-full">
            <span className="whitespace-nowrap">Designed &amp; Engineered with</span>
            <span className="text-rose-500 inline-block animate-pulse">❤️</span>
            <span className="whitespace-nowrap">by</span>
            <ArgoTalukderText size="sm" showGlow showSparkle />
          </div>
        </div>
      </section>

    </div>
  );
}
