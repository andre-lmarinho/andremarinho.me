// src/components/ui/TechItem

import React from 'react';

interface TechItemProps {
  name: string;
  icon: string;
  color: string;
}

export default function TechItem({ name, icon, color }: TechItemProps) {
  return (
    <div className="group relative">
      <div className="w-14 h-14 glass border bg-gray-50 dark:bg-gray-800 rounded-lg border-gray-400/40 dark:border-gray-600/30 hover:border-[var(--color-accent-1)]  transition-all duration-300 hover:scale-110 cursor-default flex items-center justify-center backdrop-blur-sm">
        <img
          src={`https://cdn.simpleicons.org/${icon}/${color}`}
          alt={name}
          className="w-8 h-8 transition-transform group-hover:scale-110 duration-300"
          loading="lazy"
        />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-400 bg-gray-100/100 dark:bg-black/70 px-2 py-1 rounded whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
}
