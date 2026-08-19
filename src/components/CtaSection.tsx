import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

export default function CtaSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <SiteImage image={IMAGES.ctaFondo} sizes="100vw" />
        <div className="absolute inset-0 bg-graphite-dark/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow mx-auto px-6 text-center">
        <motion.h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-marble-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          ¿Tienes un proyecto<br /><span className="italic">en mente?</span>
        </motion.h2>

        <motion.p
          className="text-marble-white/70 text-lg md:text-xl max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#contacto" className="btn-primary !bg-marble-white !text-graphite-dark hover:!bg-marble-ivory">
            Pedir presupuesto
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
