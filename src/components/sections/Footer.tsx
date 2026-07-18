"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/lib/content";
import type { LatestCommit } from "@/lib/github";

const TIME_KEY = "total-time-on-site";
const ABACUS_COUNTER =
  "https://abacus.jasoncameron.dev/hit/andremarinho/portfolio";

// Module-level so React strict-mode's double effect doesn't count the view twice
let hitPromise: Promise<string> | null = null;

function hitCounter(): Promise<string> {
  hitPromise ??= fetch(ABACUS_COUNTER, { signal: AbortSignal.timeout(4000) })
    .then((res) => res.json())
    .then((data) => Number(data.value).toLocaleString())
    .catch(() => "∞");
  return hitPromise;
}

function usePageViews() {
  const [views, setViews] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    hitCounter().then((value) => {
      if (active) setViews(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return views;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function useTimeOnSite() {
  const [timeOnSite, setTimeOnSite] = useState("00:00");

  useEffect(() => {
    const sessionStart = Date.now();
    const initialTime = Number(localStorage.getItem(TIME_KEY)) || 0;

    const elapsed = () => Math.floor((Date.now() - sessionStart) / 1000);
    const interval = setInterval(
      () => setTimeOnSite(formatTime(initialTime + elapsed())),
      1000,
    );
    const saveTime = () =>
      localStorage.setItem(TIME_KEY, String(initialTime + elapsed()));

    window.addEventListener("beforeunload", saveTime);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", saveTime);
      saveTime();
    };
  }, []);

  return timeOnSite;
}

const socials = [
  {
    label: "GitHub",
    url: "https://github.com/andre-lmarinho",
    icon: (
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/andre-lmarinho",
    icon: (
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/andre.lmarinho/",
    icon: (
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer({
  content,
  commit,
}: {
  content: Content["footer"];
  commit: LatestCommit;
}) {
  const timeOnSite = useTimeOnSite();
  const views = usePageViews();
  const year = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-6 pb-6">
      <footer className="bg-surface border border-border rounded-lg p-5 text-sm text-muted flex flex-col items-center justify-center gap-y-3 md:flex-row md:justify-between md:gap-y-0">
        <span className="whitespace-nowrap">
          © {year} {content.rights}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-end">
          <div className="flex items-center gap-1.5" title={content.timeTitle}>
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span className="text-accent font-mono text-xs">{timeOnSite}</span>
          </div>

          <span className="text-border hidden sm:inline">-</span>

          <a
            href="https://abacus.jasoncameron.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-200"
            title={content.viewsTitle}
          >
            {views ?? "…"} {content.views}
          </a>

          <span className="text-border hidden sm:inline">-</span>

          {commit ? (
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center gap-x-1 transition-colors duration-200"
              title={`${content.commitTitle} (${commit.sha})`}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v6M12 15v6" />
              </svg>
              <span className="font-mono text-xs">{commit.sha}</span>
            </a>
          ) : (
            <span
              className="flex items-center gap-x-1"
              title={content.commitTitle}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v6M12 15v6" />
              </svg>
              <span className="font-mono text-xs">dev</span>
            </span>
          )}

          <span className="text-border hidden sm:inline">-</span>

          <div className="flex items-center gap-x-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="hover:text-accent transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <span className="text-border hidden sm:inline">-</span>

          <a
            href={content.langHref}
            className="hover:text-foreground transition-colors"
          >
            {content.langToggle}
          </a>
        </div>
      </footer>
    </div>
  );
}
