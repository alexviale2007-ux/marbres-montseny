import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const values = [
  { number: '01', title: 'ASESORAMIENTO PERSONALIZADO', description: 'Te ayudamos a elegir el material y la solución que mejor se adapta a tu proyecto.' },
  { number: '02', title: 'ACABADOS DE ALTA CALIDAD', description: 'Cada pieza se fabrica con atención al detalle y precisión artesanal.' },
  { number: '03', title: 'CUMPLIMIENTO DE PLAZOS', description: 'Nos comprometemos con los tiempos para que tu proyecto avance sin contratiempos.' },
  { number: '04', title: 'PRESUPUESTOS A MEDIDA', description: 'Cada proyecto es único. Adaptamos el presupuesto a tus necesidades reales.' },
];

export default function Values() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto">
        {/* Section line animation */}
        <motion.div
          className="h-[1px] bg-stone-300 mb-16"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left' }}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="group relative p-6 cursor-default"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5 }}
            >
              {/* Animated top line */}
              <motion.div
                className="h-[2px] bg-graphite-dark mb-6"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
              
              <motion.span
                className="font-serif text-5xl text-stone-200 block transition-colors duration-500 group-hover:text-graphite-dark"
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.4 }}
              >
                {value.number}
              </motion.span>

              <h3 className="font-sans text-sm font-medium tracking-wide mt-4 mb-3 text-graphite-dark transition-transform duration-400 group-hover:translate-x-2">
                {value.title}
              </h3>

              <p className="text-sm text-stone-500 leading-relaxed transition-opacity duration-400 group-hover:opacity-100 opacity-70">
                {value.description}
              </p>

              {/* Hover indicator */}
              <motion.div
                className="absolute bottom-0 left-6 right-6 h-[1px] bg-stone-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
