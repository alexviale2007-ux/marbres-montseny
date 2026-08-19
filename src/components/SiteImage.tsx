import { unsplashUrl, type SiteImage as SiteImageData } from '../data/images';

/** Anchos ofrecidos al navegador en el atributo srcset. */
const WIDTHS = [480, 768, 1080, 1440, 1920] as const;

interface SiteImageProps {
  image: SiteImageData;
  /**
   * Tamaño de presentación previsto. Permite al navegador elegir la variante
   * adecuada del srcset antes de conocer la maquetación.
   */
  sizes?: string;
  /**
   * Marca la imagen como crítica para el primer pintado. Desactiva la carga
   * diferida y eleva su prioridad de descarga.
   */
  priority?: boolean;
  /** Clases extra sobre el elemento visual, para hover o escala. */
  className?: string;
  /** Encaje: `cover` recorta para llenar, `contain` muestra la pieza entera. */
  fit?: 'cover' | 'contain';
}

/**
 * Renderiza un hueco del catálogo de imágenes.
 *
 * Rellena su contenedor, que debe tener `position: relative`.
 *
 * Según el origen declarado en `data/images.ts` pinta o una fotografía real,
 * con srcset, texto alternativo y carga diferida, o un panel de marca cuando
 * el hueco aún espera fotografía de la empresa.
 */
export default function SiteImage({
  image,
  sizes = '100vw',
  priority = false,
  className = '',
  fit = 'cover',
}: SiteImageProps) {
  const { source, alt } = image;

  if (source.kind === 'pending') {
    return <PendingPanel alt={alt} label={source.label} tone={source.tone} />;
  }

  const src = source.kind === 'local' ? source.src : unsplashUrl(source, 1440);

  // Solo las imágenes remotas admiten redimensionado por parámetro; una
  // fotografía propia se sirve como un único archivo.
  const srcSet =
    source.kind === 'unsplash'
      ? WIDTHS.map((w) => `${unsplashUrl(source, w)} ${w}w`).join(', ')
      : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`absolute inset-0 h-full w-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  );
}

/**
 * Hueco a la espera de fotografía.
 *
 * Se resuelve con lenguaje de marca —grafito, filete fino, versalitas
 * espaciadas— en lugar de con una textura que imite un material. Un panel
 * sobrio y rotulado se lee como una decisión de diseño; una imitación de
 * mármol se lee como un descuido, y además afirmaría tener una pieza que la
 * empresa todavía no ha fotografiado.
 */
function PendingPanel({
  alt,
  label,
  tone,
}: {
  alt: string;
  label: string;
  tone: 'light' | 'dark';
}) {
  const palette =
    tone === 'dark'
      ? { bg: 'bg-graphite-dark', rule: 'border-marble-white/10', text: 'text-marble-white/35' }
      : { bg: 'bg-marble-beige', rule: 'border-graphite-dark/10', text: 'text-stone-500' };

  return (
    <div role="img" aria-label={alt} className={`absolute inset-0 ${palette.bg}`}>
      {/* Filete interior: encuadra el hueco como una pieza medida. */}
      <div className={`absolute inset-4 border ${palette.rule}`} />

      {label && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <span
            className={`text-center text-[0.62rem] leading-relaxed font-medium tracking-[0.18em] uppercase ${palette.text}`}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
