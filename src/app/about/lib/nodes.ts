import type { IconType } from "react-icons";
import type { Piece, StatementName } from "../content";
import { statements } from "../content";

export type Node = {
  id: string;
  word: string;
  tail: string;
  before: boolean;
  icon: IconType | null;
  /** A cluster is one node and lights as a unit: its tiles belong to the same
      breath of the sentence, so they arrive together rather than in file. */
  cluster: { icon: IconType; name: string }[] | null;
};

export function toNodes(pieces: Piece[]): Node[] {
  return pieces.flatMap((piece, pieceIndex): Node[] => {
    if (typeof piece === "string") {
      return piece.split(" ").map((word, wordIndex) => ({
        id: `w${pieceIndex}-${wordIndex}-${word}`,
        word,
        tail: "",
        before: false,
        icon: null,
        cluster: null,
      }));
    }

    if ("cluster" in piece) {
      return [
        {
          id: `c${pieceIndex}`,
          word: "",
          tail: "",
          before: false,
          icon: null,
          cluster: piece.cluster,
        },
      ];
    }

    return [
      {
        id: `i${pieceIndex}-${piece.word}`,
        word: piece.word,
        tail: piece.tail ?? "",
        before: piece.before ?? false,
        icon: piece.icon,
        cluster: null,
      },
    ];
  });
}

/** Nodes up to and including the first full stop. */
function firstSentence(nodes: Node[]): number {
  const end = nodes.findIndex((node) => (node.tail || node.word).endsWith("."));
  return end === -1 ? 0 : end + 1;
}

export type SegmentPlan = {
  /** Every statement in the segment, with where its nodes start in the
      segment-wide sequence and how many of its leading nodes are pinned.

      One sequence across all of them is what makes the order structural: node
      40 cannot light before node 39, so a paragraph can never start while the
      one above it is still going. No paragraph ever has to look at its
      neighbour. */
  items: { block: StatementName; offset: number; pinned: number }[];
  total: number;
  /** Where the front starts, so the first scrolled node is right at the
      switch rather than sitting through dead travel. */
  pinned: number;
  /** First index after the statements, for anything that reveals with the
      segment without being a paragraph of it. */
  trailingOffset: number;
};

/** `pinFirstSentence` takes the opening sentence out of the reveal entirely
    rather than giving it a head start inside it. It is lit wherever the page
    happens to be, so it is not a node the front has to reach.

    `trailing` takes the pieces of anything that reveals with the segment
    without being a paragraph of it, so it lands on the same curve as the text
    above instead of being animated on its own terms. Counting from the pieces
    rather than from a number keeps the reserved indices honest if that
    content ever grows. */
export function planSegment(
  blocks: StatementName[],
  {
    pinFirstSentence = false,
    trailing = [] as Piece[],
  }: { pinFirstSentence?: boolean; trailing?: Piece[] } = {},
): SegmentPlan {
  const pinned = pinFirstSentence
    ? firstSentence(toNodes(statements[blocks[0]]))
    : 0;

  let offset = 0;
  const items = blocks.map((block, i) => {
    const at = offset;
    offset += toNodes(statements[block]).length;
    return { block, offset: at, pinned: i === 0 ? pinned : 0 };
  });

  return {
    items,
    total: offset + toNodes(trailing).length,
    pinned,
    trailingOffset: offset,
  };
}
