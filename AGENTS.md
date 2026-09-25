# navi_sheker

React 19 + Vite + TypeScript + Tailwind CSS v4, deployed as a static site to GitHub Pages (`base: '/navi_sheker/'`).

## Commands
- `npm run dev` – dev server (http://localhost:5173/navi_sheker/)
- `npm run lint` – oxlint
- `npm run build` – typecheck (`tsc -b`) + production build to `dist/`
- `npm run preview` – serve the built site

## Structure
- `src/hooks/useProphet.ts` – all game logic (magic mode, validation, timings). Ported 1:1 from `legacy/index.html`; do not change behavior.
- `src/constants/content.ts` – all texts, answers, links and timings.
- `src/components/` – UI components (Tailwind classes only). `MagicWand.tsx` is the standalone wand SVG.
- `src/index.css` – Tailwind entry: theme tokens, keyframes, base styles.
- `public/` – original images, kept at the same URLs.
- Deploy: `.github/workflows/deploy.yml` (Pages source must be "GitHub Actions").
