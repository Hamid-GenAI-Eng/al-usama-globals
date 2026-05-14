<div align="center">

# Al Usama Globals

**A modern, production-ready web application built with React 18, TypeScript & Shadcn/ui**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-al--usama--global.works-black?style=flat-square&logo=vercel)](https://al-usama-global.works)
[![TypeScript](https://img.shields.io/badge/TypeScript-98.7%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## Overview

Al Usama Globals is a full-featured React application shipping a rich, component-driven UI with a battle-tested modern stack. Built with strict TypeScript, powered by TanStack Query for async state, and validated with React Hook Form + Zod — it's the kind of setup you'd see in a serious production codebase.

🔗 **Live:** [al-usama-global.works](https://al-usama-global.works)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18.3 + Vite |
| **Language** | TypeScript (98.7%) |
| **UI Components** | Shadcn/ui · 20+ Radix UI primitives |
| **Styling** | Tailwind CSS 3.4 |
| **Routing** | React Router DOM 6.30 |
| **Data Fetching** | TanStack React Query v5 + Axios |
| **Forms & Validation** | React Hook Form 7 + Zod |
| **Charts** | Recharts 2.15 |
| **Icons** | Lucide React |
| **Notifications** | Sonner (toast) |
| **Theming** | Next Themes |
| **Testing** | Vitest (unit) + Playwright (E2E) |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
git clone https://github.com/Hamid-GenAI-Eng/al-usama-globals.git
cd al-usama-globals
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Dev-mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

---

## Project Structure

al-usama-globals/
├── src/              # Application source
├── public/           # Static assets
├── vite.config.ts    # Vite configuration
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── components.json   # Shadcn/ui metadata
└── vercel.json       # Deployment config

---

## UI Component System

This project uses **Shadcn/ui** — a collection of accessible, unstyled components built on Radix UI primitives, giving full control over styling without sacrificing functionality. Components used include accordion, dialog, dropdown menu, tabs, tooltips, sheets, and more.

---

## Testing

**Unit Testing** — Vitest with fast HMR-based test runner

**E2E Testing** — Playwright for full browser automation

```bash
npm run test           # unit tests
npx playwright test    # e2e tests
```

---

## Deployment

Deployed on **Vercel** with automatic CI/CD. Every push to `main` triggers a fresh production deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Hamid-GenAI-Eng/al-usama-globals)

---

## Built By

**Hamid Saifullah** — Tech Lead at [Code Envision Technologies](https://codeenvisiontechnologies.com)

[![GitHub](https://img.shields.io/badge/GitHub-Hamid--GenAI--Eng-181717?style=flat-square&logo=github)](https://github.com/Hamid-GenAI-Eng)
[![Portfolio](https://img.shields.io/badge/Portfolio-hamid--saifullah-black?style=flat-square&logo=vercel)](https://hamid-saifullah-portfolio-nexus.vercel.app)
