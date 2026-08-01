"use client";

import type { IconType } from "react-icons";
import { Clock, Eye, GitCommit } from "@/components/ui/icon";
import { email, socials } from "@/lib/site";

import useTimeOnSite from "./hooks/useTimeOnSite";
import useViewsCount from "./hooks/useViewsCount";

const repositoryUrl = "https://github.com/andre-lmarinho/me";
const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "";
const build = {
  label: commitSha ? commitSha.slice(0, 7) : "0000000",
  href: commitSha ? `${repositoryUrl}/commit/${commitSha}` : repositoryUrl,
};

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
        title={title}
        className="status-value mt-1.5 text-sm tabular-nums"
        data-state={pending ? "pending" : "ready"}
      >
        {children}
      </dd>
    </div>
  );
}

export default function Footer() {
  const timeOnSite = useTimeOnSite();
  const views = useViewsCount();

  return (
    <footer className="mt-28 border-t border-border max-md:mt-20">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Cell Icon={Clock} label="time" title="Total time spent on this site">
            {timeOnSite}
          </Cell>
          <Cell
            Icon={Eye}
            label="visits"
            title="Total page views across this site"
            pending={views === null}
          >
            {views?.toLocaleString("en-US") ?? "0"}
          </Cell>
          <Cell Icon={GitCommit} label="build" title="View deployment commit">
            <a
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`View deployment commit (${build.label})`}
              className="transition-colors hover:text-accent"
            >
              {build.label}
            </a>
          </Cell>
        </dl>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border py-7">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} André Marinho
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
          Written from scratch in Next.js and Tailwind.{" "}
          <a
            href={repositoryUrl}
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
