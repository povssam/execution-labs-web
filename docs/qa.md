# Execution Labs — Art Direction V2 QA

## Scope

The current implementation was captured before exploration and remains untouched. The new board is a static, local art-direction artifact; no `src/` files, production deployment, or base branch changes were made.

## Baseline captures

- Preview desktop: `docs/art-direction-v2/current/preview/home-1440x900.png`
- Preview mobile: `docs/art-direction-v2/current/preview/home-390x844.png`
- Live desktop reference: `docs/art-direction-v2/current/live/home-1440x900.png`
- Live mobile reference: `docs/art-direction-v2/current/live/home-390x844.png`

The live domain is a different WordPress implementation from the current Next/Pages preview. It was treated as a reference only; it was not changed.

## Runtime discovery of the current preview

Checked at 390×844, 430×932, 768×1024, 1366×768, and 1440×900 with the built preview URL.

- `document.documentElement.clientWidth === document.documentElement.scrollWidth` at all five sizes; no page-level horizontal overflow observed.
- Initial body inline overflow was empty at all sizes.
- Mobile menu open set body overflow to hidden and expanded the menu; close restored the empty overflow value.
- Menu navigation to `/#what-we-build` restored a scrollable body and resolved the target without a persistent lock.
- No runtime errors were captured during the tested session.

Approximate measured section landmarks from the current preview:

| Viewport | Hero | Worked With | Statement text top | Selected Work | Process |
| --- | ---: | ---: | ---: | ---: | ---: |
| 390×844 | 512px | 83px | 947px | 1,622px | 899px |
| 430×932 | 512px | 83px | 946px | 1,599px | 899px |
| 768×1024 | 537px | 99px | 987px | 1,595px | 1,046px |
| 1366×768 | 590px | 103px | 1,064px | 1,415px | 861px |
| 1440×900 | 590px | 103px | 1,045px | 1,426px | 871px |

These values are baseline evidence for implementation planning, not changes to the approved site.

## Exploration review matrix

| Direction | Desktop | Mobile | Hero crop | Selected Work crop |
| --- | --- | --- | --- | --- |
| A | `direction-a/desktop-1440x900.png` | `direction-a/mobile-390x844.png` | `direction-a/hero-1440x900.png`, `direction-a/hero-390x844.png` | `direction-a/selected-work-1440x900.png`, `direction-a/selected-work-390x844.png` |
| B | `direction-b/desktop-1440x900.png` | `direction-b/mobile-390x844.png` | `direction-b/hero-1440x900.png`, `direction-b/hero-390x844.png` | `direction-b/selected-work-1440x900.png`, `direction-b/selected-work-390x844.png` |
| C | `direction-c/desktop-1440x900.png` | `direction-c/mobile-390x844.png` | `direction-c/hero-1440x900.png`, `direction-c/hero-390x844.png` | `direction-c/selected-work-1440x900.png`, `direction-c/selected-work-390x844.png` |

## Board QA

The board was rendered from the repository root with a static server and Playwright at 1440×900 and 390×844. Each direction was inspected as a full-page capture plus focused hero and Selected Work captures. The board uses a fixed desktop grid, responsive `clamp()` type/spacing, intentional mobile layout rules, `overflow-x: hidden`, and a reduced-motion fallback.

Repository checks completed on the unchanged application source: `npm run lint`, `npx tsc --noEmit`, `npm run build`, and whitespace validation. The build briefly added generated Next type configuration; that generated-only change was removed, leaving no source or config delta outside this exploration folder.

## Figma status

No Figma MCP connector is exposed in this workspace, so the requested Figma file and URL could not be created programmatically. The local board is the review artifact and mirrors the requested page labels: 00 CURRENT, 01 DIRECTION A, 02 DIRECTION B, 03 DIRECTION C, with direction query parameters and focused review states.

## Middle-section refinement — 2026-08-13

The approved hero and footer were held unchanged. Production-build QA covered the redesigned middle sequence at 390×844, 430×932, 768×1024, 1366×768, and 1440×900.

Measured 390px improvements from the client-reference baseline:

| Section | Before | After | Change |
| --- | ---: | ---: | ---: |
| What We Build | 974px | 678px | -296px |
| Selected Work | 1,670px | 1,082px | -588px |
| Motion Work | 567px | 520px | -47px |
| Process | 1,048px | 692px | -356px |
| Client Signals | 704px | 527px | -177px |
| Full page | 7,552px | 6,088px | -1,464px |

Runtime checks:

- 14 Playwright tests passed against the production build.
- Homepage and `/contact` had no page-level horizontal overflow at all five viewports.
- Mobile menu lock released after close and after in-page navigation.
- Capability swipe/tap, project keyboard/swipe, and Client Signals focus/tap states passed.
- Reduced motion disables continuous marquee/video motion and state transitions.
- No console or page errors were recorded.

Review captures live in `docs/qa/middle-art-direction/after/`.
