import type { StatementName } from "../content";
import { statements } from "../content";
import Nodes from "./Nodes";

export default function Statement({
  block,
  offset,
  pinned = 0,
}: {
  block: StatementName;
  offset: number;
  pinned?: number;
}) {
  return (
    <p className="text-pretty text-lg leading-[1.75] font-medium sm:text-xl md:text-2xl lg:text-[1.75rem]">
      <Nodes pieces={statements[block]} offset={offset} pinned={pinned} />
    </p>
  );
}
