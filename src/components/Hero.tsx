import { motion } from 'framer-motion';
import { ArrowDown, Phone } from 'lucide-react';
import Logo from './Logo';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ===== Lámina de mármol negro pulido ===== */}
      <div className="absolute inset-0 bg-[#0d0c0b]">
        {/* Base de piedra */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #23201e 0%, #131110 35%, #0b0a09 60%, #1a1715 100%)',
          }}
        />

        {/* Vetas del mármol */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="heroVein" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a8580" stopOpacity="0" />
              <stop offset="35%" stopColor="#b8b2aa" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#8a8580" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8a8580" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroVeinSoft" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6f6a64" stopOpacity="0" />
              <stop offset="50%" stopColor="#9b958d" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6f6a64" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#heroVein)">
            <path d="M-50,210 C220,170 380,300 620,250 C860,200 1010,320 1250,265" strokeWidth="1.6" />
            <path d="M-50,540 C260,600 420,470 660,520 C900,570 1060,470 1250,515" strokeWidth="1.3" />
          </g>
          <g fill="none" stroke="url(#heroVeinSoft)">
            <path d="M-50,120 C240,95 400,180 640,140 C880,100 1040,175 1250,140" strokeWidth="0.9" />
            <path d="M-50,360 C200,395 420,320 640,365 C880,415 1050,345 1250,385" strokeWidth="0.8" />
            <path d="M-50,680 C230,650 430,720 660,675 C900,630 1070,700 1250,665" strokeWidth="0.9" />
          </g>
          <g fill="none" stroke="#c9c3ba" strokeOpacity="0.14">
            <path d="M150,-50 C185,220 120,420 175,660 C205,780 165,820 190,860" strokeWidth="0.7" />
            <path d="M880,-50 C845,190 905,380 860,600 C830,760 870,800 850,860" strokeWidth="0.6" />
          </g>
        </svg>

        {/* Pulido: reflejo especular difuso */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 85% at 50% 8%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 32%, rgba(255,255,255,0) 62%)',
          }}
        />

        {/* Brillo que recorre la lámina */}
        {!reduced && (
          <motion.div
            className="absolute inset-y-0 w-[45%] pointer-events-none"
            style={{
              background:
                'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.05) 42%, rgba(255,255,255,0.11) 50%, rgba(255,255,255,0.05) 58%, transparent 100%)',
            }}
            initial={{ x: '-60%' }}
            animate={{ x: '260%' }}
            transition={{ duration: 7, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          />
        )}

        {/* Viñeteado para centrar la atención */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(75% 65% at 50% 45%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.72) 100%)',
          }}
        />
      </div>

      {/* ===== Contenido ===== */}
      <div className="relative z-10 w-full container-wide mx-auto px-6 lg:px-10 py-28 text-center">
        {/* Logo grabado en la piedra */}
        <motion.div
          className="mx-auto mb-8 w-[190px] sm:w-[230px] lg:w-[280px]"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Logo variant="engraved" className="w-full h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)]" />
        </motion.div>

        {/* Nombre de marca */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <h1 className="font-serif text-marble-white leading-[1.05]">
            <span className="block text-4xl sm:text-5xl lg:text-6xl tracking-[0.26em]">
              MARBRES
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl tracking-[0.26em] mt-1">
              MONTSENY
            </span>
          </h1>
        </motion.div>

        {/* Filete separador */}
        <motion.div
          className="mx-auto mt-7 h-[1px] bg-gradient-to-r from-transparent via-stone-400/70 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 190, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <motion.p
          className="eyebrow text-stone-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          MARMOLERÍA A MEDIDA · VILALBA SASSERRA
        </motion.p>

        <motion.p
          className="mt-7 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-marble-white/75 font-light leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          Encimeras, baños, escaleras y trabajos en piedra natural y compactos,
          realizados con precisión y atención al detalle.
        </motion.p>

        {/* Acciones */}
        <motion.div
          className="mt-11 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <a
            href="#contacto"
            className="btn-primary !bg-marble-white !text-graphite-dark hover:!bg-marble-ivory justify-center"
          >
            Pide tu presupuesto
            {!reduced && (
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            )}
          </a>
          <a
            href="tel:+34600419998"
            className="btn-secondary !border-marble-white/30 !text-marble-white hover:!bg-marble-white/10 justify-center"
          >
            <Phone size={16} />
            600 41 99 98
          </a>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-marble-white/50 mb-3">
          Descubre nuestro trabajo
        </p>
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-marble-white/50 mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
