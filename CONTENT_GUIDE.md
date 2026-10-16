# Content guide: make this site yours

**Everything personal lives in `src/data/`.** You never need to edit a component, page or style to replace content.
Anything still in square brackets, like `[YOUR NAME]`, is a **placeholder**: the site highlights it in amber and never turns it into a live link.

## Quick start

1. Run `npm run content:report`. It lists every placeholder still left, file by file.
2. Fill in the files below, top to bottom. The site hot-reloads (`npm run dev`).
3. Run `npm run check` before deploying. It fails if anyone hardcodes personal text in a component, then builds.

## Where each thing lives

| You want to change | Edit this file | Notes |
|---|---|---|
| Name, title, intro, photo, location, availability, current focus, **email**, **resume PDF**, GitHub / LinkedIn / other profiles | `src/data/profile.ts` | Single source for identity. Also feeds the tab title, status bar, footer, hero and Contact. |
| University, degree, specialization, CGPA, credits, semester scores, coursework, academic timeline | `src/data/academics.ts` | Set `isSample: false` once the numbers are real; the "SAMPLE DATA" badges disappear everywhere. |
| About page: bio, interests, career direction, highlights, quick facts | `src/data/about.ts` | Location and focus come from `profile.ts`. |
| Skills and levels (1–5) | `src/data/skills.ts` | Set `skillsMeta.isSample` to `false` when levels are yours. |
| Projects (title, links, image, tech, highlights, status, featured) | `src/data/projects.ts` | `featured: true` shows it on Home. Home counts and search update automatically. |
| Internships, work, clubs, competitions, leadership, volunteering | `src/data/experience.ts` | Appears on Experience, the Timeline and in search. |
| Awards, competitions, milestones | `src/data/achievements.ts` | `featured: true` shows it on Home and the Timeline. |
| Certificates (title, issuer, date, credential link, image/PDF) | `src/data/certificates.ts` | Image files preview inline; PDFs show a PDF badge. |
| Blog posts | `src/data/blog.ts` | Content is a list of typed blocks (`h2`, `p`, `quote`, `ul`). |
| Activity feed (learning, events) and the activity heatmap | `src/data/activity.ts` | Projects, achievements and certificates appear automatically. |
| Career timeline | `src/data/timeline.ts` | **Computed** from academics, experience, projects and achievements. Rarely needs editing. |
| Resume page details (last updated, page count, summary) | `src/data/resume.ts` | The PDF itself is `resumeUrl` in `profile.ts`. |
| Contact: reply time, subject chips, notes | `src/data/contact.ts` | The address is `email` in `profile.ts`. |
| Page titles and descriptions | `src/data/pages.ts` | |
| Dashboard widgets: which exist, size, **default order and visibility** | `src/data/widgets.ts` | Reorder the list, or add `visible: false` to hide one by default. |
| Brand name, tab title format, footer | `src/data/site.ts` | Safe to leave as-is. |

## Replacing placeholders

* **Text**: replace the whole bracketed string: `'[YOUR NAME]'` → `'Ada Lovelace'`.
* **Links** (GitHub, demo, credential…): a real URL makes the button live; an unfilled `[…]` shows a disabled button, never a broken link.
* **Images**: put the file in `public/images/` and use its path: `photo: '/images/me.jpg'`. See `public/images/README.md`.
* **Resume**: put the PDF in `public/` and set `resumeUrl: '/resume.pdf'`. The Resume page then embeds it with Open and Download buttons.
* **Adding entries**: copy an existing entry, change its `id` (must be unique) and the text. Search, Home and the Timeline pick it up.
* **Fewer than the example entries?** Delete the extras; nothing else references them.

## Sample numbers

Academics, skill levels and the activity heatmap ship with **sample numbers** so the charts look complete. They are flagged
(`isSample: true`), badged "SAMPLE DATA", and `npm run content:report` lists them. Replace with real figures or remove the section.

## Also edit outside `src/data`

* `index.html`: the initial `<title>` and `<meta name="description">` (shown before the app loads and to crawlers). Once running, the app updates both from `profile.ts` and `site.ts`.

## Checking your work

* `npm run content:report`: what is still a placeholder.
* `npm run content:lint`: fails if placeholder text is hardcoded in a component.
* `scripts/make-filled-copy.sh` then `python3 scripts/filled-content-check.py`: builds a copy filled with fake values from the data files alone and verifies every page picks them up (proof that no component edits are needed).
