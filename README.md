# Personal Portfolio - Andre Marinho

This repository powers **Andre Marinho's personal portfolio**, built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**. The site highlights motion design, theme switching, and carefully structured content for future growth.

- [Website](https://andremarinho.me)
- Deploy-ready for Vercel with the included configuration.

---

## Highlights

- **Static-first Next.js app** with typed metadata plus App Router handlers for the sitemap and robots directives.
- **Security hardened by default** thanks to a shared HTTP header helper that ships HSTS, CSP, COOP/COEP, and other protective directives.
- **Accessibility first**: keyboard focus styles and semantic landmarks for predictable navigation.
- **Dark/light theming** handled by a shared context with persisted preference.
- **Typed content layer** for hero, projects, and work history.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS 3 with custom keyframes and design tokens
- **Icons:** lucide-react
- **Tooling:** ESLint, Prettier, Jest + Testing Library (Lighthouse CI remains available for ad-hoc audits)
- **Deployment:** Vercel build output

---

## Security & SEO

### Hardened response headers

All routes share the same header policy configured in [`next.config.js`](next.config.js):

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' https: data:; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'`
- `X-DNS-Prefetch-Control: off`
- `X-Permitted-Cross-Domain-Policies: none`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

The Content Security Policy doubles as the `contentSecurityPolicy` for remote images to guarantee parity.

### Crawling helpers

App Router route handlers emit both `robots.txt` and `sitemap.xml`, keeping canonical URLs typed alongside the source. Update those handlers whenever you add or remove a top-level route so crawlers stay in sync.

### Accessibility affordances

Semantic sections, heading structure, and visible focus states ensure predictable navigation for keyboard and assistive technology users across devices.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and run locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) after the dev server boots.

### Build and serve production output

```bash
# Create an optimized production build
npm run build

# Serve the production build locally
npm start
```

---

## Local testing & verification

Run individual quality gates as needed:

| Command                | Purpose                                        |
| ---------------------- | ---------------------------------------------- |
| `npm run lint`         | Run ESLint with the project defaults.          |
| `npm run typecheck`    | Execute TypeScript in no-emit mode.            |
| `npm run test`         | Execute the Jest + Testing Library suites.     |
| `npm run vercel:build` | Reproduce the Vercel production build locally. |
| `npm run format`       | Format files with Prettier.                    |

Use `npm run verify` to chain `format:check`, `lint:ci`, `typecheck`, `test:ci`, and `build:prod` together. It mirrors the GitHub Actions verify workflow so local runs match CI exactly.

## Deployment

The project is configured for Vercel:

- Incoming traffic is normalized by [`vercel.json`](vercel.json), forcing HTTPS and consolidating `www.andremarinho.me` to the apex domain.
- Long-lived caching headers (`Cache-Control: public,max-age=31536000,immutable`) apply to hashed build artefacts, including `/_next/static/**`, `/_next/data/**`, and any fingerprinted assets.

Use `npm run vercel:build` to validate the production build locally before promoting changes.

---

## Continuous integration

- **Verify** – Runs on pushes to `main` and every pull request. It installs dependencies and executes `npm run ci` (aliasing `npm run verify`) so formatting, linting, type checking, tests, and the production build all pass together.
- **CodeQL** – Periodic static-analysis scan for common security issues.
- **Lighthouse (optional)** – A standalone workflow and the `npm run lhci` script remain available for manual performance checks but are not required for the minimal stack.

---

## License

This project is open-source under the [MIT License](LICENSE). Feel free to reuse and adapt.
