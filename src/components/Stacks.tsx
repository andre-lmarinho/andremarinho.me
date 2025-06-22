import React from 'react';

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
            <div key={name} className="group relative">
              <div className="w-14 h-14 glass border bg-gray-50 dark:bg-gray-800 rounded-lg border-gray-400/40 dark:border-gray-600/30 hover:border-blue-500/60 dark:hover:border-blue-400/50 transition-all duration-300 hover:scale-110 cursor-default flex items-center justify-center backdrop-blur-sm">
                <img
                  src={`https://cdn.simpleicons.org/${icon}/${color}`}
                  alt={name}
                  className="w-8 h-8 transition-transform group-hover:scale-110 duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-400 bg-white/90 dark:bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
