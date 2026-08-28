# Execution Labs client delivery QA

Date: 2026-08-28

Build: Next.js 16.2.9 static export

Preview: `http://127.0.0.1:4176` (local only; no production deploy)

## Responsive matrix

| Viewport | Document overflow | Desktop orbit | Mobile rail | Portfolio states | Process tabs |
| --- | ---: | --- | --- | ---: | ---: |
| 320×700 | 0px | No | Yes | 5 | 4 |
| 375×812 | 0px | No | Yes | 5 | 4 |
| 390×844 | 0px | No | Yes | 5 | 4 |
| 430×932 | 0px | No | Yes | 5 | 4 |
| 768×1024 | 0px | Yes | No | 5 | 4 |
| 1024×768 | 0px | Yes | No | 5 | 4 |
| 1440×900 | 0px | Yes | No | 5 | 4 |

## Interaction checks

- Native desktop scroll advanced the orbit through all five states in order and kept
  the stage pinned to the navigation offset while it was active.
- Selecting the third mobile card resolved `Media Scaling` and its existing
  `/work/media-scaling` case-study link.
- Mobile ArrowRight navigation moved from project 03 to project 04 and moved focus to
  the visible mobile card.
- Process tab selection resolved the existing `Build` state and kept one tab selected.
- The central portfolio action exposes the existing case-study routes only; no project
  or client was invented.
- WebKit confirmed the mobile rail and process interactions at 390px and 430px.

## Motion and browser checks

- Chromium and WebKit produced no console errors or page errors.
- Reduced-motion contexts preserved content/state and removed non-essential transitions.
- No hover-only action is required; tiles/cards and process steps are buttons with
  keyboard focus states.
- The portfolio uses native scrolling plus requestAnimationFrame-throttled state
  updates; there is no scroll-jacking or continuous orbital animation.

## Result

Pass for client preview delivery. The existing hero and real project data/assets remain
the source of truth. Grace remains the only real project video; the other four tiles use
deterministic abstract artifact surfaces labeled from existing case-study data.
