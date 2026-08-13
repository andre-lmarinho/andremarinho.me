"use client";

import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { Clock, Eye, GitCommit } from "@/components/ui/icon";
import useAbacusCount from "@/hooks/useAbacusCount";
import { ABACUS_SITE_COUNTER, formatAbacusCount } from "@/lib/abacus";
import { socials } from "@/lib/site";

import useTimeOnSite from "./hooks/useTimeOnSite";

const repositoryUrl = "https://github.com/andre-lmarinho/me";
const commitSha = process.env.NEXT_PUBLIC_COMMIT_SHA ?? "";
const build = {
  label: commitSha ? commitSha.slice(0, 7) : "0000000",
  href: commitSha ? `${repositoryUrl}/commit/${commitSha}` : repositoryUrl,
};

// The icon carries the meaning visually and the title on hover; the label stays
// in the DOM for screen readers, which would otherwise get a bare number.
function Stat({
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
    <div className="flex items-center" title={title}>
      <dt className="sr-only">{label}</dt>
      <dd
        className="status-value inline-flex items-center gap-x-1.5 text-xs tabular-nums"
        data-state={pending ? "pending" : "ready"}
      >
        <Icon className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        {children}
      </dd>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const timeOnSite = useTimeOnSite();
  const views = useAbacusCount(ABACUS_SITE_COUNTER, {
    increment: true,
    dedupeKey: pathname,
  });

  return (
    <footer className="my-8">
      <div className="mx-auto w-full max-w-3xl flex flex-col items-center gap-y-5 py-7 md:flex-row md:justify-between md:gap-x-8">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} André Marinho
        </p>

        <dl className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Stat Icon={Clock} label="time" title="Total time spent on this site">
            {timeOnSite}
          </Stat>
          <Stat
            Icon={Eye}
            label="visits"
            title="Total page views across this site, counted by Abacus"
            pending={views === null}
          >
            {formatAbacusCount(views)}
          </Stat>
          <Stat Icon={GitCommit} label="build" title="View deployment commit">
            <a
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`View deployment commit (${build.label})`}
              className="transition-colors hover:text-accent"
            >
              {build.label}
            </a>
          </Stat>
        </dl>

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
    </footer>
  );
}
