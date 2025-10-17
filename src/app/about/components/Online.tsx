import { SOCIAL_LINKS } from '@/config/social';

const isMail = (href: string) => href.startsWith('mailto:');

export const Online = () => (
  <section id="online">
    <h2>Online</h2>
    <ul className="flex flex-wrap items-center gap-3">
      {SOCIAL_LINKS.map(({ href, label }) => {
        const external = isMail(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
        return (
          <li key={href}>
            <a
              href={href}
              {...external}
              className="flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  </section>
);
