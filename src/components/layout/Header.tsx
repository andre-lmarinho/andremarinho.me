"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TransitionLink from "@/components/transitions/TransitionLink";

const routes = ["about", "projects", "posts"] as const;
const homeSections = ["projects", "writing"] as const;
const observerBand = "-45% 0px -50% 0px";

function useHomeSection(pathname: string) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const elements = homeSections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const found = homeSections.filter((id) => visible.has(id)).at(-1);
        setCurrent(found ?? null);
      },
      { rootMargin: observerBand },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [pathname]);

  return pathname === "/" ? current : null;
}

export default function Header() {
  const pathname = usePathname();
  const section = useHomeSection(pathname);
  const route = pathname.split("/").filter(Boolean)[0] ?? null;
  const breadcrumb = pathname === "/" ? section : route;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex items-center">
            <li className="text-accent">
              {pathname === "/" ? (
                <a
                  href="#intro"
                  aria-label="Back to the top"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
                >
                  ~
                </a>
              ) : (
                <TransitionLink
                  href="/"
                  aria-label="Home"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
                >
                  ~
                </TransitionLink>
              )}
            </li>
            <li className="mx-0.5 text-muted" aria-hidden="true">
              /
            </li>
            {breadcrumb ? (
              <li>
                {pathname === "/" ? (
                  <a
                    href={`#${breadcrumb}`}
                    aria-current="location"
                    className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                  >
                    {breadcrumb}
                  </a>
                ) : pathname === `/${route}` ? (
                  <span
                    aria-current="page"
                    className="inline-flex min-h-11 items-center"
                  >
                    {breadcrumb}
                  </span>
                ) : (
                  <TransitionLink
                    href={`/${route}`}
                    className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
                  >
                    {breadcrumb}
                  </TransitionLink>
                )}
              </li>
            ) : null}
            <li className="ml-1.5">
              <span
                className="breadcrumb-cursor block h-4 w-2 bg-accent"
                aria-hidden="true"
              />
            </li>
          </ol>
        </nav>

        <nav aria-label="Site">
          <ul className="flex gap-x-5 text-sm">
            {routes.map((item) => {
              const active =
                pathname === `/${item}` || pathname.startsWith(`/${item}/`);

              return (
                <li key={item}>
                  <TransitionLink
                    href={`/${item}`}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center transition-colors hover:text-foreground ${active ? "text-foreground" : "text-muted"}`}
                  >
                    {item}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
