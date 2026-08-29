# Design QA — Gather orbit visual correction

Date: 2026-08-29

## Source and implementation comparison

| Surface | Reference | Implementation | Viewport / state | Result |
| --- | --- | --- | --- | --- |
| Portfolio desktop | `docs/qa/client-visual-correction-2026-08-29/reference/gather-initial-1440x900.png` | `docs/qa/client-visual-correction-2026-08-29/final/portfolio-initial-1440x900.png` | Chromium, 1440×900, initial project | Pass |
| Portfolio mobile | `docs/qa/client-visual-correction-2026-08-29/reference/gather-initial-390x844.png` | `docs/qa/client-visual-correction-2026-08-29/final/portfolio-initial-390x844.png` | Chromium, 390×844, initial project | Pass |
| Combined desktop review | — | `docs/qa/client-visual-correction-2026-08-29/final/compare-reference-1440x900.png` | Same viewport and state | Pass |
| Combined mobile review | — | `docs/qa/client-visual-correction-2026-08-29/final/compare-reference-390x844.png` | Same viewport and state | Pass |

## Visible fidelity findings

- Compact upright project tiles now occupy a true circular arc rather than a linear carousel or editorial case-study panel.
- The cropped mobile wheel shows five useful tiles around small centered copy and preserves black negative space.
- Desktop preserves a broader media field while keeping the title subordinate to the orbit.
- The existing refracted hero asset supplies controlled optical energy; cyan HUD, graph, grid, and route-map language no longer leads the post-hero sections.
- The post-hero statement and four-state process use one dominant media/lens composition with restrained copy.

## Responsive and interaction QA

- Chromium: 1440×900, 1024×768, 768×1024, 390×844.
- WebKit: 390×844.
- Native scroll advanced the portfolio to state 03/05 in both engines.
- Direct tile selection updated the active route; project route returned HTTP 200.
- `prefers-reduced-motion: reduce` produced discrete state movement and zero-second tile transitions.
- Horizontal overflow: 0px at every tested viewport.
- Blocking console/page errors: none.

## Issue history

- Fixed P1: WebKit could leave keyed active-project metadata hidden after state change; removed the nonessential keyed entrance animation.
- Fixed P2: 768px portrait tiles crossed the center title; moved the portrait-tablet rotor upward to restore negative space.
- Open P0/P1/P2 issues: none.

final result: passed
