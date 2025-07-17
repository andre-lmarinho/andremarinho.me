import React, { Suspense } from 'react';
import { ThemeProvider, useTheme } from '@/context';
import { NavBar, Hero, About, Projects, Footer, SEO } from '@/components';

// LazyLoading
const AnimationBG = React.lazy(() => import('@/components/visuals/BGAnimation'));
const FogAnimation = React.lazy(() => import('@/components/visuals/FogAnimation'));
const CodeText = React.lazy(() => import('@/components/visuals/CodeText'));

function AppContent() {
  return (
    <>
      <SEO
        title="André Marinho"
        description="André Marinho’s portfolio."
        url="https://andremarinho.vercel.app/"
        image=""
      />

      {/* Nav Menu */}
      <NavBar />

      {/* Main */}
      <div className="mx-auto z-50 min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Header Section */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
            <Hero />
          </header>

          {/* Main Section */}
          <main id="main" className="pt-24 lg:w-[52%] lg:py-24">
            <About />

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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
