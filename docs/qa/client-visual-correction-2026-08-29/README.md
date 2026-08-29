# Client visual correction QA

This package records the 2026-08-29 screenshot-led correction against the client's
Gather circular-hero reference.

- `before/`: authoritative preview before correction.
- `reference/`: Gather at matching 1440×900 and 390×844 viewports.
- `final/`: production-build screenshots across Chromium and WebKit, including reduced motion.
- `final/compare-reference-*.png`: same-viewport combined inputs used for visual judgment.

The final implementation preserves the approved hero, uses only the five real project
routes/assets, keeps natural document scroll, and does not include a production deploy.
