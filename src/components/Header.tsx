import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Materiales', href: '#materiales' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-marble-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a href="#inicio" className="relative z-10 flex items-center gap-3">
              <Logo
                variant={scrolled ? 'flat' : 'light'}
                className="w-8 h-8 lg:w-9 lg:h-9 shrink-0 transition-opacity duration-500"
              />
              <span
                className={`font-serif text-lg lg:text-2xl tracking-[0.15em] transition-colors duration-500 ${
                  scrolled ? 'text-graphite-dark' : 'text-marble-white'
                }`}
              >
                MARBRES MONTSENY
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                    scrolled ? 'text-graphite' : 'text-marble-white/90'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className={`btn-primary text-xs py-3 px-5 ${
                  scrolled ? '' : '!bg-marble-white/10 !backdrop-blur-sm !border !border-marble-white/30'
                }`}
              >
                Pedir presupuesto
              </a>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="tel:+34600419998"
                className={`p-2 transition-colors duration-300 ${
                  scrolled ? 'text-graphite' : 'text-marble-white'
                }`}
                aria-label="Llamar"
              >
                <Phone size={20} />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  scrolled ? 'text-graphite' : 'text-marble-white'
                }`}
                aria-label="Menú"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-graphite-dark flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-marble-white/90 tracking-wide hover:text-marble-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+34600419998"
                className="mt-6 btn-secondary !border-marble-white/30 !text-marble-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={16} />
                600 41 99 98
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
