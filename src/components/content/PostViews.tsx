import { postCounter } from "@/lib/abacus";

export default function PostViews({
  slug,
  increment = false,
}: {
  slug: string;
  increment?: boolean;
}) {
  return (
    <span
      data-post-counter={postCounter(slug)}
      data-increment={increment ? "true" : undefined}
      style={{ display: "inline-block", minWidth: "12ch" }}
    >
      … views
    </span>
  );
}
