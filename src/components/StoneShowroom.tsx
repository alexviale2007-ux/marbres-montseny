import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SiteImage from './SiteImage';
import { IMAGES } from '../data/images';

/**
 * LA PIEDRA DE CERCA
 * ==================
 *
 * Traslada a la pantalla el gesto de un showroom: acercar un foco a una
 * superficie para ver cómo responde el material.
 *
 * La superficie se pinta dos veces. Debajo, en penumbra. Encima, la misma
 * imagen iluminada y recortada por una máscara radial que sigue al puntero:
 * donde apunta el visitante se revelan el veteado y el grano, y el resto
 * permanece en sombra.
 *
 * El seguimiento pasa por un muelle en lugar de asignarse directamente. Esa
 * inercia mínima es lo que separa un foco que acompaña al gesto de un recuadro
 * pegado al cursor.
 *
 * En pantallas sin puntero el recorrido lo gobierna el scroll, de modo que el
 * material también se explora en móvil.
 */
export default function StoneShowroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [hasPointer, setHasPointer] = useState(true);

  useEffect(() => {
    // `hover: hover` distingue un puntero real de una pantalla táctil con más
    // fiabilidad que medir el ancho de la ventana.
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasPointer(query.matches);
    const onChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  /** Posición del foco, en porcentaje sobre la superficie. */
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const spring = { stiffness: 110, damping: 22, mass: 0.4 };
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);

  // Recorrido por scroll para pantallas táctiles: la franja visible de la
  // sección se traduce en un barrido del foco.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scrollX = useTransform(scrollYProgress, [0, 1], [20, 80]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [36, 64]);

  const activeX = hasPointer ? smoothX : scrollX;
  const activeY = hasPointer ? smoothY : scrollY;

  /* El borde de la máscara se difumina en varias paradas para que la luz caiga
     sobre la superficie en lugar de recortarla con un canto duro. */
  const mask = useMotionTemplate`radial-gradient(circle 18rem at ${activeX}% ${activeY}%, #000 0%, rgba(0,0,0,0.74) 36%, rgba(0,0,0,0.3) 60%, transparent 78%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!hasPointer || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const handlePointerLeave = () => {
    if (!hasPointer) return;
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-graphite-dark py-24 md:py-32"
    >
      <div className="container-narrow px-6">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow mb-4">MATERIAL</p>
          <h2 className="font-serif text-3xl text-marble-white md:text-4xl lg:text-5xl">
            La piedra, de cerca.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-stone-300 md:text-base">
            Ninguna pieza es igual a otra. El veteado, el grano y el tono cambian
            de losa a losa, y esa variación es la que decide el resultado final
            de una encimera.
          </p>
        </div>

        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]"
          style={{ cursor: hasPointer && !reducedMotion ? 'crosshair' : 'default' }}
        >
          {/* Superficie en penumbra */}
          <div className="absolute inset-0" style={{ filter: 'brightness(0.4) contrast(0.95)' }}>
            <SiteImage image={IMAGES.superficieInteractiva} sizes="100vw" />
          </div>

          {/*
            Superficie iluminada. Con movimiento reducido se ilumina entera a
            media intensidad en lugar de seguir al puntero.
          */}
          {reducedMotion ? (
            <div
              className="absolute inset-0 opacity-80"
              style={{ filter: 'brightness(1.05) contrast(1.08)' }}
            >
              <SiteImage image={IMAGES.superficieInteractiva} sizes="100vw" />
            </div>
          ) : (
            <motion.div
              className="absolute inset-0"
              style={{
                filter: 'brightness(1.08) contrast(1.1)',
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            >
              <SiteImage image={IMAGES.superficieInteractiva} sizes="100vw" />
            </motion.div>
          )}

          {/* Filete perimetral: encuadra la superficie como una pieza cortada. */}
          <div className="pointer-events-none absolute inset-0 border border-stone-100/10" />

          <p className="pointer-events-none absolute right-4 bottom-4 text-[0.65rem] tracking-[0.14em] text-marble-white/45 uppercase">
            {reducedMotion
              ? 'Mármol natural'
              : hasPointer
                ? 'Mueve el cursor sobre la superficie'
                : 'Desplázate para recorrer la superficie'}
          </p>
        </div>
      </div>
    </section>
  );
}
