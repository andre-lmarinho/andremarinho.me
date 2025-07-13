//src/hooks/useactiveSection

import { useEffect, useState } from 'react';

export default function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive((entry.target as HTMLElement).id);
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [ids]);

  return active;
}
