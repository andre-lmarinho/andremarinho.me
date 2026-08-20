"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/transitions/TransitionLink";

const routes = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "posts", href: "/posts" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6 lg:px-8">
        <nav aria-label="Site">
          <ul className="flex gap-x-5 text-sm">
            {routes.map(({ label, href }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={href}>
                  <TransitionLink
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center transition-colors hover:text-foreground ${active ? "text-foreground" : "text-muted"}`}
                  >
                    {label}
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
