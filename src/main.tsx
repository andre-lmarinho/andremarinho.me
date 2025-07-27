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
        title="André Marinho - Front End Developer"
        description="André Marinho’s portfolio."
        url="https://andremarinho.vercel.app/"
        image=""
      />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
