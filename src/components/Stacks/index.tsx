import React from 'react';
import TechItem from '../ui/TechItem';
import { techs } from '../../data/techs';

export default function Stacks() {
  return (
    <section id="stacks" className="py-20 transition-colors duration-500">
      <div className="container-ultra-narrow text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-gray-100">
            Tech Stacks
          </h2>
        </div>
        <div className="flex justify-center flex-wrap gap-8">
          {techs.map(({ name, icon, color }) => (
            <TechItem key={name} name={name} icon={icon} color={color} />
          ))}
        </div>
      </div>
    </section>
  );
}
