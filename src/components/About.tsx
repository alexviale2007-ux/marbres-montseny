import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SiteImage
              image={IMAGES.sobreNosotros}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              SOBRE NOSOTROS
            </motion.p>

            <motion.h2
              className="font-serif text-4xl md:text-5xl text-graphite-dark mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Artesanía, precisión<br />y trato cercano.
            </motion.h2>

            <motion.div
              className="space-y-5 text-stone-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                Detrás de cada proyecto hay una conversación, un asesoramiento personalizado y un cuidado constante por el detalle.
              </p>
              <p>
                Trabajamos con atención personalizada, escuchando las necesidades de cada cliente para ofrecer soluciones reales que se adaptan a su espacio y presupuesto.
              </p>
              <p>
                Rapidez, cumplimiento y un acabado impecable son los pilares sobre los que construimos la confianza con nuestros clientes desde hace 7 años.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div>
                <span className="font-serif text-4xl text-graphite-dark">7</span>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">Años de experiencia</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-graphite-dark">100%</span>
                <p className="text-xs text-stone-500 tracking-wider uppercase mt-1">Trabajo a medida</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
