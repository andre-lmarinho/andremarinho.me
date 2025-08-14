// src/context/MotionContext.tsx

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence as MotionAnimatePresence } from 'framer-motion';

const AnimatePresence = MotionAnimatePresence as React.FC<{ children: ReactNode }>;

interface MotionContextValue {
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldReduceMotion(query.matches);
    update();
    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  return (
    <MotionContext.Provider value={{ shouldReduceMotion }}>
      <AnimatePresence>{children}</AnimatePresence>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotion must be used within MotionProvider');
  return context;
}
