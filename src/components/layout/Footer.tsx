import { Github, Linkedin } from 'lucide-react';

const SocialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/andre-lmarinho',
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andre-marinho-3318ab1aa',
    Icon: Linkedin,
  },
];

export const Footer = () => (
  <footer id="footer" className="page-content pt-8 text-sm">
    <div className="flex items-center justify-between py-6 text-zinc-600 dark:text-zinc-400">
      <span>André Marinho © {new Date().getFullYear()}</span>
      <nav aria-label="Online profiles">
        <ul className="flex items-center gap-0">
          {SocialLinks.map(({ href, label, Icon }) => {
            const ext = href.startsWith('mailto:')
              ? {}
              : { target: '_blank', rel: 'noopener noreferrer' };

            return (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  {...ext}
                  className="inline-flex items-center justify-center rounded-xl p-3 text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <Icon aria-hidden className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </footer>
);
