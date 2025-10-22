const SocialLinks = [
  { label: 'GitHub', href: 'https://github.com/andre-lmarinho' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andre-marinho-3318ab1aa' },
  { label: 'Email', href: 'mailto:hey@andremarinho.me' },
];

export const Online = () => (
  <section id="online">
    <h2>Online</h2>
    <ul className="flex flex-wrap items-center gap-3">
      {SocialLinks.map(({ href, label }) => (
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
  </section>
);
