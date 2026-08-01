import { Mail } from "@/components/ui/icon";
import { email, socials } from "@/lib/site";
import LocalTime from "./LocalTime";

export default function Intro() {
  return (
    <section
      id="intro"
      className="mx-auto w-full max-w-3xl px-6 pt-40 pb-28 max-md:pt-32 max-md:pb-20 lg:px-8"
    >
      <div className="home-head flex flex-col">
        <p className="text-xs text-muted">
          Salvador, Brazil <span className="text-border">/</span>{" "}
          <LocalTime timeZone="America/Bahia" />
        </p>

        <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
          André Marinho
        </h1>

        <p className="mt-3 text-sm text-accent">Full-Stack Developer</p>

        <p className="mt-6 max-w-152 text-sm leading-relaxed text-foreground sm:text-base">
          React, Next.js and TypeScript on the front, Node with tRPC and
          PostgreSQL behind it. I work on products that run in production, with
          automated tests, CI, and the architecture decisions written down for
          whoever comes next.
        </p>
        <p className="mt-6 max-w-152 text-sm leading-relaxed text-foreground sm:text-base">
          Before code, eight years founding and running my own digital agency,
          scoping software other people built. I build it myself now, end to
          end.
        </p>

        <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
          {socials.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 text-muted transition-colors hover:text-accent"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-x-2 text-muted transition-colors hover:text-accent"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
