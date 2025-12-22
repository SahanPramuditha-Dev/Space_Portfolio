import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SEO from './components/SEO';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

// Ensure React is not duplicated and hooks are used correctly
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const cards = document.getElementsByClassName("glass-card");
        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
        animationFrameId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <SEO />
      <ScrollProgress />
      <ScrollToTop />
      <SmoothScroll />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-primary min-h-screen text-text-muted selection:bg-accent selection:text-primary transition-colors duration-300">
          <CustomCursor />
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
          
          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
