﻿# Project Agents.md Guide

This `Agents.md` file provides comprehensive guidance for any AI agents working with this codebase.

## Project Structure

- `/src`: Source code to be analyzed and maintained by AI agents
  - `/app`: Next.js App Router entry point (layout, pages, providers)
  - `/components`: Shared UI, sections, and layout building blocks

## Coding Conventions

- **Language**: All documentation, inline code comments, commit messages and PR descriptions must be written in English.
- **Formatting**: Run `npm run format` before committing. The project uses Prettier with semicolons, single quotes and `printWidth` 100.
- **Linting**: Ensure `npm run lint` passes.
- **Tests**: Execute `npm run test` and make sure tests succeed.
- **Type Checking**: Verify `npm run typecheck` completes without errors.
- **Vercel Build**: Run `npm run vercel:build` to confirm the deployment build succeeds.
- **Commit style**: Use short, imperative, English commit messages. Prefix with `feat:`, `fix:`, `chore:`, etc. when applicable.

## General Conventions for AI Agents

- Use TypeScript for all new code.
- Follow the existing code style in each file.
- Write meaningful variable and function names.
- Add comments for complex logic.

## React Components Guidelines

- Use functional components with hooks.
- Keep components small and focused.
- Always define prop types properly.
- Use PascalCase for component filenames.

## CSS/Styling Standards

- Use Tailwind CSS for styling.
- Follow a utility-first approach.
- Write custom CSS only when necessary.

## Testing Requirements

Run tests using the following commands:

```bash
# Run all tests
npm run test

# Run a specific test file
npm run test -- file.test.tsx

# Run tests with coverage
npm run test -- --coverage
```
