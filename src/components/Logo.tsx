interface LogoProps {
  className?: string;
  variant?: 'engraved' | 'flat' | 'light';
}

/**
 * Marca Marbres Montseny.
 * Gema tallada con la silueta de las montañas del Montseny y cimas nevadas.
 * variant="engraved" -> tallado en piedra (bisel + sombra interior)
 * variant="light"    -> trazo claro, para fondos oscuros
 * variant="flat"     -> trazo oscuro, para fondos claros
 */
export default function Logo({ className = '', variant = 'flat' }: LogoProps) {
  const engraved = variant === 'engraved';
  const light = variant === 'light';

  const stroke = light || engraved ? 'rgba(253,252,250,0.94)' : '#1c1a18';
  const bodyFill = engraved ? 'url(#logoStoneBody)' : light ? 'rgba(253,252,250,0.09)' : 'rgba(28,26,24,0.05)';

  // Cresta montañosa de punta izquierda a punta derecha
  const ridge =
    'M 22 198 L 72 130 L 100 160 L 150 70 L 180 104 L 214 58 L 252 132 L 288 102 L 322 150 L 378 198';
  // Cuerpo de la gema: cresta + laterales hasta la punta inferior
  const gemBody = `${ridge} L 200 372 L 22 198 Z`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Marbres Montseny"
    >
      <defs>
        <linearGradient id="logoStoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#514c48" />
          <stop offset="42%" stopColor="#2f2c29" />
          <stop offset="100%" stopColor="#151312" />
        </linearGradient>

        <linearGradient id="logoSnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(253,252,250,0.97)" />
          <stop offset="100%" stopColor="rgba(253,252,250,0.3)" />
        </linearGradient>

        {/* Talla en piedra: sombra proyectada dentro + luz en el borde superior */}
        <filter id="logoEngrave" x="-30%" y="-30%" width="160%" height="160%">
          <feOffset in="SourceAlpha" dx="0" dy="2.5" result="oDark" />
          <feGaussianBlur in="oDark" stdDeviation="2.5" result="bDark" />
          <feFlood floodColor="#000000" floodOpacity="0.7" result="cDark" />
          <feComposite in="cDark" in2="bDark" operator="in" result="shDark" />

          <feOffset in="SourceAlpha" dx="0" dy="-2" result="oLight" />
          <feGaussianBlur in="oLight" stdDeviation="1.8" result="bLight" />
          <feFlood floodColor="#ffffff" floodOpacity="0.42" result="cLight" />
          <feComposite in="cLight" in2="bLight" operator="in" result="shLight" />

          <feMerge>
            <feMergeNode in="shDark" />
            <feMergeNode in="shLight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={engraved ? 'url(#logoEngrave)' : undefined}>
        {/* Cuerpo de la gema */}
        <path d={gemBody} fill={bodyFill} stroke={stroke} strokeWidth="8" strokeLinejoin="round" />

        {/* Cimas nevadas */}
        <g fill="url(#logoSnow)" stroke="none" opacity={light || engraved ? 1 : 0.6}>
          <path d="M 214 58 L 252 132 L 231 141 L 200 76 Z" />
          <path d="M 150 70 L 180 104 L 163 113 L 140 84 Z" />
          <path d="M 72 130 L 100 160 L 87 168 L 62 143 Z" />
          <path d="M 288 102 L 322 150 L 307 157 L 277 113 Z" />
        </g>

        {/* Facetas talladas */}
        <g stroke={stroke} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 86 244 L 200 372 L 314 244" />
          <path d="M 200 186 L 200 372" />
        </g>
      </g>
    </svg>
  );
}
