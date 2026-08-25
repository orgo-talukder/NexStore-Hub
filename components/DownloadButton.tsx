'use client';

import { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { incrementDownload } from '@/app/actions';

export function DownloadButton({
  appId,
  downloadUrl,
  onDownloadComplete,
}: {
  appId: string;
  downloadUrl: string;
  onDownloadComplete?: (newCount?: number) => void;
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

      // Trigger the real file download or link
      if (downloadUrl && downloadUrl !== '#' && downloadUrl.startsWith('http')) {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setStatus('completed');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error('Download error:', e);
      setStatus('idle');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDownload}
      disabled={status === 'downloading'}
      className="w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-electric-blue to-cyber-purple hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all disabled:opacity-80 cursor-pointer"
    >
      {status === 'downloading' ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Starting Download...</span>
        </>
      ) : status === 'completed' ? (
        <>
          <Check className="w-6 h-6 text-emerald-300" />
          <span>Download Started!</span>
        </>
      ) : (
        <>
          <Download className="w-6 h-6" />
          <span>Download APK</span>
        </>
      )}
    </motion.button>
  );
}

