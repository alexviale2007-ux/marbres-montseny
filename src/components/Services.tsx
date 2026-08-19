import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

const services = [
  {
    number: '01',
    title: 'Encimeras de cocina',
    description: 'Encimeras fabricadas a medida para adaptarse al espacio, al diseño y a las necesidades de cada cocina.',
    image: IMAGES.servicios.cocinas,
  },
  {
    number: '02',
    title: 'Baños',
    description: 'Encimeras, lavabos y soluciones en piedra para crear baños funcionales y elegantes.',
    image: IMAGES.servicios.banos,
  },
  {
    number: '03',
    title: 'Escaleras y peldaños',
    description: 'Fabricación, instalación y reparación de escaleras y peldaños de mármol y piedra.',
    image: IMAGES.servicios.escaleras,
  },
  {
    number: '04',
    title: 'Reparación y restauración',
    description: 'Recuperamos superficies deterioradas, piezas rotas y mármoles antiguos mediante reparación, pulido y restauración.',
    image: IMAGES.servicios.restauracion,
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="servicios" className="section-padding" ref={ref}>
      <div className="container-narrow mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-4">SERVICIOS</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-graphite-dark leading-[1.1]">
            Trabajos pensados<br />para cada espacio.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
            >
              {/* Image */}
              <SiteImage
                image={service.image}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/80 via-graphite-dark/20 to-transparent transition-opacity duration-500 group-hover:from-graphite-dark/90" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="eyebrow text-marble-white/50 mb-2">
                  {service.number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-marble-white mb-2 transition-transform duration-400 group-hover:translate-y-[-4px]">
                  {service.title}
                </h3>
                <p className="text-marble-white/70 text-sm max-w-xs opacity-0 translate-y-4 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                  {service.description}
                </p>
                <ArrowUpRight
                  size={20}
                  className="absolute top-8 right-8 text-marble-white/0 transition-all duration-400 group-hover:text-marble-white/80"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
