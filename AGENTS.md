# andremarinho.me Development Guide for AI Agents

**📖 Complete documentation is in the [.agents/](.agents/) directory.**

## Quick Reference

### Essential Commands

- `npm run dev` - Start the Next.js development server with hot reload
- `npm run build` - Create a production-ready build
- `npm run format` - Format the codebase with Prettier and Tailwind sorting
- `npm run lint` - Run ESLint across `src` and shared config files
- `npm run typecheck` - Execute the TypeScript compiler in `--noEmit` mode
- `npm run test` - Run the Jest and Testing Library suite
- `npm run vercel:build` - Replicate the Vercel deployment build locally

## Tool Preferences

### Search Tools Priority

Use tools in this order of preference:

1. **rg (ripgrep)** - For fast, project-wide text searches
2. **find** - For locating files by pattern when directory context matters
3. **grep** - As a fallback for simple inline matches when ripgrep is unavailable

## 📚 Detailed Documentation

- **[.agents/README.md](.agents/README.md)** - Complete development guide
- **[.agents/commands.md](.agents/commands.md)** - All build, test & dev commands
- **[.agents/knowledge-base.md](.agents/knowledge-base.md)** - Knowledge base & best practices
