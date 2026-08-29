# Design QA — Gather orbit visual correction

Date: 2026-08-29

## Reference-grounded visual system pass — current candidate

The approved hero, header, final CTA fundamentals, and footer were held. The middle
homepage was reviewed against the client's Gather direction and the live references
before implementation, then rechecked in the browser after each new visual object.

### Reference review

- Framer University: [Circular Animated Hero Section in Framer](https://framer.university/resources/circular-animated-hero-section-in-framer)
- Live Gather demo: [gather.learnframer.site](https://gather.learnframer.site/)
- [Magic UI Orbiting Circles](https://magicui.design/docs/components/orbiting-circles)
- [v0 orbital navigation search result](https://v0.app/chat/portfolio-landing-page-THEEMvADUpJ)
- [v0 Framer Motion scroll-trigger search result](https://v0.app/chat/portfolio-with-framer-motion-DwrdnTr9a5V)
- [React Bits Pro Circle Gallery](https://pro.reactbits.dev/docs/components/circle-gallery)
- Motion: [useScroll](https://motion.dev/docs/react-use-scroll), [useTransform](https://motion.dev/docs/react-use-transform), [useReducedMotion](https://motion.dev/docs/react-use-reduced-motion), and [MotionConfig](https://motion.dev/docs/react-motion-config)

### Shared visual system

The middle now uses five related objects: a Refracted Field, Project Orbit, Protocol
Lens, Capability Stack, and Evidence Viewport. Each has one dominant object, one active
state, one action, substantial black negative space, restrained mono instrumentation,
and controlled hero-derived prismatic light. The page uses reveal, state transition,
and optical drift only; no dashboard graph, network map, decorative blob, or continuous
rotation was added.

### Reference comparison

The combined same-viewport comparisons are recorded at:

- `docs/qa/reference-system-pass-2026-08-29/final-v3/reference-comparison/gather-vs-el-1440.png`
- `docs/qa/reference-system-pass-2026-08-29/final-v3/reference-comparison/gather-vs-el-390.png`

The EL orbit follows the Gather construction principle without copying its brand: a
large cropped circle, repeated radial arms, compact upright real-project tiles, a quiet
center, and native scroll-derived progression. At 390px the crop retains the circular
idea and a useful 4–6 tile arc instead of becoming a vertical case-study layout.

### Browser evidence

- Chromium 1440×1000: portfolio `0→1→2→3→4`, process `0→1→2→3`, capabilities `0→1→2→3`, and proof `0→1→2→3→4`; all reversed successfully.
- Chromium 390×844: the same complete forward and reverse state sequences; zero overflow and zero errors.
- WebKit 390×844: incremental `window.scrollBy` covered the complete process, portfolio, and proof sequences; a focused 50px pass covered capabilities `0→1→2→3` and `3→2→1→0`.
- Chromium tablet checks: 1024×768 and 768×1024 retained the orbit and state controls with zero overflow and zero errors.
- Reduced motion: all state sequences remained functional, the Grace video was not mounted, and zero overflow/errors were recorded.
- Project selection opened a real `/work/orbit-artist-group` route in Chromium and WebKit; menu, CTA, and footer interactions remained reachable.
- Performance sampling at 1440×1000 recorded 27 long tasks (maximum 614ms) and 0.0058 cumulative layout shift; 390×844 recorded 7 long tasks (maximum 137ms) and 0.0155 cumulative layout shift.

### Regression lock

The final hero and footer captures match the preserved before captures at 1440×1000
and 390×844. The only visible difference in the local development captures is the
framework's development indicator; it is absent from the production export. No hero,
header, CTA, footer, ProjectReel, or preserved QA artifact was edited.

Open P0/P1/P2 issues: none.

final result: passed

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
