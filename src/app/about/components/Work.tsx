import Image from 'next/image';

import { cn } from '@/utils/cn';

type WorkRole = {
  title: string;
  startYear: number;
  endYear?: number | 'Now';
};

type WorkPlace = {
  name: string;
  website: string;
  logo: string;
  roles: WorkRole[];
};

const workPlaces: WorkPlace[] = [
  {
    name: 'Duonorth Studio',
    website: '/studio',
    logo: '/images/work/duonorth.webp',
    roles: [
      {
        title: 'Frontend Developer',
        startYear: 2025,
        endYear: 'Now',
      },
      {
        title: 'Web and WordPress Developer',
        startYear: 2020,
        endYear: 2024,
      },
      {
        title: 'Digital Marketing & Web Consultant',
        startYear: 2017,
        endYear: 2019,
      },
    ],
  },
];

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toEndValue = (end: WorkRole['endYear']) => {
  if (end === undefined || end === 'Now') return Number.MAX_SAFE_INTEGER;
  return end;
};

const formatPeriod = (role: WorkRole) => {
  const endLabel = role.endYear ?? 'Now';
  return `${role.startYear} - ${endLabel}`;
};

const workEntries = workPlaces
  .flatMap((place) => place.roles.map((role) => ({ place, role })))
  .sort((a, b) => {
    const endDiff = toEndValue(b.role.endYear) - toEndValue(a.role.endYear);
    if (endDiff !== 0) return endDiff;
    return b.role.startYear - a.role.startYear;
  });

export const Work = () => (
  <section id="work" aria-label="Work">
    <h2>Work</h2>
    <ul className="space-y-2">
      {workEntries.map(({ place, role }, index) => {
        const href = place.website;
        const isExternal = /^https?:\/\//.test(href);
        const entryKey = `${slugify(place.name)}-${slugify(role.title)}-${role.startYear}`;
        const showLogo = index === 0;

        return (
          <li key={entryKey} className="h-full">
            <a
              className="group flex gap-4 rounded-xs transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:focus-visible:outline-zinc-400"
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer noopener' : undefined}
              aria-label={`${role.title} at ${place.name}`}
            >
              <span
                className={cn(
                  'hidden h-12 w-12 shrink-0 items-center justify-center sm:flex',
                  showLogo
                    ? 'overflow-hidden rounded-xl bg-white/90 shadow-sm dark:bg-zinc-900/70'
                    : 'opacity-0'
                )}
                aria-hidden="true"
              >
                {showLogo ? (
                  <Image
                    src={place.logo}
                    alt=""
                    className="h-full w-full object-contain"
                    width={48}
                    height={48}
                    sizes="48px"
                    priority
                  />
                ) : null}
              </span>
              <div className="flex flex-1 gap-3 sm:gap-4">
                <div className="flex flex-1 flex-col">
                  <span className="leading-tight font-medium text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
                    {role.title}
                  </span>
                  <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-500 dark:text-zinc-400 dark:group-hover:text-zinc-500">
                    {place.name}
                  </span>
                </div>
                <span className="ml-auto text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-400">
                  {formatPeriod(role)}
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  </section>
);
