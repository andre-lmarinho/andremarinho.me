# Build, Test & Development Commands

## Development Commands

- `npm run dev` - Start the Next.js development server on `http://localhost:3000`
- `npm run warmup` - Pre-warm Next.js caches (used for CI cold starts)
- `npm run serve:prod` - Serve the production build locally

## Build Commands

- `npm run build` - Build the application for production
- `npm run build:prod` - Alias of `npm run build` for CI pipelines
- `npm run vercel:build` - Run the same build command used by Vercel deployments
- `npm run postbuild` - Generate the sitemap after a successful build

## Lint & Type Check

- `npm run format` - Format source files with Prettier
- `npm run format:check` - Verify formatting without writing changes
- `npm run lint` - Run ESLint on `src` and config files
- `npm run lint:ci` - ESLint with `--max-warnings=0` for CI enforcement
- `npm run typecheck` - Run TypeScript compiler in `--noEmit` mode
- `npm run verify` - Run format check, lint, typecheck, tests, and production build sequentially

## Testing Commands

### Unit Tests

- `npm run test` - Run the Jest test suite once
- `npm run test -- --watch` - Watch files and rerun tests on change
- `npm run test -- --coverage` - Generate coverage report
- `npm run test:ci` - CI-friendly Jest run with deterministic output

### End-to-End Tests

- _No end-to-end test runner is configured. Coordinate with maintainers before introducing Cypress or Playwright._

## Database Commands

- _No database layer is used; content is statically defined in TypeScript files._

## App Store Commands

- _Not applicable to this portfolio site; there is no app store tooling._

## Useful Development Patterns

### Running Single Tests

```bash
# Run a specific test file
npm run test -- __tests__/components/layout.test.tsx

# Run a single test by name using Jest's -t flag
npm run test -- __tests__/components/layout.test.tsx -t "renders navigation links"
```

### Environment Setup

- Install dependencies: `npm install`
- Recommended Node.js version: 20.x LTS (aligns with Next.js 15 requirements)
- Optional: create `.env.local` for any `NEXT_PUBLIC_*` overrides used during development
- Run `npm run dev` to start the site and confirm both light and dark themes render correctly
