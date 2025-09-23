# Coding Standards & Best Practices

## Import Guidelines

### Type Imports

```typescript
// ✅ Good - Use type-only imports for TypeScript types
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// ❌ Bad - Value import when only a type is needed
import { Metadata } from 'next';
```

## Code Structure

### Early Returns

- Prefer early returns to reduce nesting, especially inside React components and utility helpers (e.g., `if (!link) return null;`).

### Composition Over Prop Drilling

- Compose UI from smaller components and context providers rather than passing deeply nested props.
- Extract shared UI patterns into `src/components/` and reuse them with explicit props.

### Security Rules

```typescript
// ❌ Never expose secret environment variables to the client
const apiKey = process.env.SECRET_API_KEY; // Avoid using non-public keys in shared code

// ✅ Prefer whitelisted public variables and explicit fallbacks
const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://andremarinho.me';
```
