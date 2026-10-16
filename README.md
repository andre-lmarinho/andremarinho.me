# andremarinho.me

Personal portfolio and blog built with Next.js, TypeScript, Tailwind CSS, and Markdown.

## Run locally

Use Node.js 24 and the pnpm version declared in [package.json](package.json).

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

## Checks

Before publishing changes, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

CI runs these checks on pull requests and pushes to `main`. Pull requests also
run Lighthouse against the production build.

## Content

Edit posts, project cases, and the `/llms.txt` overview in `content/`.
See the [content guide](content/README.md) for formatting and publication rules.

Replace `public/resume.pdf` to update the downloadable résumé at `/resume.pdf`.
