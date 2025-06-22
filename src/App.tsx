import React, { useState, useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Stacks from './components/sections/Stacks';
import Footer from './components/layouts/Footer';
import AnimationBG from './components/layouts/AnimationBG';
import SEO from './components/ui/SEO'
//import MatrixBackground from './components/AnimationBGMatrix'

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

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
        url="https://andre-lmarinho.github.io/Homepage/"
        image="https://andre-lmarinho.github.io/Homepage/social-preview.png"/>

      {/* Background */}
      <AnimationBG />

      <div className="relative z-20 flex flex-col min-h-screen">
      {/* Menu */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* Main */}
      <main className="flex-grow">
        <Hero />
        <Projects />
        <About />
        <Stacks />
      </main>
      {/* Footer */}
      <Footer />
      </div>
    </>
  );
}
