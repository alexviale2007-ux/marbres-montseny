import { useState, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Values from './components/Values';
import Services from './components/Services';
import Materials from './components/Materials';
import ComparisonTable from './components/ComparisonTable';
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

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      <div
        className={`transition-opacity duration-700 ${
          introComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />
        <main>
          <Hero />
          <Introduction />
          <Values />
          <Services />
          <Materials />
          <ComparisonTable />
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
      </div>
    </>
  );
}

export default App;
