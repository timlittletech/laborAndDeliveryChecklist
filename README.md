# littleL&D — Labor & Delivery Checklist

Per-shift workflow checklist for L&D nurses. Live at [checklist.littlelnd.com](https://checklist.littlelnd.com).

- 13 workflow categories (Triage through Reference)
- 8 flower-themed room markers — track multiple patients in memory simultaneously
- Inline fillable blanks for times, values, med names
- 15/30-min check time grid with notes
- Per-section custom item adder for one-off tasks
- Mobile-first; printable; never persists patient data

## Tech

Vite + React 18 + TypeScript + Tailwind v3. All content lives in [`src/content/checklists.json`](src/content/checklists.json) — see [CONTRIBUTING.md](CONTRIBUTING.md) for how to edit.

## Scripts

```bash
npm install
npm run dev               # http://localhost:5193
npm run typecheck
npm run validate-content  # AJV-validates checklists.json against the schema
npm run build             # validate-content + typecheck + vite build → dist/
npm run preview           # serve the built dist/
npm run deploy            # build, then push dist/ to the gh-pages branch
```

## Deploying to checklist.littlelnd.com

`npm run deploy` builds and pushes `dist/` to the `gh-pages` branch using the [`gh-pages`](https://www.npmjs.com/package/gh-pages) npm package. The `CNAME` file in `public/` keeps the custom domain wired up.

**First-time setup:** in the repo's GitHub Pages settings, set Source to *"Deploy from a branch"* → `gh-pages` / `/ (root)`.
