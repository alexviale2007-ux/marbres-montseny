import { Phone, Mail } from 'lucide-react';

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-graphite-dark pt-16 pb-8 px-6">
      <div className="container-narrow mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-marble-white tracking-[0.1em] mb-4">
              MARBRES MONTSENY
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Marmolería a medida en Vilalba Sasserra.<br />
              Encimeras, baños, escaleras y trabajos en piedra natural y compactos.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-4">Navegación</p>
            <nav className="grid grid-cols-2 gap-2">
              {['Inicio', 'Servicios', 'Materiales', 'Proyectos', 'Opiniones', 'Contacto'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-stone-400 hover:text-marble-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-4">Contacto</p>
            <div className="space-y-3">
              <a
                href="tel:+34600419998"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-marble-white transition-colors"
              >
                <Phone size={14} />
                600 41 99 98
              </a>
              <a
                href="mailto:marbresmontseny2015@gmail.com"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-marble-white transition-colors break-all"
              >
                <Mail size={14} className="shrink-0" />
                marbresmontseny2015@gmail.com
              </a>
              <a
                href="https://www.instagram.com/marbresmontseny"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-marble-white transition-colors"
              >
                <InstagramIcon size={14} />
                @marbresmontseny
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            © {currentYear} Marbres Montseny. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
              Política de cookies
            </a>
            <a href="#" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
              Aviso legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
