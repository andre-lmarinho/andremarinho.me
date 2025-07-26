// src/components/ui/TechItem

import React from 'react';
import placeholder from '@/assets/icons/placeholder.svg';

interface TechItemProps {
  name: string;
  icon: string;
  color: string;
}

export default function TechItem({ name, icon, color }: TechItemProps) {
  return (
    <div className="group relative">
      <div className="glass flex h-14 w-14 cursor-default items-center justify-center rounded-lg border border-gray-400/40 bg-gray-50 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[var(--color-accent-1)] dark:border-gray-600/30 dark:bg-gray-800">
        <img
          src={`https://cdn.simpleicons.org/${icon}/${color}`}
          alt={name}
          className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholder;
          }}
        />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="whitespace-nowrap rounded bg-gray-100/100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-black/70 dark:text-gray-400">
          {name}
        </div>
      </div>
    </div>
  );
}
