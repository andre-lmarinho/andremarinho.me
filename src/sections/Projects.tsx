import React from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import TriviaShowcase from './TriviaShowcase'

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
          {projects.map(p =>
            p.title === 'Trivia Quiz App' ? (
              <ProjectCard key={p.title} {...p}>
                <TriviaShowcase {...p} />
              </ProjectCard>
            ) : (
              <ProjectCard key={p.title} {...p} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
