import React, { useState } from 'react';
import useDarkMode from './hooks/useDarkMode';
import Navbar from './components/ui/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Stacks from './sections/Stacks';
import CTA from './sections/CTA';
import Footer from './components/Footer';
import AnimationBG from './components/ui/BGAnimation';
import SEO from './components/ui/SEO'
//import MatrixBackground from './components/AnimationBGMatrix'

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);
  const [showCenterOrb, setShowCenterOrb] = useState(true);

  return (
    <>
      <SEO
        title="André Marinho · Frontend Developer"
        description="André Marinho’s portfolio — React projects, animations, dark mode, and more."
        url="https://andre-lmarinho.github.io/Home/"
        image="https://andre-lmarinho.github.io/Home/social-preview.png"/>

      {/* Background */}
      <AnimationBG showCenterOrb={showCenterOrb} />

      <div className="relative z-20 flex flex-col min-h-screen">
      {/* Nav Menu */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Main Section */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        {/* Projects Section */}
        <Projects />
        {/* About Section */}
        <About setShowCenterOrb={setShowCenterOrb} />

        {/* Stacks Section */}
        <Stacks />
        {/* Final CTA Section */}
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
      </div>
    </>
  );
}
