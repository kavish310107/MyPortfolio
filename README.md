# Personal OS: interactive portfolio

A premium, dark, futuristic personal portfolio that behaves like a small operating system: a floating dock instead of a navbar,
a ⌘/Ctrl + K command palette with global search, a rearrangeable dashboard of widgets, and a career timeline.
**Frontend only**: no backend, database or authentication. Email opens the visitor's own mail app or Gmail via `mailto:`.

All personal details are **placeholders** (`[YOUR NAME]`, `[YOUR PHOTO]`, …) so you can replace them from one place. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## What's inside

Home dashboard · About · Academics · Skills · Projects · Experience & activities · Achievements · Certificates · Activity feed ·
Career timeline · Blog (list + reader) · Resume · Contact (compose via mailto/Gmail) · social links · command palette & global search ·
keyboard shortcuts · drag-and-drop dashboard widgets · responsive layouts (320px → desktop) · reduced-motion support.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · React Router · Lucide React · dnd-kit (dashboard reordering only).
Fonts (Inter, JetBrains Mono) are bundled via Fontsource, so the site makes no third-party requests.

## Requirements

Node.js **20.19+** (or 22.12+) and npm.

## Run it

```bash
npm install
npm run dev        # development server with hot reload → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally → http://localhost:4173
```

## Make it yours

1. `npm run content:report`: lists every placeholder still to replace.
2. Edit the files in `src/data/` (guide: [CONTENT_GUIDE.md](CONTENT_GUIDE.md)). Put images in `public/images/` and your resume at `public/resume.pdf`.
3. `npm run check`: fails if personal text is hardcoded in a component, then builds.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` / `build` / `preview` | Develop, build for production, preview the build |
| `npm run content:report` | Placeholders and sample-number flags still left in `src/data` |
| `npm run content:lint` | Fails if placeholder text is hardcoded outside `src/data` |
| `npm run check` | `content:lint` + `build` |

## Project structure

```
src/
  data/          ← ALL replaceable content (profile, academics, projects, skills, blog, widgets, …)
  components/    layout (dock, status bar, shell) · palette (command palette) · widgets (dashboard) · ui · home · projects · timeline · …
  pages/         one file per route (lazy-loaded)
  hooks/ utils/  layout persistence, deep links, search scoring, link helpers, focus helpers
  index.css      design system: glass surfaces, cards, buttons, tokens
public/          favicon, _redirects (SPA fallback), images/, (add resume.pdf here)
scripts/         content audit + browser test/audit scripts (optional, see Testing)
```

## Keyboard shortcuts

`Ctrl/⌘ + K` or `/` open search & commands · `>` commands only · `?` shortcut list · `G` then a letter jumps to a page
(e.g. `G P` Projects) · `Esc` closes dialogs · `←` `→` step through projects.

## Deploying

It is a static site: upload `dist/` to any static host. Because it uses client-side routing, the host must serve `index.html` for unknown
paths. `public/_redirects` already does this for Netlify and Cloudflare Pages. For Vercel add a rewrite of `/(.*)` → `/index.html`.
For GitHub Pages copy `dist/index.html` to `dist/404.html`. If you deploy under a sub-path, set `base` in `vite.config.ts`.
Before publishing also edit the initial `<title>` and meta description in `index.html`.

## Notes on behaviour

* **Stored in the visitor's browser only** (`localStorage`): the dashboard layout and recent searches. Nothing is sent anywhere.
* **Sample numbers**: academics, skill levels and the activity heatmap ship with clearly badged sample values; set `isSample: false` in the data file once real.
* **Single dark theme** by design (the approved visual direction); there is no light-mode switch.

## Testing (optional)

`scripts/*.py` are Playwright browser checks (keyboard, focus, motion, responsive, accessibility via axe-core, link crawl).
They need Python Playwright (`pip install playwright && playwright install chromium`) and a running preview:
`npm run build && npm run preview -- --port 4180`, then e.g. `python3 scripts/hci-check.py` or `python3 scripts/audit.py`.
Run suites one at a time; they are timing-sensitive. `scripts/make-filled-copy.sh` + `scripts/filled-content-check.py` prove content can be
replaced from `src/data` alone.

## Docs

[CONTENT_GUIDE.md](CONTENT_GUIDE.md) · [PROJECT_STATE.md](PROJECT_STATE.md) (architecture & decisions) · [CHANGELOG.md](CHANGELOG.md) · [TODO.md](TODO.md)
