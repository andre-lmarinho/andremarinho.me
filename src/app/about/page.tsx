import type { Metadata } from "next";
import Contact from "./components/Contact";
import Rail from "./components/Rail";
import RevealSegment from "./components/RevealSegment";
import Statement from "./components/Statement";
import { contact } from "./content";
import { planSegment } from "./lib/nodes";
import { COLUMN, PAGE } from "./tokens";

export const metadata: Metadata = {
  title: "About — André Marinho",
  description:
    "Eight years running a digital marketing agency, then a full time move into code. Where the instincts came from, and what they did not cover.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — André Marinho",
    description: "Where the instincts came from, and what they did not cover.",
    type: "profile",
    url: "/about",
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   Structure follows huly.io/pricing: statements, rail, statements, close.

   The device that page runs on is not the column, it is icons sitting inside
   the sentences, on the baseline, where a word would be. Its text is one flat
   colour throughout; the icons carry the rhythm that colour changes would
   otherwise have to fake. So the copy is written to enumerate, because an
   enumeration is what gives an icon somewhere to stand.

   The reveal runs in two segments, each with its own curve across its own
   stretch of the page: the opening one from the top of the document to the
   cards, the closing one from the cards to the end. Everything after the rail
   sits in one section so the second segment is one element.

   Copy and chapter data in content.ts, layout measurements in tokens.ts,
   node sequencing in lib/nodes.ts, the curve in components/RevealSegment.tsx.

   Card hooks still waiting on the animation pass:
   [data-rail] [data-card] [data-card-featured] [data-card-glow] [data-card-hover]
   ──────────────────────────────────────────────────────────────────────── */

// The opening sentence is pinned: lit wherever the page is, never a node
// the front has to reach.
const opening = planSegment(["thesis", "instincts", "now"], {
  pinFirstSentence: true,
});
// The email closes the block on the same curve as the text above it.
const closing = planSegment(["transferred", "didNot", "closing"], {
  trailing: contact,
});

export default function AboutPage() {
  return (
    <div className={`${PAGE} overflow-x-clip`}>
      <h1 className="sr-only">About André Marinho</h1>

      <section className="relative pt-53 pb-40 max-md:pt-36 max-md:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-150 bg-linear-to-b from-accent-glow/20 via-transparent to-transparent"
          aria-hidden="true"
        />

        <RevealSegment
          anchor="head"
          total={opening.total}
          pinned={opening.pinned}
          className={`relative z-10 flex flex-col gap-y-14 ${COLUMN}`}
        >
          {opening.items.map(({ block, offset, pinned }) => (
            <Statement
              key={block}
              block={block}
              offset={offset}
              pinned={pinned}
            />
          ))}
        </RevealSegment>
      </section>

      <section className="relative">
        <h2 className="sr-only">How I got here</h2>
        <Rail />
      </section>

      <section className="relative pb-48 max-md:pb-28">
        <h2 className="sr-only">What transferred, and what comes next</h2>

        <RevealSegment
          anchor="tail"
          total={closing.total}
          pinned={closing.pinned}
          className={`relative z-10 flex flex-col gap-y-14 ${COLUMN}`}
        >
          {closing.items.map(({ block, offset }) => (
            <Statement key={block} block={block} offset={offset} />
          ))}
          <Contact offset={closing.trailingOffset} />
        </RevealSegment>
      </section>
    </div>
  );
}
