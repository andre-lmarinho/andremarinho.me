import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import imgProjeto from '../assets/images/Portfolio.webp';
import imgTrivia from '../assets/images/Trivia.webp';

// Project Entries
const projects = [
  {
    title: 'Trivia Quiz App',
    description: 'An interactive, themeable trivia quiz app built with React, TypeScript, and Tailwind CSS, fetching real-time questions from the OpenTDB API.',
    img: 'public/assets/images/Trivia.webp',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    repoLink: 'https://github.com/andre-lmarinho/Trivia/',
    stacks: ['React', 'TypeScript','Tailwind CSS']
  },
  {
    title: 'This Portfolio Site',
    description: 'Is this site that you are in to showcase my work.',
    img: 'public/assets/images/Portfolio.webp',
    siteLink: 'https://andre-lmarinho.github.io/Homepage/', 
    repoLink: 'https://github.com/andre-lmarinho/Homepage/',
    stacks: ['React', 'TypeScript','Tailwind CSS']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100">
            My Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map(({ title, description, img, siteLink, repoLink, stacks }) => (
            <div
              key={title}
              className="group glass overflow-hidden boxshadow bg-gray-50 dark:bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-48 object-contain bg-white transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {description}
                </p>
                {/* Stack badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {stacks.map(stack => (
                    <span
                      key={stack}
                      className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                {/* Action buttons */}
                <div className="flex space-x-4">
                    <a
                    href={siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 dark:text-white dark:[&_svg]:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-blue-700 dark:hover:border-blue-500"
                    aria-label="View Demo"
                    >
                    <ExternalLink size={16} className="mr-2" /> Demo
                    </a>
                    <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:text-accent-foreground h-9 rounded-md px-3 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 dark:text-white dark:[&_svg]:text-white dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
                    aria-label="View Code"
                    >
                    <Github size={16} className="mr-2" /> Code
                    </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
