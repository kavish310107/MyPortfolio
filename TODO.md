# TODO / known limits

The website is feature-complete for the original brief. Remaining items are owner tasks or optional ideas.

## Owner tasks
- [ ] Replace placeholders in `src/data/*` (`npm run content:report` shows what is left); add photo, project images, certificates, `public/resume.pdf`.
- [ ] Replace the sample numbers (academics, skill levels, activity heatmap) and set `isSample: false`.
- [ ] Edit the initial `<title>` / meta description in `index.html`.

## Not verifiable in the build environment
- Real screen readers (NVDA / JAWS / VoiceOver), real touch devices, Windows high-contrast mode, macOS ⌘K physical behaviour, real IME input.
- Real-GPU animation smoothness (all motion tests ran in a software-rendered headless browser).

## Optional ideas (deliberately not built)
- Light theme / theme switch (single dark theme is the approved direction).
- Migrate `ProjectModal` onto the shared `ui/Modal`.
- Visible per-widget size toggle on the dashboard.
