import React from 'react';
import TechItem from '../ui/TechItem';
import { techs } from '../../data/techs';

export default function Stacks() {
  return (
    <section id="Stacks" className="main-section" aria-label="Tech stacks">
      <div className="main-section-h2">
        <h2 className="main-h2 isolate">Tech Stacks</h2>
      </div>
      <div className="flex justify-center flex-wrap gap-8">
        {techs.map(({ name, icon, color }) => (
          <TechItem key={name} name={name} icon={icon} color={color} />
        ))}
      </div>
    </section>
  );
}
