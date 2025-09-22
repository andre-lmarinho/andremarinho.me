import { buildPageMetadata } from '@/config/seo';

import MenuLinks from '@/componentes/MenuLinks';

const title = '404 – Page not found';
const description = "The page you were trying to reach doesn't exist.";

export const metadata = buildPageMetadata({
  title,
  description,
  canonical: null,
  noindex: true,
});

export default function NotFound() {
  return (
    <section id="404">
      <h1>Are you lost?</h1>
      <p className="text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <h2 className="text-lg">Here are some helpful links instead:</h2>
      <MenuLinks variant="notFound" />
      <p className="text-lg font-extrabold">Error code: 404</p>
    </section>
  );
}
