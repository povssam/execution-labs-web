# Execution Labs client-reference audit

Audit date: 2026-08-13  
Branch: `feat/art-direction-v2`

## Sources

- Google Drive: `Execution Labs - Brand Voice & Brief`
- Google Drive: `latest feedback/client-feedback-01` through `client-feedback-09`
- Current isolated Art Direction V2 preview

The Drive references consistently call for a seamless Hero to Worked With surface, a calm centered statement reveal, a curved project selector, restrained glow, real project detail, centered Motion Work copy, and natural scrolling.

## Measured findings

- Opening composition: `.home-opening` equals the viewport height at all 5 targets. Worked With ends at exactly the viewport bottom. At 1366x768 the statement starts at y=768, so it does not peek into the opening frame.
- Shared desktop grid: key content uses the 1088px container from x=176 to x=1264 at 1440px. The statement is centered on x=720 with a 768px editorial measure.
- Motion Work defect: before, its 1408px media surface started at x=720 and ended at x=2128, clipping 688px off-screen. After, it is centered with 16px viewport gutters, x=16 to x=1424. At 390px it changed from x=195..553 to x=16..374.
- Selected Work fidelity: the flat 5-column rail did not match the approved curved-selector references. The selector now uses the existing arc system while retaining the real project detail panel.
- Mobile process: route height reduced by 48px, from 730px to 682px, without changing the 4-step content.
- Overflow: document `scrollWidth` equals `clientWidth` at 390, 430, 768, 1366, and 1440. The same passes on `/contact`.
- Navigation: menu open/close and menu-to-anchor navigation both release the body lock; wheel scrolling continues afterward.
- Motion/accessibility: project selection passes click, keyboard, and swipe checks. Reduced motion disables marquee animation, native smooth scrolling, and Grace video autoplay/loop.

## Evidence

- `before/`: deployed preview before this pass
- `after/`: production-build captures after the fixes

Automated coverage lives in `tests/homepage-visual.spec.ts` and runs with `npm run test:visual`.
