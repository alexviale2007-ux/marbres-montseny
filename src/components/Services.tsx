import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    number: '01',
    title: 'Encimeras de cocina',
    description: 'Encimeras fabricadas a medida para adaptarse al espacio, al diseño y a las necesidades de cada cocina.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '02',
    title: 'Baños',
    description: 'Encimeras, lavabos y soluciones en piedra para crear baños funcionales y elegantes.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '03',
    title: 'Escaleras y peldaños',
    description: 'Fabricación, instalación y reparación de escaleras y peldaños de mármol y piedra.',
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?auto=format&fit=crop&w=800&q=80',
  },
  {
    number: '04',
    title: 'Reparación y restauración',
    description: 'Recuperamos superficies deterioradas, piezas rotas y mármoles antiguos mediante reparación, pulido y restauración.',
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=800&q=80',
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
          <motion.div
            className="h-[1px] bg-gradient-to-r from-stone-400 to-transparent mt-6"
            initial={{ width: 0 }}
            animate={isVisible ? { width: '30%' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              initial={{ opacity: 0, y: 40, rotateX: -5 }}
              animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Image with zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${service.image}')` }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-dark/90 via-graphite-dark/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Moving shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-marble-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="eyebrow text-marble-white/50 mb-2 transition-transform duration-400 group-hover:translate-x-2">
                  {service.number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-marble-white mb-2 transition-transform duration-500 group-hover:translate-y-[-8px]">
                  {service.title}
                </h3>
                <p className="text-marble-white/70 text-sm max-w-xs opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {service.description}
                </p>
              </div>

              {/* Arrow icon */}
              <div className="absolute top-6 right-6 w-10 h-10 border border-marble-white/0 group-hover:border-marble-white/40 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight
                  size={18}
                  className="text-marble-white/0 transition-all duration-500 group-hover:text-marble-white/90"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
