# andremarinho.me

Personal site built with Next.js, TypeScript, Tailwind CSS, and Markdown.

## Development

```bash
pnpm install
pnpm dev
```

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before shipping.

Lighthouse runs against the production build on pull requests.

## Content

Posts live in `content/posts`; projects live in `content/projects`. Entries
without a `date` are drafts and are visible only in development.

When a post is about a specific project, add the optional `project` field to
its frontmatter. Use the project's filename without `.md`:

```yaml
project: turistar
```

The post links to that project, and the project lists its related posts.
Missing or unpublished projects produce no related link in production;
projects without related posts show no related-content block.

For general articles that mention several projects, use contextual Markdown
links. Link technical evidence directly to public source files, tests, PRs,
or decision records, using commit permalinks for historical claims.

External HTTP(S) Markdown links open in a new tab with `noopener noreferrer`;
internal links stay in the same tab.
