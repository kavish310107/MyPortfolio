# CHANGELOG
## 0.1.0 - Foundation
- Project scaffold, design system, app shell, floating dock, routes, Home shell.

## 0.2.0 - Home dashboard
- Bento-grid Home with shared Widget system, count-up stats, sample activity heatmap, featured projects, achievements, timeline preview.

## 0.3.0 - Navigation system
- Finalized dock, command palette, global search index, keyboard shortcuts, toast feedback.

## 0.4.0 - About, Academics, Skills
- Three new pages with placeholder data modules and shared meters; skills indexed in global search.

## 0.5.0 - Projects + QA pass
- Projects page, cards, modal, filters. Fixed: palette input not focused on open, modal exit hang (layoutId), slow exit springs, heavy blur-filter orbs; focus fallback to main.

## 0.6.0 - Experience & Achievements
- Reusable Timeline + AchievementCard + TypeFilter; data-driven entries; indexed in global search.

## 0.8.0 - Resume, Social Links, Contact
- Resume viewer + actions, Contact compose window (mailto\/Gmail, no backend), social link cards, resume palette action. Verified placeholder and configured states in browser.

## 0.9.0 - Dashboard widget system
- Registry-driven Home, drag\/keyboard reorder, hide\/restore, persisted layout, 5 new snapshot widgets, compact heatmap, h1 cleanup.

## 0.10.0 - Motion pass
- Centralised motion tokens, faster page transitions, palette highlight, dock/menu/modals/toolbars/status bar/timeline polish, card spotlight, reduced-motion coverage.

## 0.11.0 - Responsive, accessibility and HCI pass
- axe-clean at 320-1440px; card/modal/palette/touch refinements; route announcements; confirmations; contrast fixes.

## 0.12.0 - Global interaction layer
- Coherent search over pages, projects, skills, experience, achievements, certificates, blog, timeline; deep-link to the exact entry; recents; commands mode; shortcuts help; focus-management fixes; page-transition (live Outlet) bug fix.

## 0.13.0 - Visual polish
- Timeline built; placeholder noise reduced; de-duplicated Achievements\/Activity\/Contact; shared empty + loading states; lazy routes; footer + scrim; consistent depth, pills and thumbnails; 320px overflow fix.

## 0.14.0 - Content architecture
- Single-sourced content in src/data; new profile/contact/site/pages/widgets files; sample flags; real-image support; content audit tooling and owner guide; honest derived stats; AnimatedNumber decimals (CGPA 8.5 no longer shows 9).

## 1.0.0 - Final review and delivery
- Final audit: 0 dev-mode warnings, all links resolve, no external requests, axe clean at 320–1440px. Self-hosted fonts, favicon, SPA redirect, README, package engines. Removed dead code.
