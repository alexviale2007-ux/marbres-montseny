import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['TODOS', 'COCINAS', 'BAÑOS', 'ESCALERAS', 'RESTAURACIÓN'];

const projects = [
  { id: 1, category: 'COCINAS', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80', title: 'Encimera cocina contemporánea', material: 'Piedra natural' },
  { id: 2, category: 'BAÑOS', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80', title: 'Lavabo integrado', material: 'Mármol blanco' },
  { id: 3, category: 'COCINAS', image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=900&q=80', title: 'Isla de cocina', material: 'Silestone' },
  { id: 4, category: 'ESCALERAS', image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?auto=format&fit=crop&w=900&q=80', title: 'Escalera interior', material: 'Mármol' },
  { id: 5, category: 'BAÑOS', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80', title: 'Encimera de baño', material: 'Granito' },
  { id: 6, category: 'RESTAURACIÓN', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=900&q=80', title: 'Restauración de superficie', material: 'Mármol clásico' },
  { id: 7, category: 'COCINAS', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80', title: 'Cocina minimalista', material: 'Cuarzo compacto' },
  { id: 8, category: 'BAÑOS', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80', title: 'Baño de diseño', material: 'Piedra natural' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filteredProjects = activeCategory === 'TODOS'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
    }
  };
  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  return (
    <section id="proyectos" className="section-padding" ref={ref}>
      <div className="container-wide mx-auto px-6 lg:px-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">PROYECTOS</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite-dark leading-[1.1]">
            El resultado habla<br />por nosotros.
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium tracking-wider px-4 py-2 transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-graphite-dark text-marble-white border-graphite-dark'
                  : 'text-stone-500 border-stone-300 hover:border-graphite-dark hover:text-graphite-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => openLightbox(i)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-graphite-dark/0 group-hover:bg-graphite-dark/40 transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-marble-white font-serif text-lg">{project.title}</p>
                  <p className="text-marble-white/70 text-xs tracking-wider uppercase mt-1">{project.material}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] bg-graphite-dark/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-marble-white/80 hover:text-marble-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-4 md:left-8 text-marble-white/60 hover:text-marble-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Anterior"
            >
              <ChevronLeft size={36} />
            </button>

            <button
              className="absolute right-4 md:right-8 text-marble-white/60 hover:text-marble-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Siguiente"
            >
              <ChevronRight size={36} />
            </button>

            <motion.img
              key={lightboxIndex}
              src={filteredProjects[lightboxIndex].image}
              alt={filteredProjects[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
