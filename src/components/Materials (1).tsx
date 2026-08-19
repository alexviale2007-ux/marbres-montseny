import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const materials = [
  {
    id: 'marmol',
    name: 'Mármol Natural',
    description: 'Elegancia, personalidad y vetas únicas. El mármol natural aporta un carácter inimitable a cualquier superficie, con una belleza que solo la naturaleza puede crear.',
    image: 'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?auto=format&fit=crop&w=1200&q=80',
    features: ['Vetas únicas', 'Elegancia natural', 'Acabados pulidos', 'Piezas irrepetibles'],
  },
  {
    id: 'granito',
    name: 'Granito',
    description: 'Resistencia y durabilidad para proyectos exigentes. El granito combina una estética sólida con una resistencia excepcional al uso diario.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    features: ['Alta resistencia', 'Durabilidad', 'Bajo mantenimiento', 'Variedad de tonos'],
  },
  {
    id: 'silestone',
    name: 'Silestone / Cuarzo',
    description: 'Una solución contemporánea para superficies de cocina y baño. Uniformidad de color, resistencia a manchas y un mantenimiento mínimo.',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80',
    features: ['Superficie no porosa', 'Resistencia a manchas', 'Uniformidad', 'Colores diversos'],
  },
  {
    id: 'compactos',
    name: 'Otros Compactos',
    description: 'Superficies técnicas de última generación para proyectos que exigen máximas prestaciones. Marcas y opciones a confirmar según disponibilidad.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    features: ['Máxima resistencia', 'Grandes formatos', 'Baja absorción', 'Diseño contemporáneo'],
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
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${activeMaterial.image}')` }}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
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
