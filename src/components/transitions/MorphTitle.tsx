import { Fragment } from "react";

type MorphTitleProps = {
  as: "h1" | "h2" | "h3";
  title: string;
  /** Must carry the kind, not just the slug: the home page renders posts and
   * projects together, and a duplicate name drops the whole transition. */
  id: string;
  className?: string;
};

// Named per word, not per title: a word keeps its aspect ratio across font
// sizes, and a title that wraps to two lines would produce multiple box
// fragments, which makes the browser skip the transition. The index pairs the
// two sides, since the title string is identical on both.
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
