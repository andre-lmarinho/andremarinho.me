# Personal Portfolio – André Marinho

This repository powers **André Marinho’s personal portfolio**, a modern React + TypeScript SPA built with Vite and Tailwind CSS, showcasing dynamic UI features, SEO, and smooth user experiences.

🔗 [Live Demo](https://andre-lmarinho.github.io/Home/)
_or_ deploy easily to Vercel or Netlify with the same settings.

---

## 📋 Project Overview

**Key Features:**

- **Animated Background** — full‑screen gradients, orbs, mesh lines, and floating particles behind content
- **Smooth Scroll** — native CSS `scroll-behavior: smooth` for in‑page navigation
- **Dynamic Navbar** — hides on scroll down, reveals on scroll up using `useScrollPosition`
- **Dark/Light Mode** — user-toggleable theme via custom `useDarkMode` hook
- **Responsive Layout** — mobile‑first design with Tailwind utility classes and Framer Motion for animations
- **SEO Metadata** — dynamic `<title>` and `<meta>` tags via `react-helmet-async`

---

## 🚀 Technology Stack

- **Framework:** React 18 + TypeScript, Vite (JIT mode)
- **Styling:** Tailwind CSS (v3+) with `@apply`, custom keyframes, JIT
- **Animations:** Framer Motion, CSS keyframes
- **Icons:** lucide‑react
- **SEO:** react‑helmet‑async
- **Testing (boilerplate):** Vitest + Testing Library
- **Deployment Tools:** npm scripts, `gh-pages`

---

## 📂 Project Structure

```bash
├── public/                 # Static assets and `.nojekyll` to disable Jekyll
├── src/                    # Application source
│   ├── components/         # Each section in its own folder + shared UI
│   ├── data/               # Project and stack data
│   ├── hooks/              # Custom React hooks
│   ├── index.css           # Tailwind directives & custom styles
│   ├── main.tsx            # Entry point with HelmetProvider
│   └── App.tsx             # Root component
├── tailwind.config.js      # Tailwind config (colors, animations, JIT content)
├── vite.config.ts          # Vite config (base path, plugins)
├── tsconfig.json           # TypeScript compiler options
├── package.json            # Scripts & dependencies
└── README.md               # This documentation
```

---

## 💻 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/andre-lmarinho/Home.git
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

## 📦 NPM Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — generate production build in `/dist`
- `npm run preview` — serve `/dist` locally
- `npm run deploy` — _(optional)_ build & publish to GitHub Pages (requires `predeploy` script)
- `npm test` — run Vitest

_Add these lines to `package.json` if using `gh-pages`:_

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

---

## ☁️ Deployment

**GitHub Actions:**
You can automate deployment to `gh-pages` using a workflow file.

**Manual (gh-pages):**

```bash
npm run deploy
```

Then visit `https://<username>.github.io/<repo>/`.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
Feel free to reuse and adapt!

---

_Last updated: 2025-06-29_
