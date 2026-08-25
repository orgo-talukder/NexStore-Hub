'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

function ProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState<string>('');

  useEffect(() => {
    const currentKey = `${pathname}?${searchParams?.toString() || ''}`;
    const timer = setTimeout(() => {
      setActiveKey(currentKey);
    }, 0);
    const clearTimer = setTimeout(() => {
      setActiveKey('');
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {activeKey !== '' && (
        <motion.div
          key={activeKey}
          initial={{ width: 0, opacity: 1 }}
          animate={{ width: '100%', opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-electric-blue to-cyber-purple shadow-[0_0_10px_rgba(59,130,246,0.7)]"
        />
      )}
    </AnimatePresence>
  );
}

export function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  );
}
