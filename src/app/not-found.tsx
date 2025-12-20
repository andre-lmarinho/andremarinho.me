import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/studio', label: 'Studio' },
  { href: '/about', label: 'About' },
];

export default function NotFound() {
  return (
    <section id="404">
      <h1>Are you lost?</h1>
      <p className="text-muted mt-6 text-xl font-medium tracking-tight">
        The page you are looking for doesn&apos;t exist.
      </p>
      <h2 className="inline-block pb-6 text-lg">Here are some helpful links instead:</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 px-4 text-lg">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="underline underline-offset-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg font-extrabold">Error code: 404</p>
    </section>
  );
}
