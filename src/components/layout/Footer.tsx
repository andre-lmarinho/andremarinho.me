import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/social';

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

const isMail = (href: string) => href.startsWith('mailto:');

export const Footer = () => (
  <footer id="footer" className="mx-auto max-w-4xl px-6 pt-8 text-sm sm:px-4">
    <div className="flex items-center justify-between py-6 text-zinc-600 dark:text-zinc-400">
      <span>André Marinho © {new Date().getFullYear()}</span>
      <nav aria-label="Online profiles">
        <ul className="flex items-center gap-0">
          {SOCIAL_LINKS.map(({ href, label, icon }) => {
            const Icon = icon ? ICONS[icon] : undefined;
            const external = isMail(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };
            return (
              <li key={href}>
                <a
                  href={href}
                  title={label}
                  {...external}
                  className="inline-flex items-center justify-center rounded-xl p-3 text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {Icon ? (
                    <>
                      <Icon aria-hidden className="h-5 w-5" />
                      <span className="sr-only">{label}</span>
                    </>
                  ) : (
                    <span className="text-sm font-medium">{label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </footer>
);
