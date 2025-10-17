import { SocialLinks } from '../SocialLinks';

export const Footer = () => (
  <footer id="footer" className="mx-auto max-w-4xl px-6 pt-8 text-sm sm:px-4">
    <div className="flex items-center justify-between py-6 text-zinc-600 dark:text-zinc-400">
      <span>André Marinho © {new Date().getFullYear()}</span>

      <nav aria-label="Online profiles">
        <SocialLinks variant="footer" />
      </nav>
    </div>
  </footer>
);
