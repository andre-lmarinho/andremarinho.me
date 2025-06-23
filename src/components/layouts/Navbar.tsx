import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [showNav, setShowNav] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setShowNav(true);
      } else {
        setShowNav(false);
        setMenuOpen(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-transform duration-300 shadow-md ${
        showNav ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold hover:text-primary-500 transition-colors">
          André Marinho
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {['Home', 'About', 'Projects', 'Contact' ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-lg font-medium hover:text-primary-500 transition-colors after:block after:h-[2px] after:w-0 after:bg-primary-500 after:transition-all after:duration-300 after:hover:w-full after:mt-1"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden relative w-8 h-8 focus:outline-none order-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-transform duration-300 origin-center" style={{ transform: menuOpen ? 'translate(-50%, -50%) rotate(45deg)' : 'translate(-50%, -8px)' }}></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-opacity duration-300" style={{ opacity: menuOpen ? 0 : 1, transform: 'translate(-50%, -50%)' }}></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-transform duration-300 origin-center" style={{ transform: menuOpen ? 'translate(-50%, -50%) rotate(-45deg)' : 'translate(-50%, 6px)' }}></div>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative p-3 glass rounded-xl border border-gray-300/30 dark:border-gray-600/30 hover:border-primary-500/50 transition-all duration-300 group hover:scale-110 order-1 md:order-2"
            aria-label="Toggle dark mode"
          >
            {/* Hover effect layer */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 pointer-events-none"></span>
            {/* Moon icon (light mode) */}
            <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300 dark:hidden transition-all duration-300 group-hover:rotate-12" />
            {/* Sun icon (dark mode) */}
            <Sun className="w-5 h-5 text-amber-500 hidden dark:block transition-all duration-300 group-hover:rotate-180" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 w-full bg-white dark:bg-gray-900 text-center shadow-lg py-6 px-4 z-40 border-t border-gray-200 dark:border-gray-700"
          >
            {['Home', 'About', 'Projects', 'Contact' ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-lg font-medium py-2 hover:text-primary-500 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
