# Sahil Gaund — AI/ML Portfolio

A production-grade personal portfolio built with React + Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## 🏗️ Tech Stack

- **React 18** + **Vite** — Fast dev/build tooling
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **React Icons** — Icon library
- **GitHub REST API** — Live project data
- **React Helmet Async** — SEO meta tags

## 📁 Folder Structure

```
src/
├── components/   # Reusable UI components (Navbar, ProjectCard, etc.)
├── sections/     # Page sections (Hero, About, Projects, Skills, Timeline, Contact)
├── hooks/        # Custom React hooks (useGitHubRepos, useTyping, useScrollSpy, useScrollProgress)
├── utils/        # Data (certifications, skills, experience)
├── context/      # ThemeContext (dark/light mode)
├── App.jsx       # Root component
└── main.jsx      # Entry point
```

## 🎨 Features

- ✅ Dark/Light mode with localStorage persistence
- ✅ Live GitHub repo fetching with smart ML/Data/Web classification
- ✅ Featured project always highlighted (Bank Customer Churn Prediction)
- ✅ Animated typing effect in hero
- ✅ Scroll-triggered animations (Framer Motion)
- ✅ Scroll progress bar
- ✅ Scroll spy active nav highlighting
- ✅ Back-to-top button
- ✅ Skeleton loaders for GitHub data
- ✅ Responsive (mobile-first)
- ✅ SEO meta tags
- ✅ Glassmorphism UI design
- ✅ Lazy-loaded below-fold sections

## 🌐 Deployment

### Vercel
```bash
npm run build
# Deploy dist/ folder
```

### Netlify
Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## 📧 Contact Form

Currently uses `mailto:` fallback. To enable EmailJS:
1. Sign up at https://emailjs.com
2. Add service/template IDs to `src/sections/Contact.jsx`
3. Install: `npm install @emailjs/browser`
