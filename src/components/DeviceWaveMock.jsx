import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DeviceWaveMock() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const draw = () => {
      tRef.current += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Phone body
      const r = 36 * devicePixelRatio;
      const pad = 16 * devicePixelRatio;
      const x = pad;
      const y = pad;
      const w = width - pad * 2;
      const h = height - pad * 2;

      ctx.save();
      ctx.shadowColor = 'rgba(124,102,255,0.25)';
      ctx.shadowBlur = 40 * devicePixelRatio;
      roundRect(ctx, x, y, w, h, r);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fill();
      ctx.restore();

      // Screen inner
      const inset = 12 * devicePixelRatio;
      roundRect(ctx, x + inset, y + inset, w - inset * 2, h - inset * 2, r - inset);
      ctx.fillStyle = 'rgba(7,8,10,0.9)';
      ctx.fill();

      // Looping text placeholder
      ctx.save();
      ctx.clip();
      const text = 'AtomiseAI • Voice agent demo • Scheduling • Lead qualify • ';
      ctx.fillStyle = 'rgba(207,216,227,0.75)';
      ctx.font = `${14 * devicePixelRatio}px Inter, system-ui, sans-serif`;
      const tw = ctx.measureText(text).width;
      const tx = -((tRef.current * 60) % tw);
      for (let i = -1; i < Math.ceil(w / tw) + 1; i++) {
        ctx.fillText(text, x + inset + tx + i * tw, y + inset + 26 * devicePixelRatio);
      }
      ctx.restore();

      // Animated waveform
      const cx = x + w / 2;
      const cy = y + h / 2 + 10 * devicePixelRatio;
      const amp = 18 * devicePixelRatio;
      const len = w * 0.6;
      ctx.lineWidth = 2 * devicePixelRatio;
      const grad = ctx.createLinearGradient(cx - len / 2, cy, cx + len / 2, cy);
      grad.addColorStop(0, '#00d4ff');
      grad.addColorStop(0.5, '#7c66ff');
      grad.addColorStop(1, '#ffd166');
      ctx.strokeStyle = grad;

      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const p = i / 80;
        const xPos = cx - len / 2 + p * len;
        const yPos = cy + Math.sin(p * 6.283 + tRef.current * 1.5) * amp * Math.cos(p * Math.PI);
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(draw);
    };

    const roundRect = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };

    handleResize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative w-full h-[520px] sm:h-[560px] lg:h-[640px] rounded-3xl overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Pulsing aura */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(124,102,255,0.08), transparent 60%)' }}
      />
    </motion.div>
  );
}
