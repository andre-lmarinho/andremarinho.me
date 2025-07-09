import React, { Suspense } from 'react';
import { useDarkMode } from '@/hooks';
import Navbar from './components/layout/NavBar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Stacks from './components/sections/Stacks';
import Footer from './components/layout/Footer';
import SEO from './components/SEO';

// LazyLoading
const AnimationBG = React.lazy(() => import('@/components/visuals/BGAnimation'));
const FogAnimation = React.lazy(() => import('@/components/visuals/FogAnimation'));
const CodeText = React.lazy(() => import('@/components/visuals/CodeText'));

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode(false);

  return (
    <>
      <SEO
        title="André Marinho"
        description="André Marinho’s portfolio."
        url="https://andre-lmarinho.github.io/Home/"
        image="https://andre-lmarinho.github.io/Home/social-preview.png"
      />

      {/* Nav Menu */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main */}
      <div className="mx-auto z-50 min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Header Section */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
            <Hero />
          </header>

          {/* Main Section */}
          <main className="pt-24 lg:w-[52%] lg:py-24">
            <About />
            <Stacks />
            <Projects />
            <Footer />
          </main>

          {/* Background e Animations*/}
          <Suspense fallback={null}>
            <AnimationBG />
            <FogAnimation />
            <CodeText />
          </Suspense>
        </div>
      </div>
    </>
  );
}
