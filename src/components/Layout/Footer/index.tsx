import { GithubIcon } from '@/components/icons/GithubIcon';
import { LinkedinIcon } from '@/components/icons/LinkedinIcon';

import { socialLinks } from '@/configs/social-links';
import { cn } from '@/utils/cn';

const linkClassName = cn(
  'inline-flex items-center justify-center rounded-xl p-3 text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-zinc-400 dark:hover:text-zinc-100'
);

export const Footer = () => {
  const [githubLink, linkedinLink] = socialLinks;

  return (
    <footer id="footer" className="page-content pt-8 text-sm">
      <div className="text-muted flex items-center justify-between py-6">
        <span>André Marinho © {new Date().getFullYear()}</span>
        <nav aria-label="Online profiles">
          <ul className="flex items-center gap-0">
            <li>
              <a
                href={githubLink.href}
                aria-label={githubLink.label}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                <GithubIcon />
                <span className="sr-only">{githubLink.label}</span>
              </a>
            </li>
            <li>
              <a
                href={linkedinLink.href}
                aria-label={linkedinLink.label}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                <LinkedinIcon />
                <span className="sr-only">{linkedinLink.label}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
