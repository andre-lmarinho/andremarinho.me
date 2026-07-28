import { Fragment } from "react";
import type { IconType } from "react-icons";
import type { Piece } from "../content";
import { toNodes } from "../lib/nodes";
import { TILE_GLYPH, TILE_SKIN } from "../tokens";
import styles from "./reveal.module.css";

/* The one place a piece becomes markup.

   Everything that reveals goes through here, paragraphs and the mail link
   alike. Rebuilding a tile by hand anywhere else would work right up until
   the tile changes, and then only one of the copies would follow. */

const MARGIN = {
  before: "mr-[0.3em]",
  after: "ml-[0.3em]",
  cluster: "mr-[0.22em]",
} as const;

const PLACEMENT = {
  before: styles.tileBefore,
  after: styles.tileAfter,
  cluster: styles.tileCluster,
} as const;

type Side = keyof typeof MARGIN;

function Tile({
  icon: Icon,
  side,
  index,
  pinned,
}: {
  icon: IconType;
  side: Side;
  index: number;
  pinned: boolean;
}) {
  return (
    <span
      data-icon
      className={
        pinned
          ? `${TILE_SKIN} w-[1.5em] ${MARGIN[side]}`
          : `${styles.node} ${styles.tile} ${PLACEMENT[side]} ${TILE_SKIN}`
      }
      style={pinned ? undefined : ({ "--i": index } as React.CSSProperties)}
    >
      <Icon className={TILE_GLYPH} aria-hidden="true" />
    </span>
  );
}

/** Numbers a run of pieces into the segment-wide sequence, starting at
    `offset`. The first `pinned` nodes sit outside the reveal: no index, no
    switch, no transition, lit wherever the page happens to be. */
export default function Nodes({
  pieces,
  offset,
  pinned = 0,
}: {
  pieces: Piece[];
  offset: number;
  pinned?: number;
}) {
  return toNodes(pieces).map((node, local) => {
    const isPinned = local < pinned;
    const index = offset + local;
    const lit = isPinned
      ? {}
      : {
          className: `${styles.node} ${styles.word}`,
          style: { "--i": index } as React.CSSProperties,
        };

    // Cluster: one node, so the whole run arrives together. Nothing else
    // names these tiles, so each carries its own name.
    if (node.cluster) {
      return (
        <span key={node.id} className={styles.pair}>
          {node.cluster.map(({ icon, name }) => (
            <Fragment key={name}>
              <Tile
                icon={icon}
                side="cluster"
                index={index}
                pinned={isPinned}
              />
              <span className="sr-only">{name}</span>
            </Fragment>
          ))}
        </span>
      );
    }

    // Paired: the word beside it names the tile, so the tile is silent.
    if (node.icon) {
      const tile = (
        <Tile
          icon={node.icon}
          side={node.before ? "before" : "after"}
          index={index}
          pinned={isPinned}
        />
      );
      const word = (
        <span data-word {...lit}>
          {node.word}
        </span>
      );
      // Punctuation trails the tile, never the word, or the tile ends up
      // marooned between the word and its own full stop.
      const tail = node.tail ? <span {...lit}>{node.tail}</span> : null;

      return (
        <Fragment key={node.id}>
          <span className={styles.pair}>
            {node.before ? (
              <>
                {tile}
                {word}
              </>
            ) : (
              <>
                {word}
                {tile}
              </>
            )}
            {tail}
          </span>{" "}
        </Fragment>
      );
    }

    return (
      <Fragment key={node.id}>
        <span data-word {...lit}>
          {node.word}
        </span>{" "}
      </Fragment>
    );
  });
}
