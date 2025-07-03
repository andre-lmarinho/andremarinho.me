import React, { useRef, useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import Navbar from './components/ui/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Stacks from './sections/Stacks';
import CTA from './sections/CTA';
import Footer from './components/Footer';
import AnimationBG from './components/ui/BGAnimation';
import SEO from './components/ui/SEO';

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);

  // Create refs to track About and CTA sections
  const aboutRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);


  return (
    <>
      <SEO
        title="André Marinho · Frontend Developer"
        description="André Marinho’s portfolio — React projects, animations, dark mode, and more."
        url="https://andre-lmarinho.github.io/Home/"
        image="https://andre-lmarinho.github.io/Home/social-preview.png"
      />

      {/* Background */}
      <AnimationBG aboutRef={aboutRef} ctaRef={ctaRef} />

      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Nav Menu */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Section */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />

          {/* About Section with ref */}
          <section ref={aboutRef}>
            <About />
          </section>
          {/* Projects Section */}
          <Projects />

          {/* Stacks Section */}
          <Stacks />

          {/* Final CTA Section with ref */}
          <section ref={ctaRef}>
            <CTA />
          </section>
          
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
