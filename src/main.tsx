// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SEO } from '@/components';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SEO
        title="André Marinho - Front-End Developer"
        description="Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript."
        url="https://andremarinho.me/"
        image="https://github.com/andre-marinho.png"
      />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

