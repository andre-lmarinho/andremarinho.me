import React from 'react';
import { useGradientText } from '../hooks/useGradientText';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  

  return (
    <section className="flex items-center justify-center min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-gray-100 mb-6">
          <span>Developer</span><br />
          <span className="gradient-text">
            Front-End
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
          I turn ideas into innovative web solutions. Building great digital experiences with clean code and modern design.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#projects"
            aria-label="Go to Projects"
            className="main-btn"
          >
            See Portfolio
          </a>
          <a
            href="http://wa.me/557184770061"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp link"
            className="sec-btn"
          >
            Let&apos;s Talk
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com/andre-marinho"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
          >
            <Github size={28} />
          </a>
          <a
            href="https://linkedin.com/in/andré-marinho-3318ab1aa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="mailto:amarinho991@mail.com"
            aria-label="Email address"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:scale-110 transform"
          >
            <Mail size={28} />
          </a>
        </div>

        <div className="animate-bounce">
          <ArrowDown className="mx-auto text-gray-400 dark:text-gray-500" size={32} />
        </div>
      </div>
    </section>
  );
}
