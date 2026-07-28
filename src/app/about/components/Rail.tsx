import { FiCheck } from "react-icons/fi";
import { chapters } from "../content";
import { CARD, RAIL_MASK, RAIL_SCROLLER } from "../tokens";

/** The two layers every card in the reference carries: a blob that bleeds out
    from the top left behind the card, and a hover layer parked at zero. Both
    are inert and waiting for the animation pass. */
function CardLayers({ featured }: { featured: boolean }) {
  return (
    <>
      <span
        data-card-glow
        aria-hidden="true"
        className="pointer-events-none absolute -top-75 left-[-70%] -z-20 block aspect-[0.925925] w-250 rounded-[inherit] select-none"
      >
        <span
          className={`absolute inset-0 block rounded-full bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-glow)_0%,transparent_60%)] ${
            featured ? "opacity-100" : "opacity-60"
          }`}
        />
      </span>

      <span
        data-card-hover
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 block rounded-[inherit] opacity-0 transition-opacity duration-500 select-none [backdrop-filter:blur(1px)] group-hover:opacity-100"
      />
    </>
  );
}

export default function Rail() {
  return (
    <div data-rail className={RAIL_MASK}>
      <ol className={RAIL_SCROLLER}>
        {chapters.map((chapter) => (
          <li
            key={chapter.year}
            data-card
            data-card-featured={chapter.featured || undefined}
            className={`${CARD} ${
              chapter.featured
                ? "border-accent/40 ring-1 ring-accent/20"
                : "border-border"
            }`}
          >
            <CardLayers featured={chapter.featured} />

            <h3 className="relative text-lg leading-snug font-semibold tracking-tight">
              {chapter.name}
            </h3>

            <p
              className={`relative mt-2.5 text-[3.5rem] leading-none font-semibold tracking-tight lg:text-[4rem] ${
                chapter.featured ? "text-accent" : ""
              }`}
            >
              {chapter.year}
            </p>

            <p className="relative mt-1 text-sm leading-snug">
              {chapter.role} · {chapter.org}
            </p>

            <span
              className="relative mt-4.5 block h-px bg-border"
              aria-hidden="true"
            />

            <ul className="relative mt-6 flex flex-col gap-y-4">
              {chapter.points.map((point) => (
                <li key={point} className="flex gap-x-2.5">
                  <FiCheck
                    className="mt-[0.28em] h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* The CTA slot of the reference card, pinned so the four outcome
                lines land on one band across the rail. */}
            <div className="relative mt-auto pt-8">
              <p className="text-[10px] tracking-[0.2em] text-muted uppercase">
                {chapter.outcome.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                {chapter.outcome.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
