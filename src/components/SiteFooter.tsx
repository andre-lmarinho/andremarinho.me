"use client";

import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { Clock, Eye, GitCommit } from "@/components/ui/icon";
import { colophon, email, profile, socials, sourceUrl } from "@/lib/site";

const counterUrl = "https://abacus.jasoncameron.dev/hit/andremarinho/portfolio";
const repositoryUrl = "https://github.com/andre-lmarinho/me";
const pad = (value: number) => String(value).padStart(2, "0");

let visitRequest: Promise<string> | null = null;

function fetchVisits() {
  visitRequest ??= fetch(counterUrl, { signal: AbortSignal.timeout(4000) })
    .then((response) => {
      if (!response.ok) throw new Error("Counter unavailable");
      return response.json();
    })
    .then((data) => Number(data.value).toLocaleString("en-US"))
    .catch(() => "∞");

  return visitRequest;
}

function useSession() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(
      () => setSeconds(Math.floor((Date.now() - start) / 1000)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const value = `${pad(minutes)}:${pad(seconds % 60)}`;

  return hours > 0 ? `${hours}:${value}` : value;
}

const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "";
const commit = {
  label: commitSha ? commitSha.slice(0, 7) : "0000000",
  href: commitSha ? `${repositoryUrl}/commit/${commitSha}` : repositoryUrl,
  deployedAt: process.env.NEXT_PUBLIC_BUILD_TIME ?? "",
};

function useAmbient() {
  const [ambient, setAmbient] = useState<{
    visits: string;
    build: typeof commit;
  } | null>(null);

  useEffect(() => {
    let active = true;
    fetchVisits().then((visits) => {
      if (active) setAmbient({ visits, build: commit });
    });
    return () => {
      active = false;
    };
  }, []);

  return ambient;
}

function Cell({
  Icon,
  label,
  title,
  children,
  pending = false,
}: {
  Icon: IconType;
  label: string;
  title: string;
  children: React.ReactNode;
  pending?: boolean;
}) {
  return (
    <div className="py-3.5 sm:px-6 sm:first:pl-0 sm:last:pr-0">
      <dt
        title={title}
        className="inline-flex items-center gap-x-1.5 text-[10px] tracking-[0.2em] text-muted uppercase"
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd
        className="status-value mt-1.5 text-sm tabular-nums"
        data-state={pending ? "pending" : "ready"}
      >
        {children}
      </dd>
    </div>
  );
}

export default function SiteFooter() {
  const session = useSession();
  const ambient = useAmbient();

  return (
    <footer className="mt-28 border-t border-border max-md:mt-20">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Cell
            Icon={Clock}
            label="session"
            title="How long you have been surfing my site"
          >
            {session}
          </Cell>
          <Cell
            Icon={Eye}
            label="visits"
            title="Site views, counted by Abacus"
            pending={!ambient}
          >
            {ambient?.visits ?? "0"}
          </Cell>
          <Cell
            Icon={GitCommit}
            label="build"
            title="View deployment commit"
            pending={!ambient}
          >
            {ambient ? (
              <a
                href={ambient.build.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Deployed ${new Date(
                  ambient.build.deployedAt,
                ).toLocaleDateString("en-US", { dateStyle: "long" })}`}
                className="transition-colors hover:text-accent"
              >
                {ambient.build.label}
              </a>
            ) : (
              "0000000"
            )}
          </Cell>
        </dl>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border py-7">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}
            <span className="text-border"> / </span>
            <a
              href={`mailto:${email}`}
              className="transition-colors hover:text-accent"
            >
              {email}
            </a>
          </p>

          <ul className="flex items-center gap-x-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="block text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="pb-10 text-xs text-[#64748b]">
          {colophon}{" "}
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-accent"
          >
            Source on GitHub.
          </a>
        </p>
      </div>
    </footer>
  );
}
