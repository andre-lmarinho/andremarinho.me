import React, { useState, useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Stacks from './components/sections/Stacks';
import CTA from './components/sections/CTA';
import Footer from './components/layouts/Footer';
import AnimationBG from './components/layouts/AnimationBG';
import SEO from './components/ui/SEO'
//import MatrixBackground from './components/AnimationBGMatrix'

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showCenterOrb, setShowCenterOrb] = useState(true);

  // When change darkMode, add or remove a class on <html>
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (darkMode) {html.classList.add('dark'); body.classList.add('dark');}
    else {html.classList.remove('dark'); body.classList.remove('dark');}
  }, [darkMode]);

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
