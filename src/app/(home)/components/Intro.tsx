import TransitionLink from "@/components/transitions/TransitionLink";
import { ArrowRight } from "@/components/ui/icon";
import { socials } from "@/lib/site";
import LocalTime from "./LocalTime";

export default function Intro() {
  return (
    <section
      id="intro"
      className="mx-auto w-full max-w-3xl px-6 pt-40 pb-28 max-md:pt-32 max-md:pb-20 lg:px-8"
    >
      <div className="flex flex-col">
        <p className="text-xs text-muted">
          Salvador, Brazil <span className="text-border">·</span>{" "}
          <LocalTime timeZone="America/Bahia" />
        </p>

        <h1 className="text-[clamp(38px,5vw,62px)] leading-[1.04] font-semibold tracking-[-0.045em]">
          André Marinho
        </h1>

        <p className="mt-3 text-lg">Frontend Engineer</p>

        <p className="mt-4 text-sm text-muted leading-relaxed sm:text-base">
          I make software, write down what I learn, and keep enough room for
          books, running, classical guitar, the beach, and whatever I have just
          become curious about.
        </p>

        <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 text-xs">
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
            <TransitionLink
              href="/about"
              className="group inline-flex items-center gap-x-2 text-muted transition-colors hover:text-accent"
            >
              <span style={{ viewTransitionName: "about-title" }}>
                About Me
              </span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </TransitionLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
