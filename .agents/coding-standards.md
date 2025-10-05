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

- Use React children and context instead of passing props through multiple components
