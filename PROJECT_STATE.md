# PROJECT_STATE
Frontend-only personal OS portfolio. Stack: React, TS, Vite, Tailwind 3, Framer Motion, React Router, Lucide.

## Done (Stage 1: Foundation)
- Design system in `src/index.css` (glass, card, btn, input, placeholder-tag) + Tailwind tokens
- App shell: animated background, status bar, floating bottom dock (primary + "More" menu), page transitions
- Routes for all 11 areas (data-driven from `src/data/navigation.ts`); Home dashboard shell; `SectionPage` placeholders
- Placeholder content in `src/data/profile.ts`

- Stage 2: Home dashboard (hero, stats, focus, activity, projects, achievements, timeline, quick launch); data in `src/data/home.ts`, widgets in `src/components/home`, shared `Widget`/`AnimatedNumber`/`motion`

- Stage 3: navigation + command system. Dock (active dot, Esc/outside-click/focus mgmt, search button), Ctrl+K palette (`components/palette`), `G`+letter shortcuts, `/` opens palette, toast feedback, search foundation (`data/searchIndex.ts` + `utils/search.ts`; add content via `contentSources`)

- Stage 4: About, Academics (ring, semester chart, degree progress, timeline, coursework), Skills (category filter tabs, expandable cards, level dots); data in `data/{about,academics,skills}.ts`; `ui/Meters`; skills added to search

- Stage 5: Projects (filters, search, status, deep-linkable detail modal `?p=id`, prev/next, external-link guard); `data/projects.ts` is the single source (Home featured + search derive from it)
- Browser test #1 done (26 checks, `scripts/browser-check.py`, needs `vite preview --port 4180`). Next scheduled browser test: after prompt 10.
- Perf rule: never animate large CSS-blur elements; use radial-gradients (fixed 2fps->28fps in software rendering)

- Stage 6: Experience (reusable `components/timeline/Timeline`, type filter, expandable entries) and Achievements (featured row + filtered grid, `AchievementCard`); data in `data/experience.ts` and `data/achievements.ts`; Home achievements + search derive from them; shared `ui/TypeFilter`, `utils/links.ts`

- Stage 8: Resume (PDF preview via `<object>` when `resumeUrl` is set, placeholder paper otherwise, open/download, section index), Contact (OS-style Mail compose window -> mailto/Gmail only, status widget, link cards), social links (`data/socials.ts`, URLs live in `profile.ts`); palette action "Open resume (PDF)"; `utils/links` mailto/gmail helpers
- To go live: set `email`, `resumeUrl` (file in `public/`) and social URLs in `src/data/profile.ts`

- Stage 9: Widget system. Registry `components/widgets/registry.tsx` (12 widgets, sizes third/twoThirds/full), `WidgetGrid` (dnd-kit sortable, handle-only drag, keyboard sensor + announcements), `DashboardToolbar` (Customize, hide/restore, reset), `useDashboardLayout` (localStorage `portfolio-os:dashboard-layout:v1`, defensive load). New snapshot widgets: skills, academics, links, activity feed, quick launch. Widgets no longer own grid spans; wrappers carry `data-widget-id`.

- Stage 10: Motion pass. Tokens in `components/ui/motion.ts` (ease, dur, spring.snappy/soft/pill, pageVariants, scrim, sheet). Page transition ~0.12s out + 0.3s in + scroll-to-top on route change; PageHeader staged entrance; dock entrance + staggered More menu; palette sliding highlight (layoutId); modals share scrim/sheet; edit panel height animation; status bar firms up on scroll; timeline dots settle in; cursor-following card glow (`hooks/useSpotlight`, CSS vars, fine pointers only); `.btn` hover lift. Reduced motion: MotionConfig reducedMotion="user" + static orbs + glow/lift off.
- Browser tests: `scripts/*.py` (need `vite preview --port 4180`). Test-timing note: wait ~1s after entering Customize mode before dragging (panel animates height).

- Stage 11: Responsive/a11y/HCI pass. `scripts/audit.py` (axe-core + overflow + touch targets, 5 widths incl. 320, all routes + palette + More menu) reports 0 axe violations, 0 overflow, 0 small targets. Stretched-button cards (title is the button, ::after covers card); route announcer + document.title; status-bar breadcrumb; palette touch close; tablet widget row balancing (`tabletStretch`); mobile semester chart as rows; two-step layout reset; AA-safe primary button; text-white/60 floor; 16px inputs on mobile; safe-area insets; forced-colors styles. Run audits after animations settle (~2s).

- Stage 12: Global interaction layer. Search: `utils/search.ts` (scored, fuzzy, grouped, highlighted), index entries carry type icon + meta chip + deep link (`?focus=<id>` handled by `hooks/useDeepLink`, `data-focus-id` on skill/experience/achievement items), Recent (`utils/recent.ts`), `>` commands mode, no-match fallback to Browse pages. Shortcuts: Ctrl/⌘K (repeat/IME/physical-key safe), `/`, `?` help dialog, `G`+key with visible hint; all disabled while a dialog is open. Focus: palette nav -> new `<main>` (`utils/navFocus.ts`, fired on exit-complete), dialogs restore only to connected elements, stable input ref. Nav consistency: `utils/nav.ts` (`isActivePath`) used by dock, status bar, title, palette. FIXED: AppShell used a live `<Outlet/>` so the exiting page wrapper rendered the NEW route (double mount, lost focus) -> `useOutlet()`; page transition now 0.08s out + 0.24s in.
- Suites in `scripts/` (all green): browser-check, stage7-check, widgets-check, motion-check, hci-check, global-layer-check, audit.py

- Stage 13: Visual polish. Timeline page built (`data/timeline.ts` composes journey from academics/experience/projects/achievements; Home preview + search derive from it). Placeholder tags: quiet dashed style, underline-only inside headings/`[data-title]`. Shared `EmptyState`, `PageSkeleton` (lazy routes + idle prefetch), footer, bottom scrim, uniform card hover depth, calm project thumbnails, Achievements de-duplicated, Activity pinned-focus row removed, Contact links compact, Skills pills aligned with all filters, `.card{min-width:0}`. `scripts/shots.py` builds contact sheets for visual review; `scripts/polish-check.py` covers the new structure.

- Stage 14: Content architecture. All personal/replaceable content is in `src/data` (profile, academics, about, skills, projects, experience, achievements, certificates, blog, activity, timeline (derived), resume, contact, pages, widgets, site, socials). Removed duplicates (university, location, focus now single-sourced), invented Home stats (now counted from data), homeMeta. Sample numbers are flagged (`isSample`) and drive every badge/label. Real-image support (photo, project, certificate, blog cover). Widgets configured in `data/widgets.ts` (order, size, default visibility). `scripts/content-audit.mjs` (`npm run content:report|content:lint|check`), `CONTENT_GUIDE.md`, `scripts/make-filled-copy.sh` + `filled-content-check.py` prove content is replaceable from data alone.

- FINAL (1.0.0): full review pass. Self-hosted fonts (@fontsource), favicon, `_redirects`, package metadata + engines, README. Removed dead `Card.tsx`. Sample badge on the Home CGPA tile. `scripts/final-review.py` (dev React-warning sweep + production link/network crawl).

## Structure
`src/{components/{layout,ui},pages,data,hooks,utils,assets}`
