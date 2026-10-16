import Link from "@/components/IntentLink";
import JsonLd from "@/components/JsonLd";
import PageTitle from "@/components/PageTitle";
import Image from "@/components/ResponsiveImage";
import { Mail } from "@/components/ui/icon";
import { profileJsonLd } from "@/lib/seo";
import { email, socials } from "@/lib/site";

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
      <JsonLd data={profileJsonLd} />
      <PageTitle>About</PageTitle>

      <div className="mt-10 flex items-center gap-6 sm:gap-10">
        <p className="min-w-0 flex-1 font-display text-xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
          I’m André, a software engineer in Salvador, Brazil.
        </p>
        <Image
          src="/images/me/andre-marinho.webp"
          alt="André Marinho smiling"
          width={128}
          height={128}
          sizes="(min-width: 640px) 128px, 80px"
          loading="eager"
          fetchPriority="high"
          className="size-20 shrink-0 rounded-xl border border-border sm:size-32"
        />
      </div>

      <div className="mt-8 space-y-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
        <p>
          I build full-stack web products with TypeScript, React, Next.js,
          Node.js and PostgreSQL, from product decisions to deployment and
          maintenance.
        </p>
        <p>
          Some projects start as an idea I want to try; others as something I’m
          tired of doing by hand. This site is where I keep my{" "}
          <Link href="/projects" className="about-inline-link">
            projects
          </Link>{" "}
          and{" "}
          <Link href="/posts" className="about-inline-link">
            write about what I’m learning
          </Link>
          .
        </p>
      </div>

      <section aria-labelledby="work" className="mt-12 sm:mt-14">
        <h2 id="work" className="text-lg font-medium tracking-tight">
          Work
        </h2>
        <div className="mt-5 space-y-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
          <p>
            My work spans interfaces, APIs, data models, authentication, tenant
            isolation, payments and automated tests, with a focus on
            accessibility and performance.
          </p>
          <p>
            In{" "}
            <Link href="/projects/turistar" className="about-inline-link">
              Turistar
            </Link>
            , my open-source trip planner, I maintain real-time collaboration,
            access controls and automated tests.
          </p>
          <p>
            I’m open to remote software engineering roles, including
            international teams. Portuguese is my native language, and I’m
            fluent in English.
          </p>
          <p>
            <a
              href="/resume.pdf"
              download="Andre-Marinho-Resume.pdf"
              className="about-inline-link inline-flex min-h-11 items-center"
            >
              Download résumé (PDF, English)
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="background" className="mt-12 sm:mt-14">
        <h2 id="background" className="text-lg font-medium tracking-tight">
          How I got here
        </h2>
        <div className="mt-5 space-y-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
          <p>
            My first technical project was at Grupo Hemocat, connecting a
            financial planning spreadsheet to the company’s database. Later, in
            logistics, I built Power BI dashboards around stock availability and
            purchasing.
          </p>
          <p>
            In 2017, I started Duonorth as a business intelligence consultancy.
            It grew to include digital strategy and marketing around 2020, then
            focused on websites and software in 2023. In July 2025, I moved into
            software development as my main occupation. I wrote a longer version
            of{" "}
            <Link
              href="/posts/before-i-called-it-code"
              className="about-inline-link"
            >
              that story here
            </Link>
            .
          </p>
          <p>
            That work still shapes how I build software: understanding the
            operation, agreeing on scope, and following a decision through to
            delivery.
          </p>
        </div>
      </section>

      <section aria-labelledby="off-screen" className="mt-12 sm:mt-14">
        <h2 id="off-screen" className="text-lg font-medium tracking-tight">
          Away from the screen
        </h2>
        <div className="mt-5 space-y-5 text-sm leading-7 text-muted sm:text-base sm:leading-8">
          <p>
            I spend my time reading, running, lifting weights, playing classical
            guitar, and going to the beach.
          </p>
          <p>
            I like always having something new to learn. Right now, I’m learning
            to juggle.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="elsewhere"
        className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-6 sm:mt-14"
      >
        <h2 id="elsewhere" className="text-base font-medium">
          Elsewhere
        </h2>
        <ul className="flex flex-wrap gap-x-6 text-xs">
          {socials.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Icon aria-hidden="true" className="size-3.5" />
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${email}`}
              className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              Email
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
