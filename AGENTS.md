# andremarinho.me Development Guide for AI Agents

Follow these instructions when working as an AI coding agent on this project.

## Overview

This repository contains André Marinho's personal website. Core technologies include:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Package Manager**: npm 10.21.0
- **Node Version**: 22
- **Content**: MDX
- **Testing**: Jest with React Testing Library
- **Deployment**: Vercel
- **CI**: GitHub Actions

## Architecture

- `src/app/`: Next.js App Router pages and layouts
- `src/components/`: Shared components
- `src/utils/`: Utility functions
- `src/types/`: TypeScript type definitions
- `.github/dependabot.yml`: Dependabot setup
- `.github/workflows`: GitHub Actions CI configs

## Development Workflow

### Commands

Use these npm scripts:

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm install`       | Install dependencies                           |
| `npm run dev`       | Start the development server                   |
| `npm run lint`      | Run ESLint over the source files               |
| `npm run typecheck` | Run the TypeScript compiler in `--noEmit` mode |
| `npm run test`      | Run Jest unit tests                            |

### Coding Best Practices

- Write all code in **TypeScript**.
- Do not use `any` types.
- Follow configured **Biome** rules.
- Use functional components with hooks.
- Prefer named exports for components.
- Before pushing changes, run: `lint`, `typecheck`, and `test`.

#### Testing

- Write tests for all new components and utilities.
- Store tests in the appropriate `tests/` folder.
- Use React Testing Library for component tests.
- Maintain or improve code coverage (tracked with Codecov).

#### Styles

- Use **Tailwind CSS** utility classes.
- Prioritize responsive, mobile-first design.
- Support both light and dark modes via next-themes.

#### Error Handling

- Use early returns to minimize nested logic.
- Throw descriptive errors with appropriate error codes.
- Prefer composition over prop drilling.

## Git Workflow

- Use clear, descriptive commit messages.
- Follow Conventional Commits: `feat:`, `fix:`, `refactor:`, etc.
  - Be specific (e.g., `fix: handle timezone edge case in page creation`), not generic (e.g., `fix: page bug`).
- Husky enforces linting and formatting in pre-commit hooks.
- CI runs on GitHub Actions (`.github/workflows/`).
- Keep commits focused and atomic.

## Resources

- [Repository](https://github.com/andre-lmarinho/andremarinho.me)
- [Live site](https://andremarinho.me/)
