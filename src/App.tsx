import React, { Suspense } from 'react';
import { ThemeProvider } from '@/context';
import { Header, Hero, Projects, Footer } from '@/components';

// LazyLoading
const AnimationBG = React.lazy(() => import('@/components/visuals/BGAnimation'));
const CodeText = React.lazy(() => import('@/components/visuals/CodeText'));

function AppContent() {
  return (
    <>
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
