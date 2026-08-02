import { Fragment } from "react";

type MorphTitleProps = {
  as: "h1" | "h2" | "h3";
  title: string;
  /** Must carry the kind, not just the slug: the home page renders posts and
   * projects together, and a duplicate name drops the whole transition. */
  id: string;
  className?: string;
};

// A title that wraps to two lines becomes multiple box fragments and the browser
// skips the transition, so each word is named separately.
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
