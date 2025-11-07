import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import BookCall_CTA from './BookCall_CTA';

export default function HeroText({ onPlayDemo }) {
  // Typewriter effect control
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const full = el.dataset.full || '';
    el.textContent = '';

    let i = 0;
    const duration = 900; // ms total
    const step = Math.max(10, Math.floor(duration / Math.max(1, full.length)));

    const timer = setInterval(() => {
      el.textContent = full.slice(0, i++);
      if (i > full.length) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-xl xl:max-w-2xl space-y-6">
      <div className="text-sm tracking-wide uppercase text-slate-300/80">AI Voice Agents • 24/7 Conversions</div>

      <h1
        ref={headlineRef}
        data-full="Deploy Voice Agents That Book, Qualify & Convert"
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-[image:var(--accent-gradient)] bg-[length:200%_200%]"
        style={{
          WebkitTextStroke: '0.2px rgba(255,255,255,0.25)'
        }}
      >
        {/* Typewriter injects text */}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="text-[#cfd8e3] text-base sm:text-lg leading-relaxed"
      >
        Human-sounding voice agents that answer calls, qualify leads and schedule meetings — integrated with your CRM.
      </motion.p>

      <div className="flex items-center gap-3 pt-2">
        <BookCall_CTA />
        <button
          onClick={onPlayDemo}
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white/90 bg-transparent border border-white/15 hover:border-white/30 backdrop-blur-sm hover:bg-white/5 transition-all"
        >
          Listen Demo
        </button>
      </div>

      <p className="text-xs text-slate-400/70 pt-2">
        Calendly microcopy suggestion: “Please briefly describe your business & main goal for the call.”
      </p>
    </div>
  );
}
