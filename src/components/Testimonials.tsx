import { useState } from 'react';
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
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-stone-400 fill-stone-400" />
            ))}
          </div>

          {/* Testimonial */}
          <div className="relative min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-graphite-dark leading-relaxed italic mb-6">
                  "{testimonials[current].text}"
                </p>
                <p className="text-sm font-medium text-stone-500 tracking-wide uppercase">
                  — {testimonials[current].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="p-2 text-stone-400 hover:text-graphite-dark transition-colors"
              aria-label="Anterior opinión"
            >
              <ChevronLeft size={24} />
            </button>

            <span className="text-xs text-stone-400 tracking-wider">
              {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>

            <button
              onClick={next}
              className="p-2 text-stone-400 hover:text-graphite-dark transition-colors"
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
