# Homepage design-engineering QA — 2026-08-09

## Evidence

- Baseline: immutable preview `https://12efe194.execution-labs.pages.dev`
- After: production export served from `out/`
- Client grounding: latest Google Drive feedback image and the July 11 curved-project reference sequence
- Browser: Chromium via the repository's requested Playwright/browser workflow
- Figma was not available as a callable connector in this workspace, so the audit board is represented by the paired `before/` and `after/` captures in this directory.
- No GitHub remote is configured for this checkout, so visual findings were mapped directly to local tracked source and git history.

## Measured findings and source mapping

| Finding | Before | Source | Resolution |
| --- | ---: | --- | --- |
| Mobile nav/page gutter mismatch | 20 px nav / 24 px page | `src/components/Nav.tsx` | Unified at 24 px |
| Worked With to statement text | 384–400 px mobile/tablet; 257–276 px desktop | `src/components/home/GlobalStatement.tsx` | Bounded to 352–362 px; statement remains below opening viewport |
| Repeated lower-section padding | 96 / 128 / 160 px | Homepage section components | Replaced with feature, standard, and compact `clamp()` tokens based on 8 px units |
| Mobile Process height | 1,107 px section / 782 px journey | `src/components/home/Process.tsx` | 899 px section / 622 px journey |
| Selected Work heading-to-controls | 92 px mobile; 69 px desktop | `src/components/home/WorkCarousel.tsx` | 84 px mobile; 61 px desktop |
| What We Build height | 1,125 px at 390; 1,299 px at tablet | `src/components/home/WhatWeBuild.tsx` | 1,053 px at 390; 1,171 px at tablet |
| Client Signals height | 770 px mobile; 1,016 px desktop | `src/components/home/ClientSignals.tsx` | 682 px mobile; 839–849 px desktop |
| Page horizontal overflow | None: scroll width equaled viewport at all sizes | Arc/marquee and section overflow rules | Preserved; intentional carousel clipping remains local |

## Before / after totals

| Viewport | Before page height | After page height | Change |
| --- | ---: | ---: | ---: |
| 390 × 844 | 7,727 px | 7,319 px | −408 px |
| 430 × 932 | 7,616 px | 7,208 px | −408 px |
| 768 × 1024 | 8,326 px | 7,646 px | −680 px |
| 1366 × 768 | 8,138 px | 7,574 px | −564 px |
| 1440 × 900 | 8,141 px | 7,638 px | −503 px |

The studio statement moved from 967 px to 1,054 px at 1366 × 768 and from 949 px to 1,045 px at 1440 × 900, keeping it outside both opening viewports.

## Runtime QA

- Mouse wheel moved from 0 to 620 px; Page Down continued to 806 px.
- Menu open set body overflow to `hidden`; close, anchor navigation, and route navigation restored it to the prior empty value.
- Mobile anchor navigation reached `#what-we-build` with the fixed-header scroll offset intact.
- Selected Work tap selected Orbit Artist Group; Arrow Right selected Media Scaling and retained focus; a left swipe selected Dividends & Total Returns.
- Reduced motion disabled marquee animation, arc transitions, detail animation, and CSS smooth scrolling.
- `/contact` measured 390 px scroll width against a 390 px viewport and remained naturally scrollable.
