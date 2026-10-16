import { useCallback, useMemo, useState } from 'react';
import { ContactIntentContext } from './context/ContactIntent.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  const [intent, setIntent] = useState({ service: '', nonce: 0 });
  const requestService = useCallback((service) => setIntent((prev) => ({ service, nonce: prev.nonce + 1 })), []);
  const contactIntent = useMemo(() => ({ intent, requestService }), [intent, requestService]);

  return (
    <ContactIntentContext.Provider value={contactIntent}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Process />
        <Work />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ContactIntentContext.Provider>
  );
}
