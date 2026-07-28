"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/ui/TransitionLink";
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
        <nav aria-label="Breadcrumbs" className="text-sm">
          <ol className="flex items-center">
            <li className="text-accent">
              <TransitionLink href="/" className="hover:text-foreground">
                ~
              </TransitionLink>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center">
                <span className="mx-0.5 text-muted" aria-hidden="true">
                  /
                </span>
                {crumb.href ? (
                  <TransitionLink
                    href={crumb.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </TransitionLink>
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
        <nav className="desktop-nav-links flex gap-4 text-sm">
          <TransitionLink
            href="/about"
            className="text-muted transition-colors hover:text-foreground"
          >
            about
          </TransitionLink>
          <TransitionLink
            href="/projects"
            className="text-muted transition-colors hover:text-foreground"
          >
            projects
          </TransitionLink>
          <TransitionLink
            href="/posts"
            className="text-muted transition-colors hover:text-foreground"
          >
            posts
          </TransitionLink>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
