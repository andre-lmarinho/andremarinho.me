import layout from "./layout.module.css";

/* ─────────────────────────────────────────────────────────────────────────
   Layout measurements lifted from huly.io/pricing, named once so the two
   halves of the page keep the same rhythm.

   PAGE     carries --column and --gutter, which the two below both read.
   COLUMN   the column every statement and every rail aligns to. Change its
            width in layout.module.css, not here: the rail derives from it.
   RAIL     the full-bleed scroller: breaks out of COLUMN, pads back to its
            left edge, so cards start under the text and run off the viewport.
   CARD     390x529 portrait, 56px apart, snapping to centre.
   ──────────────────────────────────────────────────────────────────────── */

export const PAGE = layout.page;

export const COLUMN = layout.column;

export const RAIL_MASK =
  "relative left-1/2 w-screen -translate-x-1/2 -my-52 " +
  "[mask-image:linear-gradient(90deg,transparent_0%,#000_9%,#000_91%,transparent_100%)] " +
  "[-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_9%,#000_91%,transparent_100%)] " +
  "max-md:[mask-image:none] max-md:[-webkit-mask-image:none]";

export const RAIL_SCROLLER =
  // py/-my is not decoration: overflow-x-auto clips vertically too, so the
  // padding is the headroom the card glows bleed into and the negative margin
  // on RAIL_MASK takes the layout space back.
  "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-[320px] " +
  // The bang is load-bearing. globals.css sets `* { scrollbar-width: thin }`
  // outside any layer, and unlayered CSS outranks Tailwind's layered
  // utilities, so without it the rail paints a border-coloured bar across
  // the bottom of its section.
  "[scrollbar-width:none]! [&::-webkit-scrollbar]:hidden " +
  // Pads the full-bleed scroller back to COLUMN's left edge, off the same
  // --column as COLUMN itself so the two cannot drift apart.
  layout.scroller;

/* No overflow-hidden on purpose: the glow is meant to bleed past the card. */
export const CARD =
  "group relative flex shrink-0 snap-center flex-col " +
  "rounded-[24px] border bg-surface/40 p-7 pb-[25px] backdrop-blur-sm " +
  "shadow-[4px_6px_25px_rgba(0,0,0,0.56)] " +
  "mr-5 w-[80vw] max-w-[366px] min-h-[30rem] " +
  "lg:mr-14 lg:w-[390px] lg:max-w-none lg:min-h-[33rem]";

/** Visual shell of an inline icon tile. Deliberately carries no width, no
    margin and no opacity: those belong to the reveal, which owns them from
    the CSS module so the animation can drive them. */
export const TILE_SKIN =
  "inline-flex h-[1.5em] shrink-0 items-center justify-center overflow-hidden " +
  "rounded-[0.42em] border border-border bg-surface-2 align-middle " +
  "shadow-[0_2px_10px_rgba(0,0,0,0.4)] select-none";

export const TILE_GLYPH = "h-[0.82em] w-[0.82em] shrink-0";
