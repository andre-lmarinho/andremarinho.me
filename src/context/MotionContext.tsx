// src/context/MotionContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

interface MotionContextValue {
  shouldReduceMotion: boolean;
}

const MotionContext = createContext<MotionContextValue | undefined>(undefined);

const TypedAnimatePresence = AnimatePresence as React.FC<{ children: React.ReactNode }>;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldReduceMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <MotionContext.Provider value={{ shouldReduceMotion }}>
      <TypedAnimatePresence>{children}</TypedAnimatePresence>
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotion must be used within MotionProvider');
  return context;
}
