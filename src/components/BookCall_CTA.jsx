import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function BookCall_CTA({ className = '' }) {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <motion.a
      ref={ref}
      initial={{ scale: 0.95, opacity: 0.9 }}
      animate={controls}
      href="https://calendly.com/your-page"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a call with AtomiseAI"
      className={`cta-book inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-[#07080a] bg-white shadow-[0_10px_30px_rgba(0,212,255,0.25)] hover:shadow-[0_14px_40px_rgba(124,102,255,0.35)] transition-all duration-200 hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${className}`}
    >
      Book a Call
    </motion.a>
  );
}
