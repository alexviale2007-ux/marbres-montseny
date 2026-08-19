import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES, isAwaitingPhoto } from '../data/images';

const categories = ['TODOS', 'COCINAS', 'BAÑOS', 'ESCALERAS', 'RESTAURACIÓN'] as const;

/*
  Los trabajos se declaran en el catálogo central de imágenes, no aquí, para
  que sustituirlos por fotografía real sea una sola edición.
*/
const projects = IMAGES.proyectos;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filteredProjects =
    activeCategory === 'TODOS'
      ? projects
      : projects.filter((p) => p.categoria === activeCategory);

  const isOpen = lightboxIndex !== null;

  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredProjects.length));
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filteredProjects.length) % filteredProjects.length,
    );

  /*
    La vista ampliada se maneja con teclado y bloquea el scroll de fondo.
    Sin esto, la rueda del ratón desplazaba la página por detrás del overlay
    y no había forma de cerrarlo sin apuntar con el ratón.
  */
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, filteredProjects.length]);

  /* Cambiar de categoría con la vista abierta desincronizaría el índice. */
  const selectCategory = (category: string) => {
    setLightboxIndex(null);
    setActiveCategory(category);
  };

  const current = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

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
              onClick={() => selectCategory(cat)}
              aria-pressed={activeCategory === cat}
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
              <motion.button
                key={project.titulo}
                type="button"
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer text-left"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ampliar: ${project.titulo}`}
              >
                <SiteImage
                  image={project.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-graphite-dark/0 group-hover:bg-graphite-dark/40 transition-all duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-marble-white font-serif text-lg">{project.titulo}</p>
                  <p className="text-marble-white/70 text-xs tracking-wider uppercase mt-1">
                    {project.material}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/*
          Aviso de procedencia. El brief prohíbe presentar recursos de diseño
          como obra ejecutada, así que se dice de forma explícita mientras
          queden huecos sin fotografía propia.
        */}
        {projects.some((p) => isAwaitingPhoto(p.image)) && (
          <motion.p
            className="mt-10 max-w-2xl text-xs leading-relaxed text-stone-400"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Algunas piezas de esta galería son imágenes conceptuales de material
            y se sustituirán por fotografías de trabajos propios.
          </motion.p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[200] bg-graphite-dark/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={current.titulo}
          >
            <button
              className="absolute top-6 right-6 text-marble-white/80 hover:text-marble-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>

            {filteredProjects.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-8 text-marble-white/60 hover:text-marble-white transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={36} />
                </button>

                <button
                  className="absolute right-4 md:right-8 text-marble-white/60 hover:text-marble-white transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Siguiente"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              className="relative h-[70vh] w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SiteImage image={current.image} sizes="90vw" fit="contain" priority />
            </motion.div>

            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
              <p className="font-serif text-xl text-marble-white">{current.titulo}</p>
              <p className="mt-1 text-xs tracking-wider text-marble-white/60 uppercase">
                {current.material}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
