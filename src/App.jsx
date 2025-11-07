import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import HeroText from './components/HeroText';
import DeviceWaveMock from './components/DeviceWaveMock';
import BookCall_CTA from './components/BookCall_CTA';
import SplineAura from './components/SplineAura';

export default function App() {
  const rootRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // Cursor-reactive gradient + scroll reactive hue
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mq = window.matchMedia('(max-width: 640px)');
    setIsMobile(mq.matches);

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      root.style.setProperty('--gx', x.toFixed(3));
      root.style.setProperty('--gy', y.toFixed(3));
    };

    const onScroll = () => {
      const scrolled = Math.min(1, window.scrollY / window.innerHeight);
      root.style.setProperty('--shift', (scrolled * 30).toFixed(1) + '%');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Demo audio simple control
  const handlePlayDemo = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundColor: '#07080a',
        '--gx': 0.5,
        '--gy': 0.5,
        '--shift': '0%',
        '--accent-gradient': isMobile
          ? 'radial-gradient(120% 120% at 50% 0%, rgba(124,102,255,0.25), rgba(7,8,10,0) 60%)'
          : `radial-gradient(60% 60% at calc(var(--gx) * 100%) calc(var(--gy) * 100%), rgba(0,212,255,0.18), rgba(124,102,255,0.16) var(--shift), rgba(255,209,102,0.10) 60%, rgba(7,8,10,0) 75%)`
      }}
    >
      {/* Accent animated gradient overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
        style={{ backgroundImage: 'var(--accent-gradient)' }}
      />

      {/* Spline aura behind content */}
      <SplineAura />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <HeroText onPlayDemo={handlePlayDemo} />
          </div>
          <div className="hidden lg:block">
            <DeviceWaveMock />
          </div>
        </div>
      </div>

      {/* Sticky CTA on mobile for quick access */}
      <div className="lg:hidden fixed bottom-4 left-0 right-0 px-5 flex justify-center z-20">
        <BookCall_CTA className="w-full max-w-sm" />
      </div>

      {/* Inline demo audio */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2023/03/19/audio_b1f1c21d2d.mp3?filename=robot-voice-143106.mp3"
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
