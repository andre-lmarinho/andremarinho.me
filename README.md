# Personal Portfolio – André Marinho

This repository contains the source code for my **personal portfolio site**, originally built as a CS50 PSet 8 exercise and later evolved into a React + TypeScript SPA with Tailwind CSS.

---

## 📋 Project Overview

The site features:

* **Dynamic Navbar:** fixed at the top and hides/shows on scroll.
* **Light/Dark Mode:** user-controlled theme with smooth transitions.
* **Full Responsiveness:** optimized for mobile, tablet, and desktop.

---

## 🚀 Technologies

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS, custom CSS
* **Animations:** CSS keyframes, custom React hook for animated gradient text
* **Icons:** lucide-react, Simple Icons CDN
* **Form Handling:** native validation with JavaScript feedback
* **Tooling:** npm, PostCSS, Autoprefixer, Vitest (boilerplate)

---

## 📂 Folder Structure

```
/  
├── public/               # Static assets (PDFs, images, favicon)
│   └── assets/
├── src/                  # Source files
│   ├── components/       # React components (Navbar, Hero, About, Projects, Stacks, Contact)
│   ├── hooks/            # Custom hooks (e.g. useGradientText)
│   ├── index.css         # Main CSS with Tailwind directives and custom styles
│   ├── main.tsx          # React entry point
│   └── App.tsx           # Global layout and dark mode toggle
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS plugins
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── package.json          # npm dependencies and scripts
└── README.md             # Project documentation
```

---

## 💻 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/andre-marinho/portfolio.git
   cd portfolio
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm run dev
   ```
4. **Open in browser**
   Navigate to `http://localhost:5173` to view the site.

---

## 📦 Available Scripts

* `npm run dev` — Start the development server.
* `npm run build` — Build the production bundle into `/dist`.
* `npm run preview` — Preview the production build locally.
* `npm test` — Run tests with Vitest (preconfigured).

---

## ☁️ Deployment

I recommend hosting on platforms like **Vercel** or **Netlify**. Connect your repository, set the build command (`npm run build`), and the output directory (`dist`).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
