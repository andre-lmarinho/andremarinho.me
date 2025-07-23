import React from 'react';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="main-section" aria-label="Selected projects">
      <div className="main-section-h2">
        <h2 className="main-h2 isolate">Selected Projects</h2>
      </div>
      <div>
        <ProjectCard />
      </div>
    </section>
  );
}
