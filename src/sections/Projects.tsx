import React from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import TriviaShowcase from './TriviaShowcase';

export default function Projects() {
  return (
    <>
      <section
        id="projects"
        className="py-20 container-ultra-narrow transition-colors duration-500"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((p) =>
              p.title === 'Trivia Quiz App' ? (
                <ProjectCard key={p.title} {...p}>
                  <TriviaShowcase />
                </ProjectCard>
              ) : (
                <ProjectCard key={p.title} {...p} />
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
