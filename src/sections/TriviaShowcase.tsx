import React, { useState } from 'react';
import './TriviaShowcase.css';
import { FaFlask, FaLandmark, FaFutbol, FaMusic, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function TriviaShowcase() {
  const [activeTheme, setActiveTheme] = useState('theme-default');
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  const currentTheme = hoveredTheme ?? activeTheme;

  const themes = [
    { name: 'Default', theme: 'theme-default' },
    { name: 'Night', theme: 'theme-night' },
    { name: 'Matrix', theme: 'theme-matrix' },
  ];

  const topics = [
    { icon: <FaFlask />, style: { top: '-20%', left: '-5%' } },
    { icon: <FaLandmark />, style: { top: '30%', left: '10%' } },
    { icon: <FaFutbol />, style: { top: '0%', left: '55%' } },
    { icon: <FaMusic />, style: { top: '70%', left: '0%' } },
    { icon: <FaFilm />, style: { top: '-10%', left: '80%' } },
  ];

  return (
    <div className="group overflow-visible glass transition-transform duration-300 hover:scale-105">
      <div className="relative items-center">
        {/* Floating Elements */}
        <div className="relative w-full h-full p-8 ">
          <div>
            {topics.map((topic, i) => (
              <motion.div
                key={i}
                className="absolute p-2 rounded-full text-xl pointer-events-none bg-gradient-to-r from-blue-600 to-purple-600 text-gray-50"
                style={{
                  ...topic.style,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ y: [0, -3, 0], x: [0, 3, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.2,
                }}
              >
                {topic.icon}
              </motion.div>
            ))}
          </div>
          {/* Interactive Card */}
          <div className="flex text-center pointer-events-none items-center justify-center">
            <div
              className={`p-6 bg-[var(--content-bg)] rounded-lg shadow-lg transition-all 
              duration-500 ${currentTheme}`}
            >
              <div className="mx-auto max-w-md text-center">
                <p className="select-none text-[12px] font-bold text-[var(--title-color)] mb-4">
                  Welcome to Trivia!
                </p>
                <span
                  className="select-none text-[8px] bg-[var(--accent-color)] text-[var(--bt-text-color)] 
                py-2 px-3 rounded inline-block"
                >
                  Start Quiz
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2">
          {themes.map((t) => (
            <div
              key={t.name}
              className={`w-full text-[12px] h-8 rounded-lg cursor-pointer theme-button ${t.theme}`}
              onMouseEnter={() => setHoveredTheme(t.theme)}
              onMouseLeave={() => setHoveredTheme(null)}
              onClick={() => setActiveTheme(t.theme)}
            >
              <span className="w-full px-2 h-full flex items-center justify-center font-medium">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
