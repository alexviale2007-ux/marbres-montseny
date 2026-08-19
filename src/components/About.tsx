import { motion } from 'framer-motion';
import { useScrollAnimation } from '..hooksuseScrollAnimation';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    section className=section-padding bg-marble-ivory ref={ref}
      div className=container-narrow mx-auto
        div className=grid lggrid-cols-2 gap-12 lggap-20 items-center
          { Image }
          motion.div
            className=relative aspect-[34] overflow-hidden order-2 lgorder-1
            initial={{ opacity 0, x -20 }}
            animate={isVisible  { opacity 1, x 0 }  {}}
            transition={{ duration 0.7, delay 0.2 }}
          
            div
              className=absolute inset-0 bg-cover bg-center
              style={{
                backgroundImage `url('httpsimages.unsplash.comphoto-1600607687644-c7171b42498fauto=format&fit=crop&w=800&q=80')`,
              }}
            
          motion.div

          { Text }
          div className=order-1 lgorder-2
            motion.p
              className=eyebrow mb-6
              initial={{ opacity 0, y 15 }}
              animate={isVisible  { opacity 1, y 0 }  {}}
              transition={{ duration 0.5 }}
            
              SOBRE NOSOTROS
            motion.p

            motion.h2
              className=font-serif text-4xl mdtext-5xl text-graphite-dark mb-8 leading-[1.1]
              initial={{ opacity 0, y 20 }}
              animate={isVisible  { opacity 1, y 0 }  {}}
              transition={{ duration 0.6, delay 0.1 }}
            
              Artesanía, precisiónbr y trato cercano.
            motion.h2

            motion.div
              className=space-y-5 text-stone-600 text-lg leading-relaxed
              initial={{ opacity 0, y 20 }}
              animate={isVisible  { opacity 1, y 0 }  {}}
              transition={{ duration 0.6, delay 0.2 }}
            
              p
                Detrás de cada proyecto hay una conversación, un asesoramiento personalizado y un cuidado constante por el detalle.
              p
              p
                Trabajamos con atención personalizada, escuchando las necesidades de cada cliente para ofrecer soluciones reales que se adaptan a su espacio y presupuesto.
              p
              p
                Rapidez, cumplimiento y un acabado impecable son los pilares sobre los que construimos la confianza con nuestros clientes desde hace 7 años.
              p
            motion.div

            motion.div
              className=mt-10 grid grid-cols-2 gap-6
              initial={{ opacity 0, y 15 }}
              animate={isVisible  { opacity 1, y 0 }  {}}
              transition={{ duration 0.5, delay 0.3 }}
            
              div
                span className=font-serif text-4xl text-graphite-dark7span
                p className=text-xs text-stone-500 tracking-wider uppercase mt-1Años de experienciap
              div
              div
                span className=font-serif text-4xl text-graphite-dark100%span
                p className=text-xs text-stone-500 tracking-wider uppercase mt-1Trabajo a medidap
              div
            motion.div
          div
        div
      div
    section
  );
}
