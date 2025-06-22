import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Stacks from './components/Stacks';
import Footer from './components/Footer';
import AnimationBG from './components/AnimationBG'
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
