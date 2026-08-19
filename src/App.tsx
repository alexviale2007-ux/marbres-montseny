import { useCallback, useEffect, useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Values from './components/Values';
import Services from './components/Services';
import Materials from './components/Materials';
import StoneShowroom from './components/StoneShowroom';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import About from './components/About';
import CtaSection from './components/CtaSection';
import Contact from './components/Contact';
import Instagram from './components/Instagram';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  /*
    Durante la intro se bloquea el scroll para que la secuencia no se pueda
    atravesar a mitad de reproducción.

    El contenido de la página sí se monta y se pinta debajo desde el primer
    momento: mantenerlo oculto retrasaría el mayor elemento visible y
    penalizaría tanto la métrica de carga como la indexación.
  */
  useEffect(() => {
    if (introComplete) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [introComplete]);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <Header />
      <main>
        <Hero />
        <Introduction />
        <Values />
        <Services />
        <Materials />
        <StoneShowroom />
        <Projects />
        <Process />
        <Testimonials />
        <About />
        <CtaSection />
        <Contact />
        <Instagram />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
