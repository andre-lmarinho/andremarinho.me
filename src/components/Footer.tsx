import React from 'react';
import { ArrowRight, Info } from 'lucide-react';

export default function FooterCTA() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Call-to-Action Section */}
      <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-20 transition-colors duration-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Liked what you saw?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            These are just a few projects I’ve built. Let’s talk about how I can help with yours.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="#contact"
              className="inline-flex items-center font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white dark:text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Contact me"
            >
              Let&apos;s Talk
              <ArrowRight size={16} className="ml-2" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center font-medium dark:text-gray-400 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              aria-label="Learn more about me"
            >
              About Me
              <Info size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 transition-colors duration-500">
        <div className="container mx-auto px-6 text-center">
          © {year} André Marinho
        </div>
      </footer>
    </>
  );
}
