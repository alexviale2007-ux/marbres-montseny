import { motion } from 'framer-motion';
import { ArrowDown, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-dark/70 via-graphite-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-graphite-dark/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide mx-auto px-6 lg:px-10 pt-24">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-marble-white/70 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            MARBRES MONTSENY · VILALBA SASSERRA
          </motion.p>

          <motion.h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-marble-white leading-[1.05] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mármol, piedra y superficies
            <br />
            <span className="italic">hechas a medida.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-marble-white/80 max-w-xl mb-10 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Encimeras, baños, escaleras y trabajos en piedra natural y compactos, realizados con precisión y atención al detalle.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="#contacto" className="btn-primary">
              Pide tu presupuesto
              <ArrowDown size={16} className="rotate-[-90deg]" />
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
        transition={{ delay: 1.2 }}
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
    </section>
  );
}
