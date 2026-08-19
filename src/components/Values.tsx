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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              className="group relative p-6 cursor-default"
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Top line */}
              <div className="h-[1px] bg-stone-300 mb-6 origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-50" />
              
              <span className="font-serif text-4xl text-stone-300 transition-colors duration-400 group-hover:text-graphite-dark">
                {value.number}
              </span>

              <h3 className="font-sans text-sm font-medium tracking-wide mt-4 mb-3 text-graphite-dark transition-transform duration-400 group-hover:translate-x-1">
                {value.title}
              </h3>

              <p className="text-sm text-stone-500 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
