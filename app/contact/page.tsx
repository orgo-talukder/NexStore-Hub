'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  PhoneCall,
  Globe
} from 'lucide-react';

export default function ContactPage() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const contactChannels = [
    {
      title: 'General Support',
      email: 'support@nexstore.app',
      desc: 'Questions about apps, releases, or troubleshooting.',
      badge: '24-48h turnaround',
      icon: Mail,
      color: 'text-electric-blue',
      bg: 'bg-electric-blue/15 border-electric-blue/30',
    },
    {
      title: 'Security & Vulnerabilities',
      email: 'security@nexstore.app',
      desc: 'Bug bounties, CVE reports, and security disclosures.',
      badge: 'High Priority',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/30',
    },
    {
      title: 'Copyright & Legal',
      email: 'copyright@nexstore.app',
      desc: 'DMCA notices, intellectual property, and licensing.',
      badge: 'Legal Desk',
      icon: MessageSquare,
      color: 'text-cyber-purple',
      bg: 'bg-cyber-purple/15 border-cyber-purple/30',
    },
  ];

  const faqs = [
    {
      q: 'Are all applications on NexStore free to download?',
      a: 'All official applications published under the Nex ecosystem are free to browse and download directly without hidden subscription fees.',
    },
    {
      q: 'Where are the download files hosted?',
      a: 'Official release binaries and packages are securely hosted on GitHub Releases, ensuring cryptographic integrity and fast global delivery.',
    },
    {
      q: 'How do I report a bug in an application?',
      a: 'You can submit a message using the form below or email support@nexstore.app with your device OS version and screenshots.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
      
      {/* Header Banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-4 h-4 text-electric-blue" />
          Get In Touch
        </div>

        <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white tracking-tight">
          CONTACT &amp; SUPPORT
        </h1>

        <p className="text-text-muted text-sm sm:text-base font-inter max-w-2xl mx-auto">
          Have a question about an application, need assistance, or want to submit feedback? We&apos;re here to help.
        </p>
      </section>

      {/* Official Contact Channels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactChannels.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-border-glass flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${channel.bg} ${channel.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-text-muted border border-white/5">
                    {channel.badge}
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-white">
                  {channel.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-inter">
                  {channel.desc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-deep-navy-solid border border-border-glass text-xs">
                <span className="text-text-muted block text-[10px] uppercase font-semibold">Email:</span>
                <span className="font-mono text-electric-blue font-medium">{channel.email}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Interactive Form & FAQ Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-border-glass">
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-2">
            Send Us a Message
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mb-6 font-inter">
            Fill out the form below and our team will get back to you promptly.
          </p>

          {isSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-outfit font-bold text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto font-inter">
                Thank you for contacting NexStore. Our team has received your inquiry and will respond within 24–48 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-2 text-xs font-semibold text-emerald-400 hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-inter">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Walker"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-white focus:outline-none focus:border-electric-blue transition-colors text-sm"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Bug / App Issue">Technical Bug / App Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Ecosystem Partnership">Ecosystem Partnership</option>
                  <option value="Copyright / Legal">Copyright / Legal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Message <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-deep-navy-solid border border-border-glass text-white placeholder:text-text-muted focus:outline-none focus:border-electric-blue transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-electric-blue text-white font-semibold text-sm hover:bg-sky-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-electric-blue/20"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQs Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-border-glass space-y-4">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-cyber-purple" />
              <h3 className="text-lg font-outfit font-bold text-white">
                Frequently Asked Questions
              </h3>
            </div>
            
            <div className="space-y-3.5 pt-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-deep-navy-solid border border-border-glass space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-inter">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-border-glass space-y-2 text-xs text-text-secondary font-inter">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Official Response Commitment</span>
            </div>
            <p>
              Inquiries submitted via this portal are routed directly to the NexStore core maintainers. Typical response time is under 24 business hours.
            </p>
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
