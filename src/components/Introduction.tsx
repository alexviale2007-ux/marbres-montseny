import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}</span>;
}

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
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
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

            {/* Animated line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-stone-400 to-transparent mb-8"
              initial={{ width: 0 }}
              animate={isVisible ? { width: '60%' } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <motion.div
              className="space-y-5 text-stone-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>
                En Marbres Montseny realizamos trabajos de marmolería a medida combinando experiencia, asesoramiento personalizado y cuidado por cada acabado.
              </p>
              <p>
                Desde la elección del material hasta la instalación final, acompañamos cada proyecto para conseguir un resultado limpio, preciso y duradero.
              </p>
            </motion.div>

            {/* Animated counter */}
            <motion.div
              className="mt-10 flex items-baseline gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="font-serif text-7xl text-graphite-dark">
                <AnimatedCounter target={7} duration={1.5} />
              </span>
              <span className="text-sm tracking-wide text-stone-500 uppercase">años de experiencia</span>
            </motion.div>
          </div>

          {/* Image with reveal effect */}
          <motion.div
            className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5]"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80')`,
              }}
              initial={{ scale: 1.3 }}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            {/* Curtain reveal */}
            <motion.div
              className="absolute inset-0 bg-graphite-dark"
              initial={{ scaleY: 1 }}
              animate={isVisible ? { scaleY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'top' }}
            />
            {/* Corner decoration */}
            <motion.div
              className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-marble-white/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
