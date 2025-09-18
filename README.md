# Personal Portfolio - Andre Marinho

This repository powers **Andre Marinho's personal portfolio**, now built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. The site highlights motion design, theme switching, and carefully structured content for future growth.

- [Live Demo](https://andremarinho.vercel.app/)
- Deploy-ready for Vercel with the included configuration.

---

## Highlights

- **Static-first Next.js app** with the App Router and typed metadata
- **Dark/light theme** handled by a shared context and persisted preference
- **Framer-inspired visuals** (background gradients, code spotlight)
- **Accessibility first**: skip links, keyboard focus styles, semantic landmarks
- **Typed content layer** for hero, projects, and work history

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS 3 with custom keyframes and design tokens
- **Animations:** Tailwind motion utilities (ready for Framer Motion integration)
- **Icons:** lucide-react
- **Tooling:** ESLint, Prettier, Jest + Testing Library
- **Deployment:** Vercel build output

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm 9+

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start the production server locally
npm start
```

---

## Scripts

- `npm run dev` - start Next.js dev server
- `npm run build` - create a production build
- `npm run start` - serve the production build
- `npm run lint` - run ESLint with Next.js rules
- `npm run typecheck` - execute TypeScript in no-emit mode
- `npm run test` - run Jest + Testing Library
- `npm run format` - format with Prettier
- `npm run vercel:build` - build using the same command executed by Vercel

---

## Testing and Quality Gates

Ensure all checks pass before shipping:

```bash
npm run format
npm run lint
npm run typecheck
npm run test
npm run vercel:build
```

---

## Deployment

The project is configured for Vercel. To validate the deployment locally run:

```bash
npm run vercel:build
```

The `.vercel` directory is updated automatically by Vercel CLI builds.

---

## License

This project is open-source under the [MIT License](LICENSE). Feel free to reuse and adapt.
