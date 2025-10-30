import Image from 'next/image';

type WorkRole = {
  title: string;
  period: string;
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
      { title: 'Frontend Developer', period: '2025 - Now' },
      { title: 'Web and WordPress Developer', period: '2020 - 2024' },
      { title: 'Digital Marketing & Web Consultant', period: '2017 - 2019' },
    ],
  },
];

const workEntries = workPlaces.flatMap((place) => place.roles.map((role) => ({ place, role })));

export const Work = () => (
  <section id="work" aria-label="Work">
    <h2>Work</h2>

    <ul className="space-y-4">
      {workEntries.map(({ place, role }, i) => {
        const isExternal = /^https?:\/\//.test(place.website);

        return (
          <li key={`${place.name}:${role.title}:${role.period}`} className="flex items-start gap-4">
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
                <p className="text-muted opacity-50">{place.name}</p>
              </div>
              <time className="ml-auto opacity-90">{role.period}</time>
            </a>
          </li>
        );
      })}
    </ul>
  </section>
);
