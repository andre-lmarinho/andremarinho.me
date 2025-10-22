import Image from 'next/image';

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
      { title: 'Frontend Developer', startYear: 2025, endYear: 'Now' },
      { title: 'Web and WordPress Developer', startYear: 2020, endYear: 2024 },
      { title: 'Digital Marketing & Web Consultant', startYear: 2017, endYear: 2019 },
    ],
  },
];

const NOW = new Date().getFullYear();

const yearsOf = (role: WorkRole) => {
  const end = role.endYear === 'Now' ? NOW : (role.endYear ?? NOW);
  const years: number[] = [];
  for (let y = role.startYear; y <= end; y++) years.push(y);
  return years;
};

const workEntries = workPlaces
  .flatMap((place) => place.roles.map((role) => ({ place, role, years: yearsOf(role) })))
  .sort((a, b) => {
    const endA =
      a.role.endYear === 'Now' || a.role.endYear === undefined
        ? Number.MAX_SAFE_INTEGER
        : a.role.endYear;
    const endB =
      b.role.endYear === 'Now' || b.role.endYear === undefined
        ? Number.MAX_SAFE_INTEGER
        : b.role.endYear;
    return endB - endA || b.role.startYear - a.role.startYear;
  });

export const Work = () => (
  <section id="work" aria-label="Work">
    <h2>Work</h2>

    <ul className="space-y-4">
      {workEntries.map(({ place, role }, i) => {
        const isExternal = /^https?:\/\//.test(place.website);
        const periodLabel = `${role.startYear} - ${role.endYear ?? 'Now'}`;

        return (
          <li
            key={`${place.name}:${role.title}:${role.startYear}`}
            className="flex items-start gap-4"
          >
            <span className="hidden h-12 w-12 sm:inline-flex" aria-hidden="true">
              {i === 0 ? (
                <Image
                  src={place.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  sizes="48px"
                  priority
                />
              ) : null}
            </span>

            <a
              href={place.website}
              {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className="flex flex-1 gap-3 rounded-xs transition-opacity hover:opacity-50"
              aria-label={`${role.title} at ${place.name}`}
            >
              <div className="flex flex-col">
                <h3 className="font-medium">{role.title}</h3>
                <p className="opacity-50">{place.name}</p>
              </div>
              <time className="ml-auto opacity-90">{periodLabel}</time>
            </a>
          </li>
        );
      })}
    </ul>
  </section>
);
