import { Github, Linkedin, Mail } from 'lucide-react';
import { contactLinks } from '@/data';

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

const Footer = () => (
  <footer id="footer" className="mx-auto max-w-4xl px-6 pt-8 text-sm sm:px-4">
    <div className="flex items-center justify-between py-6 text-zinc-600 dark:text-zinc-400">
      <span>André Marinho © {new Date().getFullYear()}</span>

      <nav aria-label="Online profiles">
        <ul className="flex items-center">
          {contactLinks.map(({ href, label, ariaLabel, icon }) => {
            const Icon = ICONS[icon as keyof typeof ICONS];
            const external = href.startsWith('http');

            return (
              <li key={href}>
                <a
                  href={href}
                  aria-label={ariaLabel}
                  title={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="p-3 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
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

export default Footer;
