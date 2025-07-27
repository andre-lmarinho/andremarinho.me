import React, { Suspense } from 'react';
import { ThemeProvider } from '@/context';
import { Header, Hero, Projects, Footer } from '@/components';

// LazyLoading
const AnimationBG = React.lazy(() => import('@/components/visuals/BGAnimation'));
const FogAnimation = React.lazy(() => import('@/components/visuals/FogAnimation'));
const CodeText = React.lazy(() => import('@/components/visuals/CodeText'));

function AppContent() {
  return (
    <>
      <a href="#main" className="sr-only">
        Skip to main content
      </a>
      <Header />

      <main id="main" className="m-[0_auto] max-w-4xl px-6 sm:px-4">
        <Hero />
        <Projects />
      </main>
      <Footer />

      {/* Background and Animations*/}
      <Suspense fallback={null}>
        <div>
          <AnimationBG />
          <FogAnimation />
          <CodeText />
        </div>
      </Suspense>
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
