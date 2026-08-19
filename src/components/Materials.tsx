import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

/*
  Solo se listan los materiales confirmados por la empresa.

  El brief es explícito: otros compactos se incorporan únicamente cuando estén
  confirmados. Añadir una pestaña genérica obligaría a rellenarla con texto
  provisional, y un "a confirmar según disponibilidad" en producción resta más
  credibilidad de la que suma tener una pestaña más.
*/
const materials = [
  {
    id: 'marmol',
    name: 'Mármol Natural',
    description: 'Elegancia, personalidad y vetas únicas. El mármol natural aporta un carácter inimitable a cualquier superficie, con una belleza que solo la naturaleza puede crear.',
    image: IMAGES.materiales.marmol,
    features: ['Vetas únicas', 'Elegancia natural', 'Acabados pulidos', 'Piezas irrepetibles'],
  },
  {
    id: 'granito',
    name: 'Granito',
    description: 'Resistencia y durabilidad para proyectos exigentes. El granito combina una estética sólida con una resistencia excepcional al uso diario.',
    image: IMAGES.materiales.granito,
    features: ['Alta resistencia', 'Durabilidad', 'Bajo mantenimiento', 'Variedad de tonos'],
  },
  {
    id: 'silestone',
    name: 'Silestone / Cuarzo',
    description: 'Una solución contemporánea para superficies de cocina y baño. Uniformidad de color, resistencia a manchas y un mantenimiento mínimo.',
    image: IMAGES.materiales.cuarzo,
    features: ['Superficie no porosa', 'Resistencia a manchas', 'Uniformidad', 'Colores diversos'],
  },
];

export default function Materials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const activeMaterial = materials[activeIndex];

  return (
    <section id="materiales" className="section-padding bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">MATERIALES</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite-dark leading-[1.1]">
            La materia define<br />el resultado.
          </h2>
        </motion.div>

        {/* Material Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {materials.map((material, i) => (
            <button
              key={material.id}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-3 text-sm font-medium tracking-wide transition-all duration-400 border ${
                activeIndex === i
                  ? 'bg-graphite-dark text-marble-white border-graphite-dark'
                  : 'bg-transparent text-stone-600 border-stone-300 hover:border-graphite-dark hover:text-graphite-dark'
              }`}
            >
              {material.name}
            </button>
          ))}
        </motion.div>

        {/* Material Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMaterial.id}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <SiteImage
                  image={activeMaterial.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-graphite-dark mb-5">
                {activeMaterial.name}
              </h3>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                {activeMaterial.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {activeMaterial.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span className="text-sm text-stone-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
