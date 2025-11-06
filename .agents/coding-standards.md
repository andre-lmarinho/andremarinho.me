# Coding Standards & Best Practices

## Import Guidelines

### Type Imports

```typescript
// ✅ Good - Use type imports for TypeScript types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// ❌ Bad - Regular import for types
import { Metadata } from 'next';
```

## Code Structure

### Early Returns

- Prefer early returns to reduce nesting: `if (!page) return null;`

### Composition Over Prop Drilling

- Prefer composition patterns (e.g., `children`, context providers, custom hooks) over blindly forwarding long prop chains.
- Do **not** avoid props when a child component genuinely needs a typed contract from its parent—define the type at the owner level and pass it down explicitly.
- When in doubt, keep the single source of truth for props on the parent and share the type; composition should complement, not replace, clear prop typing.

## TypeScript Type Quality

- Define shared types in a single source of truth (often the parent component or a dedicated `*.types.ts` module) and import them where needed; never duplicate identical type declarations across files.
- Keep type names unique and descriptive—do not reuse the same identifier for different shapes or domains.
- When a parent component owns data, declare the type there and pass it down via props; child components should consume exported types rather than redefining or owning the parent’s contracts.
- Prefer explicit interfaces or type aliases over implicit `any` or overly broad types. Casting with `as any` remains forbidden.
- Validate that prop drilling respects the declared contracts before returning a task; junior-level mistakes like mis-typed props or incorrect import direction are blockers for completion.
