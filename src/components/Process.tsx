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
            {/* Line */}
            <motion.div
              className="absolute top-6 left-0 right-0 h-[1px] bg-stone-300"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
            />

            <div className="grid grid-cols-6 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative pt-14"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
                >
                  {/* Dot */}
                  <div className="absolute top-4 left-0 w-4 h-4 rounded-full border-2 border-stone-400 bg-marble-ivory" />
                  
                  <span className="text-xs text-stone-400 tracking-wider">{step.number}</span>
                  <h4 className="font-sans text-sm font-medium text-graphite-dark mt-2 mb-2 tracking-wide">
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
          <div className="relative pl-8">
            {/* Vertical Line */}
            <motion.div
              className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-stone-300"
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, x: -15 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                >
                  {/* Dot */}
                  <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-stone-400 bg-marble-ivory" />
                  
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
