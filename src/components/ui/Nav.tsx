"use client";

import { useState } from "react";

export default function Nav({
  href,
  label,
  lang,
}: {
  href: string;
  label: string;
  lang: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header fixed top-0 right-0 left-0 z-40 border-b border-transparent bg-transparent">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <nav aria-label="Breadcrumbs" className="font-mono text-sm">
            <ol className="flex items-center">
              <li className="text-accent">~</li>
              {lang === "pt" && (
                <>
                  <li className="mx-0.5 text-muted" aria-hidden="true">
                    /
                  </li>
                  <li aria-current="page">pt</li>
                </>
              )}
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

          <a
            href={href}
            className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:text-foreground md:inline-flex"
          >
            {label}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="text-muted transition-colors hover:text-foreground md:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-md md:hidden">
          <a
            href={href}
            className="mt-4 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            {label}
          </a>
        </div>
      )}
    </>
  );
}
