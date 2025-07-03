import React, { useRef } from 'react';
import useDarkMode from './hooks/useDarkMode';
import Navbar from './components/layout/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Stacks from './sections/Stacks';
import CTA from './sections/CTA';
import Footer from './components/layout/Footer';
import AnimationBG from './components/visuals/BGAnimation';
import SEO from './components/SEO';

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);

  // Create refs to tracks
  const aboutRef = useRef<HTMLElement>(null);

  return (
    <>
      <SEO
        title="André Marinho · Frontend Developer"
        description="André Marinho’s portfolio — React projects, animations, dark mode, and more."
        url="https://andre-lmarinho.github.io/Home/"
        image="https://andre-lmarinho.github.io/Home/social-preview.png"
      />

      {/* Background */}
      <AnimationBG aboutRef={aboutRef} />

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
          <CTA />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
