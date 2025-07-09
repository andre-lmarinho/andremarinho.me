import React from 'react';
import { useActiveSection } from '@/hooks';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
];

export default function ProjectCard() {
  const active = useActiveSection(navItems.map((item) => item.id));

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {navItems.map(({ id, label }) => {
          const isActive = active === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center py-3"
              >
                <span
                  className={`nav-indicator mr-4 h-px transition-all motion-reduce:transition-none
                    ${isActive ? 'w-16 bg-[var(--text-primary)]' : 'w-8 bg-[var(--text-muted)]'}
                    group-hover:w-16 group-hover:bg-[var(--text-primary)]
                    group-focus-visible:w-16 group-focus-visible:bg-[var(--text-primary)]`}
                />
                <span
                  className={`nav-text text-xs font-bold uppercase tracking-widest
                    ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}
                    group-hover:text-[var(--text-primary)]
                    group-focus-visible:text-[var(--text-primary)]`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
