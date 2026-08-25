'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UploadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Smartphone, 
  Tag, 
  Layers, 
  HardDrive, 
  ExternalLink,
  ArrowRight,
  Info,
  Star,
  Check
} from 'lucide-react';

export default function SubmitAppPage() {
  const [formData, setFormData] = useState({
    name: '',
    packageName: '',
    category: 'tools',
    shortDescription: '',
    description: '',
    latestVersion: '1.0.0',
    apkSize: '25 MB',
    apkUrl: '',
    iconUrl: '',
    minAndroid: 'Android 8.0+',
    developerName: '',
    developerEmail: '',
    githubRepo: '',
    featuresText: 'Clean and lightweight\nFast direct download\nNo tracking or telemetry',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate developer review queue submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionId(`NEX-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-blue/15 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5" />
          <span>Developer Ecosystem</span>
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-white tracking-tight">
          Publish Your App to <span className="text-electric-blue">NexStore</span>
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Distribute your open-source projects, tools, and Android applications with zero platform fees, high-speed CDN direct downloads, and global discovery.
        </p>
      </div>

      {isSubmitted ? (
        /* Submission Success View */
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 sm:p-12 border border-border-glass text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Submission Reference #{submissionId}
            </span>
            <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white">
              Application Successfully Submitted!
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
              Our automated static security scan and catalog review team will verify <strong className="text-white">{formData.name}</strong>. You will receive an update at <span className="text-electric-blue font-mono">{formData.developerEmail || 'your email'}</span> within 24 hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-2 text-text-muted">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary font-medium">Package:</span>
              <span className="font-mono text-white">{formData.packageName || 'com.example.app'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary font-medium">Target Version:</span>
              <span className="text-white">v{formData.latestVersion}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary font-medium">Category:</span>
              <span className="text-white capitalize">{formData.category}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  packageName: '',
                  category: 'tools',
                  shortDescription: '',
                  description: '',
                  latestVersion: '1.0.0',
                  apkSize: '25 MB',
                  apkUrl: '',
                  iconUrl: '',
                  minAndroid: 'Android 8.0+',
                  developerName: '',
                  developerEmail: '',
                  githubRepo: '',
                  featuresText: 'Clean and lightweight\nFast direct download\nNo tracking or telemetry',
                });
              }}
              className="px-5 py-2.5 rounded-xl border border-border-glass text-xs sm:text-sm font-semibold text-text-secondary hover:text-white transition-colors"
            >
              Submit Another App
            </button>
            <Link
              href="/apps"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-xs sm:text-sm font-bold shadow-lg shadow-electric-blue/30 hover:opacity-90 transition-all"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      ) : (
        /* Form & Live Preview Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {/* Section 1: Basic Information */}
            <div className="glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-border-glass space-y-5">
              <h3 className="text-lg font-outfit font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-electric-blue" />
                <span>1. Application Identity</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    App Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="e.g. RetroArch Plus"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      Package Name (Android ID) *
                    </label>
                    <input
                      type="text"
                      required
                      name="packageName"
                      placeholder="e.g. com.developer.retroarch"
                      value={formData.packageName}
                      onChange={handleChange}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm font-mono rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue capitalize"
                    >
                      <option value="tools">Tools & Utilities</option>
                      <option value="games">Games</option>
                      <option value="productivity">Productivity</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="media">Media & Video</option>
                      <option value="social">Social & Communication</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Short Tagline (max 90 chars) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={90}
                    name="shortDescription"
                    placeholder="e.g. Next-generation all-in-one multi-system emulator"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    placeholder="Provide in-depth details regarding performance, compatibility, and core features..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl p-4 focus:outline-none focus:border-electric-blue resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Release Package & Direct Link */}
            <div className="glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-border-glass space-y-5">
              <h3 className="text-lg font-outfit font-bold text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyber-purple" />
                <span>2. Binary & Package Information</span>
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      Version Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="latestVersion"
                      placeholder="1.0.0"
                      value={formData.latestVersion}
                      onChange={handleChange}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      Package Size *
                    </label>
                    <input
                      type="text"
                      required
                      name="apkSize"
                      placeholder="45 MB"
                      value={formData.apkSize}
                      onChange={handleChange}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                      Min Android *
                    </label>
                    <input
                      type="text"
                      required
                      name="minAndroid"
                      placeholder="Android 8.0+"
                      value={formData.minAndroid}
                      onChange={handleChange}
                      className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Direct APK Download URL / GitHub Release Asset *
                  </label>
                  <input
                    type="url"
                    required
                    name="apkUrl"
                    placeholder="https://github.com/org/repo/releases/download/v1.0.0/app-release.apk"
                    value={formData.apkUrl}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue font-mono"
                  />
                  <span className="block text-[11px] text-text-muted mt-1">
                    Must be a direct, secure HTTPS binary download link without ad shorteners.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    App Icon Image URL
                  </label>
                  <input
                    type="url"
                    name="iconUrl"
                    placeholder="https://i.ibb.co/... or direct image URL (512x512 PNG)"
                    value={formData.iconUrl}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Developer Contacts */}
            <div className="glass-panel rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-border-glass space-y-5">
              <h3 className="text-lg font-outfit font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>3. Publisher Identity & Compliance</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Developer / Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="developerName"
                    placeholder="e.g. NexTeam Studio"
                    value={formData.developerName}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    name="developerEmail"
                    placeholder="developer@example.com"
                    value={formData.developerEmail}
                    onChange={handleChange}
                    className="w-full bg-deep-navy-solid border border-border-glass text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs text-text-secondary">
                <input
                  type="checkbox"
                  required
                  id="complianceCheck"
                  className="mt-0.5 rounded border-border-glass bg-deep-navy-solid text-electric-blue focus:ring-0"
                />
                <label htmlFor="complianceCheck" className="cursor-pointer leading-snug">
                  I certify that this package does not contain malicious code, spyware, or unsolicited advertisements, and complies with <Link href="/guidelines" className="text-electric-blue underline">NexStore Ecosystem Guidelines</Link>.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-base font-bold shadow-xl shadow-electric-blue/30 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              <span>{isSubmitting ? 'Verifying Package...' : 'Submit Application for Review'}</span>
            </button>
          </form>

          {/* Right Column: Live Store Card Preview */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="glass-panel rounded-2xl md:rounded-3xl p-6 border border-border-glass space-y-4">
              <div className="flex items-center justify-between border-b border-border-glass pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
                  <span>Live Store Preview</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  Verified Preview
                </span>
              </div>

              {/* Card Mockup */}
              <div className="p-5 rounded-2xl bg-deep-navy-solid border border-border-glass space-y-4 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-electric-blue/30 to-cyber-purple/30 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {formData.iconUrl ? (
                      <img src={formData.iconUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold font-outfit text-white">
                        {formData.name ? formData.name.charAt(0).toUpperCase() : 'N'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-outfit font-bold text-white truncate">
                      {formData.name || 'Your App Name'}
                    </h4>
                    <p className="text-xs text-text-muted truncate font-mono">
                      {formData.packageName || 'com.example.package'}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-electric-blue/15 text-electric-blue uppercase font-semibold">
                        {formData.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-white font-bold">
                        <Star className="w-3 h-3 text-star-rating fill-star-rating" />
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {formData.shortDescription || 'Your short tagline will appear right here for users discovering your application.'}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-text-muted border-t border-white/5">
                  <span>v{formData.latestVersion}</span>
                  <span>{formData.apkSize}</span>
                  <span className="text-electric-blue font-semibold">Free Direct APK</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-text-muted space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Info className="w-4 h-4 text-electric-blue" />
                  <span>Why Publish on NexStore?</span>
                </div>
                <ul className="space-y-1 pl-6 list-disc text-[11px] text-text-secondary">
                  <li>Global multi-region CDN download speeds</li>
                  <li>VirusTotal security clearance badge</li>
                  <li>Zero store commission or approval barriers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
