import Links from '../components/layout/NavigationMenu/Links';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page not found',
  description: "The page you were trying to reach doesn't exist.",
};

export default function NotFound() {
  return (
    <section id="404">
      <h1>Are you lost?</h1>
      <p className="text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <h2 className="text-lg">Here are some helpful links instead:</h2>
      <ul className="list-inside list-disc px-4 text-lg underline underline-offset-2">
        <Links
          links={[
            { text: 'Home', href: '/' },
            { text: 'Studio', href: '/studio' },
            { text: 'About', href: '/about' },
          ]}
        />
      </ul>
      <p className="text-lg font-extrabold">Error code: 404</p>
    </section>
  );
}
