import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import Nav from '../layout/Nav';

export default function Hero() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          <a href="/">André Marinho</a>
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">Front End Developer</h2>
        <p className="mt-4 max-w-xs leading-normal text-color-02">
          I build fast, accessible, and business-driven web experiences.
        </p>
        <Nav />
      </div>
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
        <li className="transition-colors duration-200 transform mr-5 shrink-0 text-xs">
          <a
            href="https://github.com/andre-marinho"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-[var(--text-primary)]"
            aria-label="GitHub profile (opens in a new tab)"
            title="GitHub"
          >
            <label className="sr-only">GitHub</label>
            <Github size={28} />
          </a>
        </li>
        <li className="transition-colors duration-200 transform mr-5 shrink-0 text-xs">
          <a
            href="https://linkedin.com/in/andre-marinho-3318ab1aa"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-[var(--text-primary)]"
            aria-label="LinkedIn profile (opens in a new tab)"
            title="LinkedIn"
          >
            <label className="sr-only">LinkedIn</label>
            <Linkedin size={28} />
          </a>
        </li>
      </ul>
    </>
  );
}
