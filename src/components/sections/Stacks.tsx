import React from 'react';
import TechItem from '../ui/TechItem';

// Flat list of tech stacks with icons and brand colors
const techs = [
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4' },
  { name: 'HTML5', icon: 'html5', color: 'E34F26' },
  { name: 'CSS3', icon: 'css', color: '1572B6' },
  { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  { name: 'Bootstrap', icon: 'bootstrap', color: '7952B3' },
  //{ name: 'Node.js', icon: 'nodedotjs', color: '339933' },
  //{ name: 'SQL', icon: 'mysql', color: '4479A1' }
];

export default function Stacks() {
  return (
    <section id="stacks" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
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
