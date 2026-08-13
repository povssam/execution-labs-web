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

## Responsive composition collision repair — 2026-08-13

Checkpoint: `d09a9b6b5161fbc322c8fd37508df5b2236cfccb` on `feat/art-direction-v2`.

Measured root causes and fixes:

- The fixed 64px nav, mobile safe-area inset, section scroll margin, and menu panel offset used separate values. They now resolve through `--nav-height` and `--anchor-offset` (`nav + 16px`).
- Containers and middle-section spacing used overlapping local tokens. They now share `--page-gutter`, `--content-max`, `--editorial-max`, `--section-space`, and `--section-space-sm` on an 8px-derived fluid scale.
- What We Build relied on a two-column block whose proof copy shared the active-copy flow. The panel is now a bounded content/proof grid beside the capability navigation; readable columns measure 275px/216px at 1024 and 294px/231px at 1440, then collapse without absolute-positioned text.
- Selected Work used viewport-relative card widths and mobile arc offsets that allowed adjacent labels to cross the active label. The active project now measures a 0px center-axis delta at every tested width; adjacent mobile labels sit on a lower arc with categories suppressed visually while retaining the project name controls.
- The process line extended past its final marker and individual steps had unconstrained widths. Marker centers now share one equal rail: 142/382/622/862px at 1024 and 300/572/844/1116px at 1440; mobile uses one exact vertical axis.
- Client Signals previously shifted even rows and transformed the active row. All rows now share one left rail; the active state is color/opacity only.
- Project pages used different header order and duplicated proof/artifact treatment. All five now use one eyebrow → title → category/year → summary → proof structure. The homepage Soniq artifact label is rendered once.

Production-build Playwright results:

- 34/34 tests passed across 390×844, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, and 1728×1117.
- Zero page-level horizontal overflow at all seven viewport sizes.
- Zero unintended readable-element intersections across all six capability states and all five Selected Work states.
- Zero clipped large headings or bounded content outside the viewport.
- Selected Work active-project center delta: 0px at all seven sizes after settled keyboard transitions.
- All tested anchors landed at least 8px below the fixed nav safe area.
- Every project header passed at 390×844 and 1440×900 with one artifact label, no collisions, no clipping, and no nav obstruction.
- Mobile menu close/navigation restored scrolling; wheel continuation, touch/swipe, keyboard selection, and reduced-motion behavior passed.

Before/after captures live in `docs/qa/responsive-collision-repair/`.

## Deep-scroll mobile navigation repair — 2026-08-13

- Root cause: the viewport-fixed mobile menu was nested inside the fixed header. Once the header gained its scrolled `backdrop-filter`, WebKit could treat it as the menu's containing block and place the panel near the document origin instead of the visible viewport.
- Fix: the menu panel is now a document-root sibling of the header with an explicit viewport layer. The approved header and menu styling remain unchanged.
- Scroll locking now applies to both `html` and `body` and restores both values on close, navigation, Escape, unmount, and mobile-to-desktop breakpoint changes.
- Deep-scroll geometry was verified at 390×844 and 430×932. The menu remained bounded from the 64px nav edge to the viewport bottom on `/`, `/work`, `/services`, `/contact`, and `/work/soniq`.
- Review captures: `docs/qa/nav-scroll-fix/menu-open-deep-scroll-390x844.png` and `docs/qa/nav-scroll-fix/menu-closed-deep-scroll-390x844.png`.
