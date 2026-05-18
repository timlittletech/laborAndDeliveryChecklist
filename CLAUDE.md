# Working in this repo

This file is read automatically by every Claude Code agent that opens this repo. Keep it short; details live in [CONTRIBUTING.md](CONTRIBUTING.md).

## What this is

[littleL&D](https://checklist.littlelnd.com) — a per-shift Labor & Delivery workflow checklist. Vite + React 18 + TypeScript + Tailwind v3. All content lives in [`src/content/checklists.json`](src/content/checklists.json), validated by [`src/content/checklists.schema.json`](src/content/checklists.schema.json) at build time.

## Source of truth

- **Checklist content:** `src/content/checklists.json` (edit JSON, never component code, for content changes).
- **Brand tokens, logo, room markers:** [`brand.html`](brand.html) is canonical. Tailwind config + components mirror it.
- **Editing recipes:** [CONTRIBUTING.md](CONTRIBUTING.md) has the full guide to adding categories / subcategories / items / blanks / widgets.

## Working rules

1. **Never edit `main` directly.** Branch off `main` for every change, even a one-line JSON tweak:
   ```bash
   git checkout main && git pull
   git checkout -b <who>/<short-description>
   ```
   Branch names use the pattern `tim/add-induction-item`, `emily/fix-discharge`, `claude/refactor-printoverlay`. Open a PR when done; don't push directly to `main`.

2. **Validate before you commit.** A pre-commit hook runs `npm run validate-content`, but run it yourself first if you're suspicious:
   ```bash
   npm run build      # validate-content + typecheck + vite build
   ```
   The pre-commit hook will block bad JSON; the GitHub Actions CI will block bad JSON or type errors from merging.

3. **One task = one branch = one PR.** Don't bundle unrelated changes. If you notice something else worth fixing, flag it for a separate task rather than sneaking it in.

4. **Don't run `npm run deploy` from CI or from another agent's branch.** Deploys go out manually from `main`, after a PR is merged.

5. **Patient data is never persisted.** All room state is in-memory only. Don't add `localStorage`, cookies, or analytics that capture form values.

## Multi-agent etiquette

- Tell the user which branch you're on at the start of work, and again before you push.
- If two agents are working in parallel (e.g. Tim's Claude + Emily's Claude), each should be on its own branch. The branch name should make ownership obvious.
- Coordinate big changes (schema edits, brand refresh, deleting categories) verbally first — don't race.

## Commands you'll use

```bash
npm install                # first-time setup; also installs the git pre-commit hook
npm run dev                # http://localhost:5193
npm run validate-content   # AJV-validates checklists.json against the schema
npm run typecheck          # tsc --noEmit
npm run build              # validate + typecheck + vite build
npm run deploy             # build, then push dist/ to gh-pages (only from main, only manually)
```

## Things to never do without asking

- Force-push to `main` or `gh-pages`.
- Delete a branch with unmerged work.
- Bypass the pre-commit hook (`--no-verify`).
- Change `tailwind.config.ts` colors without checking `brand.html`.
- Change the JSON schema without also updating [`src/types/checklist.ts`](src/types/checklist.ts) and considering whether existing content still validates.
