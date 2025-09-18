# Personal Portfolio – André Marinho

This repository powers **André Marinho’s personal portfolio**, a modern React + TypeScript SPA built with Vite and Tailwind CSS, showcasing dynamic UI features, SEO, and smooth user experiences.

🔗 [Live](https://andremarinho.me/)
_or_ deploy easily to Vercel with the same settings.

---

## 🚀 Key Features

- **Animated Background** — full‑screen gradients, orbs, mesh lines, and floating particles behind content
- **Smooth Scroll** — native CSS `scroll-behavior: smooth` for in‑page navigation
- **Dynamic Navbar** — hides on scroll down, reveals on scroll up.
- **Dark/Light Mode** — user-toggleable theme via custom `useDarkMode` hook
- **Responsive Layout** — mobile‑first design with Tailwind utility classes and Framer Motion for animations
- **SEO Metadata** — dynamic `<title>` and `<meta>` tags via `react-helmet-async`

---

## 🏗️ Tech Stack

- **Framework:** React 18 + TypeScript, Vite (JIT mode)
- **Styling:** Tailwind CSS (v3+) with `@apply`, custom keyframes, JIT
- **Animations:** Framer Motion, CSS keyframes
- **Icons:** w3.org.svg
- **SEO:** react‑helmet‑async
- **Testing (boilerplate):** Vitest + Testing Library
- **Deployment Tools:** npm scripts

---

## 📁 Project Structure

- `/src`: Source code to be analyzed and maintained by AI agents
  - `/components`: React components that should follow the guidelines in this document

---

## 💻 Getting Started

**Prerequisites**: Node.js v16+, npm

1. **Clone the repo**

   ```bash
   git clone https://github.com/andre-lmarinho/andremarinho.me.git
   cd Home
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview the build**

   ```bash
   npm run preview
   ```

---

## 📦 Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — generate production build in `/dist`
- `npm run preview` — serve `/dist` locally
- `npm run typecheck` — run TypeScript type checks
- `npm run vercel:build` — test a Vercel deployment build
- `npm run lint` — check code with ESLint
- `npm run format` — format files with Prettier
- `npm test` — run Vitest

### Linting, formatting & testing

Before submitting changes, ensure the following commands pass:

```bash
npm run format
npm run lint
npm run typecheck
npm test
npm run vercel:build
```

---

## ☁️ Deployment

This project is deployed via [Vercel](https://vercel.com/). To verify a deployment build locally, run:

```bash
npm run vercel:build
```

The output in `.vercel/output` can then be deployed through Vercel.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
Feel free to reuse and adapt!
