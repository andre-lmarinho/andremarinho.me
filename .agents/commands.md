# Build, Test & Development Commands

## Development Commands

- `npm run dev` - Start development server for web app

## Build Commands

- `npm run build` - Run `next build` for the site (followed by sitemap generation via `postbuild`)
- `npm run vercel:build` - Run the same build used by Vercel
- `npm run postbuild` - Generate the sitemap after a successful build

## Lint & Type Check

- `npm run lint` - Run ESLint on codebase
- `npm run typecheck` - Run TypeScript type checking

## Testing Commands

### Unit Tests

- `npm run test` - Run the Jest test suite once
- `npm run test -- --watch` - Watch files and rerun tests on change
- `npm run test -- --coverage` - Generate coverage report

### End-to-End Tests

- AndreMarinho.me does not include automated end-to-end scripts.

## Useful Development Patterns

### Running Single Tests

```bash
# Run a specific test file
npm run test -- tests/app/page.test.tsx

# Run a single test by name using Jest's -t flag
npm run test -- tests/app/page.test.tsx -t "renders navigation links"
```
