import { motion } from 'framer-motion';
import { ArrowDown, Phone } from 'lucide-react';

export default function Hero() {
  const titleWords = ['Mármol,', 'piedra', 'y', 'superficies'];
  
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with parallax */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80')`,
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-dark/70 via-graphite-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-graphite-dark/20" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-marble-white/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide mx-auto px-6 lg:px-10 pt-24">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-marble-white/70 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            MARBRES MONTSENY · VILALBA SASSERRA
          </motion.p>

          {/* Animated title - word by word */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-marble-white leading-[1.05] mb-2">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.span
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-marble-white leading-[1.05] italic inline-block mb-8"
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            hechas a medida.
          </motion.span>

          {/* Animated line under title */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-marble-white/60 to-transparent mb-8"
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.p
            className="text-lg md:text-xl text-marble-white/80 max-w-xl mb-10 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Encimeras, baños, escaleras y trabajos en piedra natural y compactos, realizados con precisión y atención al detalle.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <a href="#contacto" className="btn-primary group">
              Pide tu presupuesto
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </a>
            <a href="tel:+34600419998" className="btn-secondary !border-marble-white/30 !text-marble-white hover:!bg-marble-white/10">
              <Phone size={16} />
              600 41 99 98
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-marble-white/60 mb-3">
          Descubre nuestro trabajo
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-marble-white/60 mx-auto" />
        </motion.div>
      </motion.div>

      {/* Side decoration */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-marble-white/30"
            initial={{ height: 0 }}
            animate={{ height: 20 + i * 8 }}
            transition={{ delay: 2.2 + i * 0.15, duration: 0.5 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
