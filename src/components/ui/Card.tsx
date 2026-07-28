import Image from "next/image";
import MorphTitle from "@/components/ui/MorphTitle";
import TransitionLink from "@/components/ui/TransitionLink";

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  slug: string;
};

export default function Card({
  title,
  description,
  tags,
  image,
  href,
  slug,
}: CardProps) {
  return (
    <TransitionLink
      href={href}
      className="project-card group block h-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg transition-all duration-300 hover:border-accent hover:shadow-xl focus:outline-none focus-visible:border-accent"
    >
      {/* The name has to match the hero image on /projects/[slug] to morph. */}
      <Image
        src={image}
        alt={title}
        width={1600}
        height={900}
        className="aspect-video w-full object-cover transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ viewTransitionName: `project-image-${slug}` }}
      />

      <div className="space-y-3 p-5">
        <div>
          <MorphTitle
            as="h3"
            title={title}
            id={`project-${slug}`}
            className="min-w-0 flex-1 text-xl font-semibold text-foreground transition-colors group-hover:text-accent"
          />
        </div>
        <p className="line-clamp-2 text-sm text-muted">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface-2 px-2 py-1 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </TransitionLink>
  );
}
