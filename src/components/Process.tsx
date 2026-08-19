import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  { number: '01', title: 'CONTACTO', description: 'Primera conversación para conocer el proyecto y necesidades.' },
  { number: '02', title: 'MEDICIÓN', description: 'Visita y toma de medidas.' },
  { number: '03', title: 'MATERIAL', description: 'Asesoramiento para elegir la solución adecuada.' },
  { number: '04', title: 'PRESUPUESTO', description: 'Presentación de opciones y presupuesto.' },
  { number: '05', title: 'FABRICACIÓN', description: 'Preparación de la pieza a medida.' },
  { number: '06', title: 'INSTALACIÓN', description: 'Colocación y revisión final.' },
];

export default function Process() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">PROCESO</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite-dark leading-[1.1]">
            Del primer contacto<br />al último detalle.
          </h2>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Animated Line */}
            <motion.div
              className="absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-graphite-dark via-stone-400 to-stone-300"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
            />

            <div className="grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative pt-14 group cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.5 }}
                >
                  {/* Animated Dot */}
                  <motion.div
                    className="absolute top-3 left-0 w-6 h-6 rounded-full border-2 border-graphite-dark bg-marble-ivory flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.6, type: 'spring', stiffness: 300 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-graphite-dark"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.div>
                  
                  <span className="text-xs text-stone-400 tracking-wider">{step.number}</span>
                  <h4 className="font-sans text-sm font-medium text-graphite-dark mt-2 mb-2 tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            {/* Vertical Line */}
            <motion.div
              className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-graphite-dark to-stone-300"
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
                >
                  {/* Dot */}
                  <motion.div
                    className="absolute -left-10 top-1 w-6 h-6 rounded-full border-2 border-graphite-dark bg-marble-ivory flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.5, type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-graphite-dark" />
                  </motion.div>
                  
                  <span className="text-xs text-stone-400 tracking-wider">{step.number}</span>
                  <h4 className="font-sans text-sm font-medium text-graphite-dark mt-1 mb-1 tracking-wide">
                    {step.title}
                  </h4>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
