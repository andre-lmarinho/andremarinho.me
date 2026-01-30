import Link from "next/link";

import { NAV_LINKS } from "@/components/Layout/NavigationMenu/links";

export default function NotFound() {
  return (
    <section id="404">
      <h1>Are you lost?</h1>
      <p className="text-muted mt-6 text-xl font-medium tracking-tight">
        The page you are looking for doesn&apos;t exist.
      </p>
      <h2 className="inline-block pb-6 text-lg">Here are some helpful links instead:</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 px-4 text-lg">
        {NAV_LINKS.all.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...("target" in link && { target: link.target, rel: "noopener noreferrer" })}
              className="underline underline-offset-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg font-extrabold">Error code: 404</p>
    </section>
  );
}
