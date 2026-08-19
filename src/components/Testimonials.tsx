import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    text: 'Super recomendable. Manuel te aconseja muy bien desde el principio, atención muy profesional, rápido y cumplidor con los tiempos. Las juntas prácticamente se ven. Hemos quedado súper contentos con el resultado.',
    author: 'Noelia Gomez',
  },
  {
    text: 'Repetiria sin lugar a dudas, gran profesional, rápido y cuida el mínimo detalle para que quede estupendo.',
    author: 'Mónica',
  },
  {
    text: 'Molt professionals i detallistes. Ens han instal·lat el marbre de la cuina i el resultat ha quedat espectacular.',
    author: 'Marc Medina Molero',
  },
  {
    text: 'Ràpis, professionals i molt amables.',
    author: 'Alba Rubio',
  },
  {
    text: 'Muy buen trabajo y además en muy poco tiempo. Detalles y acabados perfectos, se nota la profesionalidad.',
    author: 'Andrea Giros',
  },
  {
    text: 'Muy aconsejable si queréis poner encimera para cocina, baño… mucha variedad de marcas de todo tipo. Trato personalizado y cercano.',
    author: 'Estefania Bonete',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="opiniones" className="section-padding" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">OPINIONES</p>
          <h2 className="font-serif text-4xl md:text-5xl text-graphite-dark">
            Lo que dicen nuestros clientes.
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Big quote mark */}
          <motion.div
            className="text-8xl font-serif text-stone-200 leading-none mb-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            "
          </motion.div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
              >
                <Star size={16} className="text-stone-400 fill-stone-400" />
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="relative min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-graphite-dark leading-relaxed italic mb-6">
                  "{testimonials[current].text}"
                </p>
                <motion.p
                  className="text-sm font-medium text-stone-500 tracking-wide uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  — {testimonials[current].author}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="p-3 text-stone-400 hover:text-graphite-dark transition-colors hover:scale-110 transform duration-200"
              aria-label="Anterior opinión"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Progress dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === current ? 'w-8 bg-graphite-dark' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Opinión ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 text-stone-400 hover:text-graphite-dark transition-colors hover:scale-110 transform duration-200"
              aria-label="Siguiente opinión"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#"
              className="text-sm text-stone-500 underline underline-offset-4 hover:text-graphite-dark transition-colors"
            >
              Ver más opiniones en Google
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
