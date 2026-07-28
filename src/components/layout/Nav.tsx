"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

export default function Nav() {
  const pathname = usePathname();

  // The breadcrumb is just the URL: /posts/hello-world -> ~ / posts / hello-world,
  // every segment but the last linking to its own level.
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((label, i) => ({
    label,
    href:
      i < segments.length - 1
        ? `/${segments.slice(0, i + 1).join("/")}`
        : undefined,
  }));

  return (
    <header className="site-header fixed top-0 right-0 left-0 z-40 border-b border-transparent bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <nav aria-label="Breadcrumbs" className="font-mono text-sm">
          <ol className="flex items-center">
            <li className="text-accent">
              <Link href="/" className="hover:text-foreground">
                ~
              </Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center">
                <span className="mx-0.5 text-muted" aria-hidden="true">
                  /
                </span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={i === crumbs.length - 1 ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
            <li className="mx-0.5 text-muted" aria-hidden="true">
              /
            </li>
            <li className="ml-1">
              <span
                className="breadcrumb-cursor block h-4 w-2 bg-accent"
                aria-hidden="true"
              />
            </li>
          </ol>
        </nav>
        <nav className="desktop-nav-links flex gap-4 font-mono text-sm">
          <Link
            href="/projects"
            className="text-muted transition-colors hover:text-foreground"
          >
            projects
          </Link>
          <Link
            href="/posts"
            className="text-muted transition-colors hover:text-foreground"
          >
            posts
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
