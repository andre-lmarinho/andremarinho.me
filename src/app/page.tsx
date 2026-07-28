import Card from "@/components/ui/Card";
import { ArrowRight, GitHub, Linkedin } from "@/components/ui/icon";
import MorphTitle from "@/components/ui/MorphTitle";
import TransitionLink from "@/components/ui/TransitionLink";
import { formatDate } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";

const LATEST_COUNT = 3;

export default function Page() {
  const posts = getPosts().slice(0, LATEST_COUNT);
  const projects = getFeaturedProjects();

  return (
    <>
      <section
        id="hero"
        className="pt-48 pb-20 md:pb-24 lg:pb-36 relative overflow-hidden"
      >
        {/* Subtle background gradient */}
        <div
          className="absolute inset-0 bg-linear-to-b from-accent-glow/20 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight max-w-3xl mb-6">
            Hey! I&apos;m André Marinho{" "}
            <span
              aria-hidden="true"
              className="animate-wave inline-block origin-[70%_70%]"
            >
              👋🏼
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-10">
            Full-stack developer working with React, Next.js and TypeScript. I
            bring an owner&apos;s eye to product decisions and a beginner&apos;s
            appetite for hard code review.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/andre-lmarinho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              <GitHub className="h-4 w-4" />
              GitHub
            </a>
            <span className="text-border text-xs">|</span>
            <a
              href="https://linkedin.com/in/andre-lmarinho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <section
        id="work"
        className="max-w-7xl mx-auto px-6 pb-20 md:pb-24 lg:pb-36"
      >
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Featured Projects
          </h2>
          <TransitionLink
            href="/projects"
            className="group shrink-0 inline-flex items-center gap-1 px-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            All projects
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </TransitionLink>
        </div>

        <div className="project-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.slug}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              href={`/projects/${project.slug}`}
              slug={project.slug}
            />
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section
          id="posts"
          className="max-w-7xl mx-auto px-6 pb-20 md:pb-24 lg:pb-36"
        >
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Latest Posts</h2>
            <TransitionLink
              href="/posts"
              className="group shrink-0 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
            >
              All posts
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </TransitionLink>
          </div>

          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <TransitionLink
                  href={`/posts/${post.slug}`}
                  className="group block"
                >
                  <MorphTitle
                    as="h3"
                    title={post.title}
                    id={`post-${post.slug}`}
                    className="text-2xl font-semibold transition-colors group-hover:text-accent"
                  />
                  <p className="mt-1 text-xs text-muted">
                    {post.date ? formatDate(post.date) : "Draft"}
                  </p>
                  <p className="mt-3 text-muted">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-surface-2 px-2 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
