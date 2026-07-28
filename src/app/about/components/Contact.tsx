import { contact } from "../content";
import Nodes from "./Nodes";
import styles from "./reveal.module.css";

/** The single button the reference closes on. It sits on the same reveal
    curve as the statements above it, taking the index right after the last
    of them, so it arrives as the closing beat of that block rather than as a
    separate element with its own timing.

    Its innards go through Nodes like every other piece: the tile is not
    rebuilt here, so it cannot animate differently from the ones in the text. */
export default function Contact({ offset }: { offset: number }) {
  return (
    <a
      href="mailto:hey@andremarinho.me"
      className={`${styles.link} mt-12 inline-block rounded text-2xl font-medium text-accent transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-[2rem]`}
    >
      <Nodes pieces={contact} offset={offset} />
    </a>
  );
}
