import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

function InstagramIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

/*
  No es el feed real de la cuenta: leerlo exige credenciales de servidor y
  esta web es estática. Son recursos de marca que enlazan al perfil, y el
  encabezado evita dar a entender que sean las últimas publicaciones.
*/
const tiles = IMAGES.instagram;

export default function Instagram() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 bg-marble-ivory" ref={ref}>
      <div className="container-narrow mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://www.instagram.com/marbresmontseny"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-graphite-dark hover:text-stone-600 transition-colors"
          >
            <InstagramIcon size={20} />
            <span className="text-sm font-medium tracking-wide">@marbresmontseny</span>
          </a>
          <p className="text-stone-500 text-sm mt-2">
            Síguenos para ver trabajos en curso
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.alt}
              href="https://www.instagram.com/marbresmontseny"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
            >
              <SiteImage
                image={tile}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-graphite-dark/0 group-hover:bg-graphite-dark/30 transition-all duration-300 flex items-center justify-center">
                <InstagramIcon size={24} className="text-marble-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
