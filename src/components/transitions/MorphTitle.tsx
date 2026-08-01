import { Fragment } from "react";

type MorphTitleProps = {
  as: "h1" | "h2" | "h3";
  title: string;
  /**
   * Must carry the kind as well as the slug: the home page renders posts and
   * projects together, so a post sharing a slug with a project would emit a
   * duplicate view-transition-name and the browser would drop the transition.
   */
  id: string;
  className?: string;
};

// Named per word rather than per title for two reasons: a word keeps its
// aspect ratio across font sizes, where a whole title reflows from one line to
// two and stretches; and an inline element that wraps produces multiple box
// fragments, which makes the browser skip the entire transition.
//
// The index is the pairing key because the title string is identical on both
// sides. Naming by the word itself would need a duplicate-occurrence counter to
// survive a title that repeats a word.
export default function MorphTitle({
  as: Tag,
  title,
  id,
  className,
}: MorphTitleProps) {
  return (
    <Tag className={className}>
      {title.split(" ").map((word, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: the words of a fixed title never reorder, and the index is the pairing key
        <Fragment key={`${i}-${word}`}>
          {i > 0 && " "}
          {/* inline-block keeps a word to a single box even if overflow-wrap
              would otherwise break it. */}
          <span
            className="inline-block"
            style={{ viewTransitionName: `title-${id}-${i}` }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
