import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

export default function Introduction() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              MARBRES MONTSENY
            </motion.p>

            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite-dark mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              La precisión está<br />en los detalles.
            </motion.h2>

            <motion.div
              className="space-y-5 text-stone-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                En Marbres Montseny realizamos trabajos de marmolería a medida combinando experiencia, asesoramiento personalizado y cuidado por cada acabado.
              </p>
              <p>
                Desde la elección del material hasta la instalación final, acompañamos cada proyecto para conseguir un resultado limpio, preciso y duradero.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex items-baseline gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="font-serif text-6xl text-graphite-dark">7</span>
              <span className="text-sm tracking-wide text-stone-500 uppercase">años de experiencia</span>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SiteImage
              image={IMAGES.introduccion}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <motion.div
              className="absolute inset-0 bg-graphite-dark"
              initial={{ scaleX: 1 }}
              animate={isVisible ? { scaleX: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'right' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
