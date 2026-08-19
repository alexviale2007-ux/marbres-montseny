import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'texture' | 'reveal' | 'text' | 'exit'>('texture');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    const timers = [
      setTimeout(() => setPhase('reveal'), 600),
      setTimeout(() => setPhase('text'), 1400),
      setTimeout(() => setPhase('exit'), 2800),
      setTimeout(onComplete, 3400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete, reducedMotion]);

  if (reducedMotion) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#1a1816' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <p className="font-serif text-3xl text-marble-white tracking-wider">MARBRES</p>
            <p className="font-serif text-3xl text-marble-white tracking-wider">MONTSENY</p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Marble texture background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, #1a1816 0%, #2d2a28 25%, #1c1a18 50%, #2a2724 75%, #1a1816 100%)
              `,
            }}
          />
          {/* Marble veins SVG pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="turbulence">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="5" />
                <feDisplacementMap in="SourceGraphic" scale="30" />
              </filter>
            </defs>
            <path d="M0,300 Q250,280 500,350 Q750,420 1000,300" stroke="#8a8580" strokeWidth="0.5" fill="none" opacity="0.6" />
            <path d="M0,500 Q200,480 400,520 Q600,560 800,490 Q900,460 1000,500" stroke="#a8a198" strokeWidth="0.3" fill="none" opacity="0.4" />
            <path d="M0,700 Q300,680 600,720 Q800,740 1000,690" stroke="#8a8580" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M200,0 Q220,250 180,500 Q160,750 210,1000" stroke="#a8a198" strokeWidth="0.3" fill="none" opacity="0.3" />
            <path d="M600,0 Q580,200 620,400 Q640,600 610,800 Q590,900 620,1000" stroke="#8a8580" strokeWidth="0.4" fill="none" opacity="0.4" />
            <path d="M0,150 Q150,140 300,180 Q500,220 700,160 Q850,120 1000,170" stroke="#a8a198" strokeWidth="0.2" fill="none" opacity="0.3" />
            <path d="M0,850 Q200,830 400,870 Q650,900 900,840 L1000,850" stroke="#8a8580" strokeWidth="0.3" fill="none" opacity="0.35" />
          </svg>

          {/* Light sweep animation */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: '-100%' }}
            animate={phase !== 'texture' ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 60%, transparent 100%)',
              width: '100%',
            }}
          />
        </div>

        {/* Logo reveal */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={phase === 'text' || phase === 'exit' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="font-serif text-4xl md:text-5xl tracking-[0.2em] mb-2"
              style={{ color: '#fdfcfa' }}
            >
              MARBRES
            </p>
            <p
              className="font-serif text-4xl md:text-5xl tracking-[0.2em]"
              style={{ color: '#fdfcfa' }}
            >
              MONTSENY
            </p>
            <motion.div
              className="mx-auto mt-6 h-[1px]"
              style={{ backgroundColor: '#8a8580' }}
              initial={{ width: 0 }}
              animate={phase === 'text' || phase === 'exit' ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
