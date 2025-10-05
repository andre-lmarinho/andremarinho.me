# AndreMarinho.me Development Guide for AI Agents

This directory contains comprehensive documentation for AI agents working on the andremarinho.me codebase.

## Quick Navigation

- **[Commands](commands.md)** - Build, test, and development commands
- **[Knowledge Base](knowledge-base.md)** - Knowledge base & best practices
- **[Architecture Overview](#architecture-overview)** - System structure and patterns

## Getting Started

AndreMarinho.me is a statically personal/portfolio site.

### Key Directories

- `src/app/` - App Router layouts, routed pages, and global providers
- `src/components/` - Reusable UI components, layouts, and sections

## Architecture Overview

### Database Layer

- **None**
- Content is sourced from static configuration files under `src/config/`.

### API Layer

- **None**
- All content is rendered through server and client components.

### Frontend

- **Next.js 14+** with App Router in some areas
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- Internationalization with `next-i18next`

## Common Patterns

### Error Handling

- Use early returns to reduce nesting
- Throw descriptive errors with proper error codes
- Prefer composition over prop drilling

### Performance

- Avoid O(n²) logic in backend code

### Security

- Never commit secrets or API keys
- Always validate input data
- Use proper authentication checks
- Never expose sensitive credential fields

## Testing Strategy

- **Unit tests** with Jest
- **Integration tests** for complex workflows
- **E2E tests** with Playwright
- Test files use `.test.ts` or `.spec.ts` extensions

## Pull Request Guidelines

For large PRs (>500 lines or >10 files):

- Split by feature boundaries
- Separate database migrations, backend logic, frontend components
- Create dependency chains that can be merged sequentially
- Pattern: Database → Backend → Frontend → Tests
