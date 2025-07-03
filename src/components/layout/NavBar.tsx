//src/components/layouts/NavBar

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LetterSwap from '../ui/LetterSwap';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [showNav, setShowNav] = useState(true); // Controls navbar visibility
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu state
  const lastScrollY = useRef(0); // Tracks the previous scroll position

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down → hide navbar and close mobile menu
        setShowNav(false);
        setMenuOpen(false);
      } else {
        // Scrolling up → show navbar
        setShowNav(true);
      }

      // Update last known scroll position
      lastScrollY.current = currentScrollY;
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-2 left-1/2 transform -translate-x-1/2 max-w-5xl w-[90%] z-50 bg-gray-50/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 transition-transform duration-300 shadow-lg rounded-2xl backdrop-blur-md ${
        showNav || menuOpen ? 'translate-y-0' : '-translate-y-[calc(100%+1rem)]'
      }`}
    >
      {/* Navbar content */}
      <div className="flex justify-between items-center px-6 py-4 h-16">
        {/* Logo or site name */}
        <a href="/" className="text-2xl font-bold">
          André Marinho
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6 relative">
            {['Home', 'About', 'Projects'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium py-2 px-4 group z-10"
              >
                <LetterSwap word={item} />
              </a>
            ))}

            {/* Contact button with inverted color */}
            <a
              href="#contact"
              className="text-lg font-medium py-2 px-4 rounded-xl border transition-all duration-300
                bg-gray-900 text-gray-100 dark:bg-gray-50 dark:text-gray-900 group z-10"
            >
              <LetterSwap word="Contact" />
            </a>
          </div>

          {/* Mobile menu toggle (hamburger icon) */}
          <button
            className="md:hidden relative w-8 h-8 focus:outline-none order-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {/* Hamburger lines */}
            <div
              className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-transform duration-300 origin-center"
              style={{
                transform: menuOpen
                  ? 'translate(-50%, -50%) rotate(45deg)'
                  : 'translate(-50%, -8px)',
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-opacity duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-6 h-[2px] bg-current transition-transform duration-300 origin-center"
              style={{
                transform: menuOpen
                  ? 'translate(-50%, -50%) rotate(-45deg)'
                  : 'translate(-50%, 6px)',
              }}
            ></div>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative p-3 glass rounded-xl border border-gray-300/30 dark:border-gray-600/30 hover:border-primary-500/50 transition-all duration-300 group hover:scale-110 order-1 md:order-2"
            aria-label="Toggle dark mode"
          >
            {/* Hover background effect */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 pointer-events-none"></span>

            {/* Light mode icon */}
            <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300 dark:hidden transition-all duration-300 group-hover:rotate-12" />

            {/* Dark mode icon */}
            <Sun className="w-5 h-5 text-amber-500 hidden dark:block transition-all duration-300 group-hover:rotate-180" />
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[calc(4rem+1rem)] left-0 w-full h-[calc(100vh-4rem-1rem)] flex flex-col justify-center items-center gap-8 z-40"
            onClick={() => setMenuOpen(false)}
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-7xl py-4 px-8 rounded-xl dark:bg-gray-50 bg-gray-800 dark:text-gray-900 text-gray-100 group"
                onClick={() => setMenuOpen(false)}
              >
                <LetterSwap word={item} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
