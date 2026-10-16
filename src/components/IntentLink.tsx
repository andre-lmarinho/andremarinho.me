import type { ComponentProps } from "react";

export default function IntentLink({
  prefetch,
  ...props
}: ComponentProps<"a"> & { prefetch?: boolean }) {
  return (
    <a {...props} data-prefetch={prefetch === false ? "false" : undefined} />
  );
}
