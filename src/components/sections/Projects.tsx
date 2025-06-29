import React from 'react';
import ProjectCard from '../ui/ProjectCard';
import imgProjeto from '/assets/images/Portfolio.webp';
import imgTrivia from '/assets/images/Trivia.webp';

// Project Entries
const projects = [
  {
    title: 'Trivia Quiz App',
    description: 'An interactive, themeable trivia quiz app built with React, TypeScript, and Tailwind CSS, fetching real-time questions from the OpenTDB API.',
    img: imgTrivia,
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    repoLink: 'https://github.com/andre-lmarinho/Trivia/',
    stacks: ['React', 'TypeScript','Tailwind CSS']
  },
  {
    title: 'This Portfolio Site',
    description: 'Is this site that you are in to showcase my work.',
    img: imgProjeto,
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
          {projects.map(project => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
