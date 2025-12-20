import type { WorkStoryMetadata } from '@/app/work/shared/types';

export const ProjectLinks = ({ links }: { links?: WorkStoryMetadata['links'] }) => {
  if (!links?.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center gap-3">
      {links.map(({ href, label }) => (
        <li key={href}>
          <a
            href={href}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex items-center justify-center rounded-lg border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
};
