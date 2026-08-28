'use client';

import { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { incrementDownload } from '@/app/actions';

export function DownloadButton({
  appId,
  downloadUrl,
  onDownloadComplete,
  className,
  label = 'Download APK',
  size = 'lg',
}: {
  appId: string;
  downloadUrl: string;
  onDownloadComplete?: (newCount?: number) => void;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'completed'>('idle');

  const handleDownload = async () => {
    if (status !== 'idle') return;
    setStatus('downloading');

    try {
      const res = await incrementDownload(appId);
      if (res.success && onDownloadComplete) {
        onDownloadComplete(res.newCount);
      }

      // Trigger direct file download in the background without navigating away or causing blank screen
      if (downloadUrl && downloadUrl !== '#' && downloadUrl.startsWith('http')) {
        try {
          // Use an invisible background iframe for silent direct downloading without page redirection
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.style.width = '0px';
          iframe.style.height = '0px';
          iframe.style.border = '0';
          iframe.src = downloadUrl;
          document.body.appendChild(iframe);

          // Clean up the temporary iframe after download initiation
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 20000);
        } catch (downloadErr) {
          console.warn('Silent iframe download failed, fallback to anchor tag:', downloadErr);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.rel = 'noopener noreferrer';
          link.setAttribute('download', '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }

      setStatus('completed');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error('Download error:', e);
      setStatus('idle');
    }
  };

  const defaultClasses = size === 'sm'
    ? 'text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md bg-gradient-to-r from-electric-blue to-cyber-purple text-white shadow-electric-blue/20 hover:opacity-90 cursor-pointer'
    : 'w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all disabled:opacity-80 cursor-pointer';

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-6 h-6';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDownload}
      disabled={status === 'downloading'}
      className={className || defaultClasses}
    >
      {status === 'downloading' ? (
        <>
          <Loader2 className={`${iconSize} animate-spin`} />
          <span>{size === 'sm' ? 'Starting...' : 'Starting Download...'}</span>
        </>
      ) : status === 'completed' ? (
        <>
          <Check className={`${iconSize} text-emerald-300`} />
          <span>{size === 'sm' ? 'Started!' : 'Download Started!'}</span>
        </>
      ) : (
        <>
          <Download className={iconSize} />
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}

