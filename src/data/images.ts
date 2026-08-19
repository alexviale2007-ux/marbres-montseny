/**
 * PUNTO ÚNICO DE SUSTITUCIÓN DE IMÁGENES
 * ======================================
 *
 * Toda la imaginería de la web se declara aquí. Ningún componente incrusta
 * una URL directamente.
 *
 * CÓMO SUSTITUIR POR FOTOGRAFÍAS DE MARBRES MONTSENY
 * --------------------------------------------------
 * 1. Copia la foto en `public/img/` (por ejemplo `public/img/cocina-01.jpg`).
 * 2. Localiza el hueco correspondiente más abajo.
 * 3. Cambia su origen por `local('/img/cocina-01.jpg')`.
 * 4. Reescribe el `alt` describiendo el trabajo real.
 * No hay que tocar ningún componente.
 *
 * DOS REGLAS QUE EXPLICAN LAS DECISIONES DE ESTE ARCHIVO
 * -----------------------------------------------------
 * 1. Cada fotografía está verificada visualmente: se ha comprobado que
 *    muestra lo que dice su etiqueta, que es una vivienda real de tamaño
 *    normal y que no parece un render. El material heredado incluía un
 *    dormitorio como portada de una marmolería y un sofá etiquetado como
 *    escalera de piedra; nada se da por bueno sin mirarlo.
 *
 * 2. Un hueco sin fotografía real se declara `pending` y se dibuja como un
 *    panel de marca con su rótulo. No se rellena con una imagen de archivo
 *    que afirme algo falso, ni con una textura sintética que imite un
 *    material. El brief lo pide (§12) y además es lo que evita que un
 *    visitante confunda un recurso de diseño con una obra ejecutada.
 */

/** Fotografía de archivo alojada en Unsplash. */
interface UnsplashSource {
  kind: 'unsplash';
  /** Identificador del recurso, sin el prefijo del dominio. */
  id: string;
  /**
   * Encuadre por punto focal, para acercarse a una zona concreta.
   * `x` e `y` son proporciones de 0 a 1; `z` es el factor de acercamiento.
   */
  focus?: { x: number; y: number; z: number };
}

/** Fotografía propia servida desde `public/`. */
interface LocalSource {
  kind: 'local';
  src: string;
}

/** Hueco a la espera de fotografía real de la empresa. */
interface PendingSource {
  kind: 'pending';
  /** Rótulo visible. Deja claro qué falta. */
  label: string;
  /** Claro para secciones en piedra clara, oscuro para franjas en grafito. */
  tone: 'light' | 'dark';
}

export type ImageSource = UnsplashSource | LocalSource | PendingSource;

export interface SiteImage {
  /** Texto alternativo. Describe la imagen; no la decora. */
  alt: string;
  source: ImageSource;
}

/** Construye la URL de Unsplash para un ancho dado. */
export function unsplashUrl(source: UnsplashSource, width: number): string {
  const base = `https://images.unsplash.com/photo-${source.id}`;
  const params = [`auto=format`, `w=${width}`, `q=78`];

  if (source.focus) {
    // El servicio de imágenes recorta alrededor del punto focal indicado.
    params.push(
      'crop=focalpoint',
      'fit=crop',
      `fp-x=${source.focus.x}`,
      `fp-y=${source.focus.y}`,
      `fp-z=${source.focus.z}`,
    );
  } else {
    params.push('fit=crop');
  }

  return `${base}?${params.join('&')}`;
}

/** ¿Este hueco sigue esperando una fotografía real de la empresa? */
export function isAwaitingPhoto(image: SiteImage): boolean {
  return image.source.kind === 'pending';
}

// ---------------------------------------------------------------------------
// CONSTRUCTORES
// ---------------------------------------------------------------------------

function photo(alt: string, source: UnsplashSource | LocalSource): SiteImage {
  return { alt, source };
}

function pending(alt: string, label: string, tone: 'light' | 'dark' = 'light'): SiteImage {
  return { alt, source: { kind: 'pending', label, tone } };
}

// ---------------------------------------------------------------------------
// FOTOGRAFÍAS VERIFICADAS
// ---------------------------------------------------------------------------

/**
 * Cocina contemporánea con isla de piedra, suelo de madera y luz de lucernario.
 * Vivienda de tamaño normal, sin arquitectura imposible. Es la mejor pieza
 * disponible y sostiene la portada.
 */
const COCINA_ISLA: UnsplashSource = {
  kind: 'unsplash',
  id: '1600585152220-90363fe7e115',
};

/**
 * Cocina con encimera de cuarzo y frontal de mármol veteado a juego.
 * Es la única fotografía del conjunto donde el veteado de la piedra se
 * distingue con claridad, así que se reserva para hablar del material.
 */
const COCINA_CUARZO: UnsplashSource = {
  kind: 'unsplash',
  id: '1588854337236-6889d631faa8',
};

/**
 * Encuadre corto sobre el frontal de mármol de la cocina anterior.
 *
 * El punto focal está muy a la derecha y alto a propósito: más al centro
 * entra el canto oscuro de un mueble y más abajo aparece una tabla de cortar
 * de madera. Este encuadre deja el veteado casi limpio.
 */
const MARMOL_DETALLE: UnsplashSource = {
  kind: 'unsplash',
  id: '1588854337236-6889d631faa8',
  focus: { x: 0.9, y: 0.2, z: 4.5 },
};

/**
 * Encuadre aún más cerrado del mismo frontal, para la sección interactiva.
 *
 * Esa sección usa una proporción muy panorámica, y al recortar en vertical
 * deja ver más extensión horizontal. Necesita por tanto más acercamiento que
 * el detalle de la sección de materiales para no arrastrar el mueble contiguo.
 */
const MARMOL_SUPERFICIE: UnsplashSource = {
  kind: 'unsplash',
  id: '1588854337236-6889d631faa8',
  focus: { x: 0.93, y: 0.22, z: 6.5 },
};

/** Baño claro con lavabo sobre encimera y luz natural lateral. */
const BANO_CLARO: UnsplashSource = {
  kind: 'unsplash',
  id: '1620626011761-996317b8d101',
};

/** Baño contemporáneo en tonos oscuros con encimera continua. */
const BANO_OSCURO: UnsplashSource = {
  kind: 'unsplash',
  id: '1600566752355-35792bedcfea',
};

// ---------------------------------------------------------------------------
// CATÁLOGO
// ---------------------------------------------------------------------------

export const IMAGES = {
  /** Portada. Es el mayor elemento visible de la página: se carga sin diferir. */
  hero: photo(
    'Cocina contemporánea con isla de piedra natural y luz natural',
    COCINA_ISLA,
  ),

  /** Acompaña al bloque de presentación. */
  introduccion: photo(
    'Encimera de cuarzo y frontal de mármol veteado en una cocina moderna',
    COCINA_CUARZO,
  ),

  /**
   * Superficie de la sección interactiva.
   *
   * El brief pedía una macro de losa. No se dispone de ninguna, así que la
   * interacción de luz se aplica sobre el detalle del frontal de mármol, que
   * sí es piedra real y sí muestra veteado.
   */
  superficieInteractiva: photo(
    'Detalle del veteado de un frontal de mármol',
    MARMOL_SUPERFICIE,
  ),

  sobreNosotros: pending(
    'Espacio reservado para una fotografía del taller',
    'Pendiente: fotografía del taller',
  ),

  /** Franja oscura de llamada a la acción. */
  ctaFondo: pending(
    'Espacio reservado para un detalle de mármol oscuro',
    '',
    'dark',
  ),

  servicios: {
    cocinas: photo('Encimera de cocina en piedra natural', COCINA_ISLA),
    banos: photo('Encimera de baño con lavabo', BANO_CLARO),
    escaleras: pending(
      'Espacio reservado para una fotografía de peldaños de piedra',
      'Pendiente: fotografía de obra',
    ),
    restauracion: pending(
      'Espacio reservado para una fotografía de restauración',
      'Pendiente: fotografía de obra',
    ),
  },

  materiales: {
    /* El frontal veteado es lo más cercano a una macro de mármol disponible. */
    marmol: photo('Frontal de mármol natural con veteado gris', MARMOL_DETALLE),
    granito: pending(
      'Espacio reservado para una macro de granito',
      'Pendiente: macro de granito',
    ),
    cuarzo: photo('Encimera de cuarzo compacto en cocina', COCINA_ISLA),
  },

  /**
   * Galería de trabajos.
   *
   * Solo se publica lo que se puede mostrar de verdad. Los huecos a la espera
   * de fotografía quedan rotulados para que nunca se lean como obra ejecutada.
   */
  proyectos: [
    {
      categoria: 'COCINAS',
      titulo: 'Encimera de cocina en isla',
      material: 'Piedra natural',
      image: photo('Isla de cocina con encimera de piedra de canto recto', COCINA_ISLA),
    },
    {
      categoria: 'COCINAS',
      titulo: 'Encimera y frontal a juego',
      material: 'Cuarzo compacto',
      image: photo(
        'Cocina con encimera de cuarzo y frontal de mármol a juego',
        COCINA_CUARZO,
      ),
    },
    {
      categoria: 'BAÑOS',
      titulo: 'Encimera de baño con lavabo',
      material: 'Piedra natural',
      image: photo(
        'Baño claro con encimera de piedra y lavabo sobre superficie',
        BANO_CLARO,
      ),
    },
    {
      categoria: 'BAÑOS',
      titulo: 'Encimera continua en baño',
      material: 'Piedra natural',
      image: photo(
        'Baño contemporáneo oscuro con encimera de piedra continua',
        BANO_OSCURO,
      ),
    },
    {
      categoria: 'ESCALERAS',
      titulo: 'Peldaños de escalera interior',
      material: 'Mármol',
      image: pending(
        'Espacio reservado para una fotografía de peldaños',
        'Pendiente de fotografía',
      ),
    },
    {
      categoria: 'RESTAURACIÓN',
      titulo: 'Pulido y restauración de superficie',
      material: 'Mármol',
      image: pending(
        'Espacio reservado para una fotografía de restauración',
        'Pendiente de fotografía',
      ),
    },
  ],

  /**
   * Mosaico de Instagram.
   *
   * No es el feed real: leerlo exige credenciales de servidor y esta web es
   * estática. Son piezas que enlazan al perfil.
   */
  instagram: [
    photo('Cocina con isla de piedra natural', COCINA_ISLA),
    photo('Encimera de cuarzo y frontal de mármol', COCINA_CUARZO),
    photo('Baño con encimera de piedra', BANO_CLARO),
    photo('Baño contemporáneo con encimera continua', BANO_OSCURO),
  ],
};

/** Ancho de la portada, compartido con la precarga declarada en index.html. */
export const HERO_WIDTH = 1920;

/** URL de la portada, para `<link rel="preload">`. */
export const heroPreloadUrl =
  IMAGES.hero.source.kind === 'unsplash'
    ? unsplashUrl(IMAGES.hero.source, HERO_WIDTH)
    : null;
