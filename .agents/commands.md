# Build, Test & Development Commands

## Development Commands

- `npm run dev` - Start development server for web app

## Build Commands

- `npm run build` - Build all packages and apps
- `npm run vercel:build` - Run the same build used by Vercel
- `npm run postbuild` - Generate the sitemap after a successful build

## Lint & Type Check

- `npm run lint` - Run ESLint on codebase
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Run format check with Prettier

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
npm run test -- __tests__/components/layout.test.tsx

# Run a single test by name using Jest's -t flag
npm run test -- __tests__/components/layout.test.tsx -t "renders navigation links"

# E2E test specific file
e2e is not implemented

# Run specific test by name
e2e is not implemented
```
