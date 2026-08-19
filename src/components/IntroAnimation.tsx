import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * FIRMA VISUAL DE ENTRADA DE MARBRES MONTSENY
 * ===========================================
 *
 * No es un preloader: es una pieza de marca de dos segundos y medio que
 * reproduce el gesto del oficio.
 *
 *   OSCURIDAD  →  CORTE DE PRECISIÓN  →  NOMBRE GRABADO  →  PROYECTO
 *
 * Cómo está construida
 * --------------------
 * 1. Arranca en grafito, el color oscuro de la paleta.
 *
 * 2. Una línea de luz de un píxel la recorre. No es un barrido decorativo:
 *    a su paso deja la superficie iluminada mediante un recorte sincronizado
 *    con su posición. Esa es la metáfora del corte del marmolista, y es la
 *    razón de que la línea sea nítida y muy fina en lugar de un degradado
 *    difuso.
 *
 * 3. El nombre se revela por máscara ascendente, con una sombra doble que
 *    imita la incisión de una inscripción. Sin relieve tridimensional, sin
 *    partículas y sin chispas.
 *
 * 4. La superficie se retira y entrega el paso a la portada, que ya está
 *    montada debajo.
 *
 * Por qué no hay una fotografía de piedra
 * ---------------------------------------
 * El brief pedía abrir con una macro de mármol. No existe todavía ninguna
 * fotografía de las losas de la empresa, y las dos alternativas se
 * descartaron tras comprobarlas: una textura generada por filtros de ruido
 * daba un resultado más cercano al estampado animal que al mármol, y los
 * recortes de fotografías de archivo contenían muebles y objetos en lugar de
 * superficie limpia. Una imitación defectuosa del material con el que trabaja
 * la empresa hace más daño que un fondo sobrio.
 *
 * Cuando exista la fotografía, esta secuencia ya está preparada: basta pasar
 * la propiedad `surface` con la imagen y el corte la revelará igual que revela
 * ahora el grafito.
 */

interface IntroAnimationProps {
  onComplete: () => void;
  /**
   * Superficie opcional sobre la que practicar el corte. Sin ella se usa el
   * grafito de la paleta.
   */
  surface?: { src: string; alt: string };
}

/** Marca de visita. Se guarda por sesión, no de forma permanente. */
const SEEN_KEY = 'mm:intro-vista';

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Timeline {
  cutAt: number;
  cutDuration: number;
  nameAt: number;
  exitAt: number;
  exitDuration: number;
}

/** Primera visita en pantalla grande. Total: 2,52 s. */
const FULL: Timeline = {
  cutAt: 320,
  cutDuration: 1080,
  nameAt: 1150,
  exitAt: 2100,
  exitDuration: 420,
};

/** Primera visita en móvil: misma secuencia, más corta. Total: 2,11 s. */
const FULL_MOBILE: Timeline = {
  cutAt: 260,
  cutDuration: 820,
  nameAt: 920,
  exitAt: 1760,
  exitDuration: 350,
};

/** Visitas siguientes: la secuencia se conserva comprimida. Total: 0,95 s. */
const BRIEF: Timeline = {
  cutAt: 100,
  cutDuration: 420,
  nameAt: 250,
  exitAt: 700,
  exitDuration: 250,
};

export default function IntroAnimation({ onComplete, surface }: IntroAnimationProps) {
  const reducedMotion = useReducedMotion();

  // Se resuelve una sola vez: girar el dispositivo a media reproducción no
  // debe cambiar la secuencia en curso.
  const environment = useRef<{ mobile: boolean; brief: boolean } | null>(null);
  if (environment.current === null) {
    const mobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
    let brief = false;
    try {
      brief = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      // Navegación privada o almacenamiento bloqueado: se trata como primera visita.
    }
    environment.current = { mobile, brief };
  }
  const { mobile, brief } = environment.current;
  const timeline = brief ? BRIEF : mobile ? FULL_MOBILE : FULL;

  const [showName, setShowName] = useState(false);
  const [leaving, setLeaving] = useState(false);

  /** Avance del corte, de 0 a 1. Gobierna a la vez la línea y el revelado. */
  const cut = useMotionValue(0);
  const revealClip = useTransform(cut, (v) => `inset(0% ${(1 - v) * 100}% 0% 0%)`);
  const lineLeft = useTransform(cut, (v) => `${v * 100}%`);
  // La línea nace y muere en los extremos para no aparecer de la nada.
  const lineOpacity = useTransform(cut, [0, 0.04, 0.92, 1], [0, 1, 1, 0]);

  useEffect(() => {
    // Se anota la visita al empezar, no al terminar: si se recarga a mitad de
    // la animación, la siguiente vez ya corresponde la versión breve.
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Sin almacenamiento no se puede recordar; no es motivo de fallo.
    }

    if (reducedMotion) {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }

    const controls = animate(cut, 1, {
      duration: timeline.cutDuration / 1000,
      delay: timeline.cutAt / 1000,
      ease: EASE,
    });

    const timers = [
      setTimeout(() => setShowName(true), timeline.nameAt),
      setTimeout(() => setLeaving(true), timeline.exitAt),
      setTimeout(onComplete, timeline.exitAt + timeline.exitDuration),
    ];

    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, [cut, onComplete, reducedMotion, timeline]);

  // --- Variante sin movimiento -------------------------------------------
  // Conserva la identidad y elimina todo recorrido.
  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-graphite-dark"
        aria-hidden="true"
      >
        <Wordmark visible />
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0d0c0b' }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: timeline.exitDuration / 1000, ease: EASE }}
      aria-hidden="true"
    >
      {/* Superficie en penumbra: el punto de partida del corte. */}
      <div className="absolute inset-0">
        {surface ? (
          <img
            src={surface.src}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.34) contrast(0.95) saturate(0.6)' }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #211e1c 0%, #2b2825 42%, #1c1a18 74%, #171514 100%)',
            }}
          />
        )}
      </div>

      {/*
        La misma superficie iluminada, descubierta por el recorte al paso de la
        línea. Así la luz revela en lugar de superponerse.
      */}
      <motion.div className="absolute inset-0" style={{ clipPath: revealClip }}>
        {surface ? (
          <img
            src={surface.src}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(1.05) contrast(1.08)' }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #4a4643 0%, #5c564e 40%, #3d3935 72%, #2d2a28 100%)',
            }}
          />
        )}
      </motion.div>

      {/* Viñeta: concentra la mirada en el centro del encuadre. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 32%, rgba(13,12,11,0.62) 100%)',
        }}
      />

      {/* Línea de corte: fina, nítida y con un halo mínimo. */}
      <motion.div
        className="absolute top-0 bottom-0 z-10 w-px"
        style={{
          left: lineLeft,
          opacity: lineOpacity,
          background:
            'linear-gradient(to bottom, transparent, rgba(253,252,250,0.9) 16%, rgba(253,252,250,1) 50%, rgba(253,252,250,0.9) 84%, transparent)',
          boxShadow:
            '0 0 12px 1px rgba(253,252,250,0.55), 0 0 40px 7px rgba(232,228,223,0.18)',
        }}
      />

      <Wordmark visible={showName} />
    </motion.div>
  );
}

/**
 * Nombre de la marca.
 *
 * Cada línea vive en un contenedor recortado y entra desde abajo: es un
 * revelado de máscara, no un desplazamiento a la vista. La sombra doble
 * simula una incisión, con la luz entrando desde arriba.
 */
function Wordmark({ visible }: { visible: boolean }) {
  return (
    <div className="relative z-20 px-6 text-center">
      {['MARBRES', 'MONTSENY'].map((word, i) => (
        <span key={word} className="block overflow-hidden">
          <motion.span
            className="font-serif block text-[2rem] leading-[1.14] tracking-[0.22em] sm:text-4xl md:text-5xl"
            style={{
              color: '#efece7',
              textShadow:
                '0 1px 0 rgba(255,255,255,0.16), 0 -1px 2px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)',
            }}
            initial={{ y: '112%' }}
            animate={visible ? { y: '0%' } : { y: '112%' }}
            transition={{ duration: 0.7, ease: EASE, delay: visible ? i * 0.1 : 0 }}
          >
            {word}
          </motion.span>
        </span>
      ))}

      <motion.div
        className="mx-auto mt-5 h-px"
        style={{ backgroundColor: '#8a8580' }}
        initial={{ width: 0, opacity: 0 }}
        animate={visible ? { width: 56, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.55, delay: visible ? 0.32 : 0, ease: EASE }}
      />
    </div>
  );
}
