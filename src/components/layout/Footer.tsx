"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  GitCommit,
  GitHub,
  Instagram,
  Linkedin,
} from "@/components/ui/icon";

const TIME_KEY = "total-time-on-site";
const ABACUS_COUNTER =
  "https://abacus.jasoncameron.dev/hit/andremarinho/portfolio";

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
    icon: <GitHub className="h-4.5 w-4.5" />,
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/andre-lmarinho",
    icon: <Linkedin className="h-4.5 w-4.5" />,
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/andre.lmarinho/",
    icon: <Instagram className="h-4.5 w-4.5" />,
  },
];

const sha = process.env.NEXT_PUBLIC_COMMIT_SHA;
const commit = sha
  ? {
      sha: sha.slice(0, 7),
      url: `https://github.com/andre-lmarinho/me/commit/${sha}`,
    }
  : null;

export default function Footer() {
  const timeOnSite = useTimeOnSite();
  const views = usePageViews();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 pb-6">
      <div className="bg-surface border border-border rounded-lg p-5 text-sm text-muted flex flex-col items-center justify-center gap-y-3 md:flex-row md:justify-between md:gap-y-0">
        <span className="whitespace-nowrap">
          © {year} André Marinho. All rights reserved.
        </span>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-end">
          <div
            className="flex items-center gap-1.5"
            title="How long you have been surfing my site"
          >
            <Clock className="h-3.5 w-3.5" />
            <span className="text-accent text-xs">{timeOnSite}</span>
          </div>

          <span className="text-border hidden sm:inline">-</span>

          <span title="Site views, counted by Abacus">
            {views ?? "…"} views
          </span>

          <span className="text-border hidden sm:inline">-</span>

          {commit ? (
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center gap-x-1 transition-colors duration-200"
              title={`View deployment commit (${commit.sha})`}
            >
              <GitCommit className="h-4.5 w-4.5 shrink-0" />
              <span className="text-xs">{commit.sha}</span>
            </a>
          ) : (
            <span
              className="flex items-center gap-x-1"
              title="View deployment commit"
            >
              <GitCommit className="h-4.5 w-4.5 shrink-0" />
              <span className="text-xs">dev</span>
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
        </div>
      </div>
    </footer>
  );
}
