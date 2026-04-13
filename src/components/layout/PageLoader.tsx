'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        // Faster increments to complete in ~1.5s
        return prev + 8;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-[#fcf9f8] flex flex-col items-center justify-center"
        >
          {/* Center content */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="font-display text-5xl font-extrabold tracking-tighter text-[#1c1b1b] mb-4"
          >
            FreezeDance
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="uppercase tracking-[0.5em] text-[#705d00] text-[0.6rem] mb-10"
          >
            Preserving Nature&apos;s Goodness
          </motion.p>

          {/* Minimalist loading bar — thin 1px line */}
          <div className="w-48 h-px bg-[#1c1b1b]/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#705d00] to-[#ffd700]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Bottom corners */}
          <div className="fixed bottom-8 left-8 right-8 flex justify-between">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[0.6rem] uppercase tracking-[0.3em] text-[#4d4732]"
            >
              Established 2024
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[0.6rem] uppercase tracking-[0.3em] text-[#4d4732]"
            >
              100% Natural
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
