import React, { useState } from 'react';
import { projects } from '../../data/projects';
import './TriviaShowcase.css';
import { FaFlask, FaLandmark, FaFutbol, FaMusic, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function TriviaShowcase() {
  const triviaProject = projects.find(p => p.title === 'Trivia Quiz App');
  if (!triviaProject) return null;

  const [activeTheme,  setActiveTheme ]  = useState('theme-default');
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);


  const currentTheme = hoveredTheme ?? activeTheme;

  const themes = [
    { name: 'Default', theme: 'theme-default' },
    { name: 'Night',    theme: 'theme-night'   },
    { name: 'Matrix',   theme: 'theme-matrix'  },
  ];

const topics = [
  { icon: <FaFlask />,    style: { top: '0%', left: '0%' } },
  { icon: <FaLandmark />, style: { top: '10%', right: '15%' } },
  { icon: <FaFutbol />,   style: { bottom: '30%', left: '5%' } },
  { icon: <FaMusic />,    style: { bottom: '10%', left: '0%' } },
  { icon: <FaFilm />,     style: { top: '0%', right: '50%' } },
];

return (
  <div className="group p-6 glass overflow-hidden bg-gray-50 dark:bg-gray-800 transition-transform duration-300 hover:scale-105">
    <div className="items-center">

      {/* PRIMEIRA CÉLULA DO GRID */}
      <div className="relative w-full h-full">
        <div>
        {/* ÍCONES */}
        {topics.map((topic, i) => (
            <motion.div
            key={i}
            className="absolute p-2 rounded-full text-xl pointer-events-none
            bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            style={{
                ...topic.style,
                transform: 'translate(-50%, -50%)',
            }}
            animate={{ y: [0, -3, 0], x: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', delay: i * 0.2 }}
            >
            {topic.icon}
            </motion.div>
        ))}
        </div>
        {/* CONTAINER FLEX PARA CENTRALIZAR O CARD */}
        <div className="items-center justify-center">
          <div className={`p-16 bg-[var(--content-bg)] rounded-lg shadow-lg transition-all duration-500 ${currentTheme}`}>
            <div className="mx-auto max-w-md text-center">
              <p className="text-[24px] font-bold text-[var(--title-color)] mb-4">
                Welcome to Trivia!
              </p>
              <span className="text-[8px] bg-[var(--accent-color)] text-[var(--bt-text-color)] py-2 px-3 rounded">
                Start Quiz
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEGUNDA CÉLULA - PAINEL DE TEMAS */}
      <div className="space-y-2">
        {themes.map(t => (
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
