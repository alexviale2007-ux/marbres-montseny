import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CtaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      {/* Background with slow zoom */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?auto=format&fit=crop&w=2000&q=80')`,
          }}
          animate={isVisible ? { scale: [1, 1.05] } : {}}
          transition={{ duration: 10, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-graphite-dark/85" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-marble-white/10"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-6 text-center">
        <motion.h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-marble-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          ¿Tienes un proyecto<br /><span className="italic">en mente?</span>
        </motion.h2>

        {/* Animated line */}
        <motion.div
          className="h-[1px] bg-marble-white/30 mx-auto mb-8"
          initial={{ width: 0 }}
          animate={isVisible ? { width: 80 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        <motion.p
          className="text-marble-white/70 text-lg md:text-xl max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#contacto" className="btn-primary !bg-marble-white !text-graphite-dark hover:!bg-marble-ivory group">
            Pedir presupuesto
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
    </section>
  );
}
