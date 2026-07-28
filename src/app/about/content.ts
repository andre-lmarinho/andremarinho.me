import type { IconType } from "react-icons";
import {
  FiBarChart2,
  FiCalendar,
  FiClipboard,
  FiCode,
  FiDatabase,
  FiFileText,
  FiGitBranch,
  FiGitPullRequest,
  FiGlobe,
  FiGrid,
  FiHardDrive,
  FiMail,
  FiPackage,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTrpc,
  SiTypescript,
  SiVitest,
} from "react-icons/si";

/** The icon draws the noun it sits next to, which decides which family it
    comes from. Narrative prose is about the work, so it gets Feather concept
    glyphs: a report, a grid, a box. Brand marks appear only where the subject
    genuinely is the tooling, which here is the closing stack cluster. The
    reference splits it the same way: concept icons for storage, network and
    compute, a vendor mark only where the text says "OpenAI".

    Two icon modes, both taken from the reference.

    Paired: the icon travels with the word it depicts and the two are kept on
    one line, because a tile stranded at a line break stops reading as part of
    the sentence. The word names it, so the tile is decorative. The tile
    follows the word by default; `before` puts it in front, which only reads
    well when the word is the subject rather than an object in a list. Any
    punctuation goes in `tail` so it lands after the tile instead of being
    stranded on the far side of it.

    Cluster: a run of tiles closing a sentence, with no words. Here the tile
    is the only thing carrying the meaning, so each one needs a real name. */
export type Piece =
  | string
  | { icon: IconType; word: string; tail?: string; before?: true }
  | { cluster: { icon: IconType; name: string }[] };

export const statements = {
  thesis: [
    "I was always a",
    { icon: FiCode, word: "developer", before: true },
    "and just did not know it. That is the tidy version, and half of it is true. The instincts were real. The craft was not.",
  ],

  instincts: [
    "They came from work nobody would have called engineering. A",
    { icon: FiFileText, word: "cash flow report" },
    "I automated with",
    { icon: FiGrid, word: "spreadsheets", tail: "." },
    { icon: FiPackage, word: "Stock control" },
    "I rebuilt on",
    { icon: FiBarChart2, word: "dashboards", tail: "." },
    "Then eight years of",
    { icon: FiGlobe, word: "client sites" },
    "and",
    { icon: FiTrendingUp, word: "acquisition", tail: "," },
    "scoping software that other people built.",
  ],

  now: [
    "I build it myself now, end to end.",
    {
      cluster: [
        { icon: SiTypescript, name: "TypeScript" },
        { icon: SiReact, name: "React" },
        { icon: SiNextdotjs, name: "Next.js" },
        { icon: SiNodedotjs, name: "Node.js" },
        { icon: SiTrpc, name: "tRPC" },
        { icon: SiPostgresql, name: "PostgreSQL" },
        { icon: SiVitest, name: "Vitest" },
      ],
    },
  ],

  transferred: [
    "What transferred was the judgement. Ask where the",
    { icon: FiHardDrive, word: "data" },
    "actually lives before designing on top of it. Read a",
    { icon: FiClipboard, word: "requirement" },
    "for the need underneath it. Ship on a",
    { icon: FiCalendar, word: "date", tail: "," },
    "because a perfect thing in November is worth less than a rough thing in August.",
  ],

  didNot: [
    "What did not was everything about being correct at scale.",
    { icon: FiDatabase, word: "Migrations" },
    "you cannot undo,",
    { icon: FiGitBranch, word: "concurrency", tail: "," },
    { icon: FiShield, word: "security boundaries", tail: "," },
    { icon: FiGitPullRequest, word: "code review" },
    "as a discipline rather than a formality. A dashboard has no adversary. A multi tenant SaaS with row level security has nothing but.",
  ],

  closing: [
    "What I want next is not a shortcut past the part I am missing. It is the demanding code review, and work that keeps outgrowing what I already know.",
  ],
} satisfies Record<string, Piece[]>;

export type StatementName = keyof typeof statements;

/** The closing link. A piece like any other, so it renders through the same
    path as the sentences and cannot drift away from how they animate. */
export const contact: Piece[] = [
  { icon: FiMail, word: "hey@andremarinho.me", before: true },
];

/** The pricing card's anatomy is name / big number / tagline / rule / list /
    pinned footer. Here the year takes the price slot, the outcome takes the
    CTA slot, and the current chapter is the highlighted tier. */
export const chapters = [
  {
    year: "2014",
    name: "Numbers",
    role: "Finance Assistant",
    org: "Grupo Hemocat",
    points: [
      "Reconciled supplier invoices and built the monthly cash flow report",
      "Automated it with spreadsheets and VBA to get my afternoon back",
      "Grew it into a panel that pulled the company's finances into one place",
    ],
    outcome: {
      label: "Learned",
      text: "What a database is, by needing one and not having one.",
    },
    featured: false,
  },
  {
    year: "2015",
    name: "Operations",
    role: "Logistics Supervisor",
    org: "Grupo Hemocat",
    points: [
      "Ran inventory and distribution of medical supplies across several states",
      "Rebuilt stock control and shipment tracking on dashboards",
      "Implemented ISO 9001 and ran the internal compliance audits",
    ],
    outcome: {
      label: "Learned",
      text: "That modelling is deciding what is true, and that is the hard part.",
    },
    featured: false,
  },
  {
    year: "2017",
    name: "Business",
    role: "Founder",
    org: "Duonorth Studio",
    points: [
      "Ran my own digital marketing agency for eight years, scope to renewal",
      "Directed client websites and digital products, brief to launch",
      "Led the performance project that took a client site from Lighthouse 37 to 98",
    ],
    outcome: {
      label: "Learned",
      text: "To tell what a client needs from what a client asked for.",
    },
    featured: false,
  },
  {
    year: "2025",
    name: "Code",
    role: "Full-Stack Developer",
    org: "Freelance",
    points: [
      "Stopped scoping software for other people to build and started building it",
      "Designed and shipped a client SaaS to production with paying subscribers",
      "Published a CLI on npm and an open source planner with users past me",
    ],
    outcome: {
      label: "Learning",
      text: "Correctness at scale: tests, types, migrations, security boundaries.",
    },
    featured: true,
  },
];
