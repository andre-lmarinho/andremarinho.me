import React, { Suspense } from 'react';
import { ThemeProvider } from '@/context';
import { Header, Hero, Projects, Work, Footer } from '@/components';

// LazyLoading
const AnimationBG = React.lazy(() => import('@/components/visuals/BGAnimation'));
const CodeText = React.lazy(() => import('@/components/visuals/CodeText'));

function AppContent() {
  return (
    <>
      <a href="#main" className="sr-only focus:block">
        Skip to main content
      </a>
      <Header />

      <main id="main" className="mx-auto max-w-4xl px-6 sm:px-4">
        <Hero />
        <Projects />
        <Work />
      </main>
      <Footer />

      {/* Background and Animations*/}
      <Suspense fallback={null}>
        <div>
          <AnimationBG />
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
