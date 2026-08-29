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

## Premium middle-section refinement — 2026-08-17

The hero, navigation structure, CTA, and footer remain unchanged. The statement, capabilities, work, motion, process, and outcome sections were evaluated as one sequence and refined through two full-page screenshot cycles.

- The statement is content-driven instead of viewport-height-driven and retains its one-time 40%-visibility character reveal.
- What We Build uses one deterministic active tab, a shared editorial lead, and one proof surface. Motion Design opens on a real frame extracted from the existing Grace film; no fake product imagery was added.
- Selected Work synchronizes project name, media, and link in one keyed transition. The five real project records remain available by tap, swipe, and keyboard.
- Motion Work uses the existing Grace film from a later timestamp so the second presentation demonstrates a different part of the real asset.
- Process and Client Signals use static, fully readable editorial compositions with no scroll state machine, rails, markers, or decorative numbering.

Production-build Playwright results:

- Premium middle suite: 6/6 viewports passed at 390×844, 430×932, 768×1024, 1024×768, 1366×768, and 1440×900.
- Homepage regression suite: 8/8 viewports passed, additionally covering 1280×800 and 1728×1117.
- Statement suite: 3/3 passed with fixed geometry, no replay, and immediate reduced-motion content.
- Document-level horizontal overflow: 0px at every tested viewport.
- Exactly one active capability and project; all selected content and links synchronized after tap/keyboard changes.
- Mobile selector centering, swipe behavior, menu scroll-lock release, anchor offsets, and reduced-motion video behavior passed.

Review captures live in `docs/qa/premium-middle-2026-08-17/`.

## Coherent system-field refactor — 2026-08-18

The approved hero, opening client rail, studio statement, header, CTA, and footer were
held. The middle was reviewed through two complete-page screenshot cycles rather than
as isolated components.

Design and media findings:

- Eleven generated bitmap placeholders used unrelated visual languages and implied
  literal product screens where authentic captures did not exist. They were removed.
- The standalone Motion Work section repeated Grace immediately after Selected Work.
  It was merged into Grace's single real project presentation.
- What We Build and the four non-Grace projects now share one deterministic SVG system
  field: common grid, geometry, muted color, one-shot route resolve, and no fake data.
- Project copy was reduced to one supported orientation line; category, year, proof,
  users, and artifact metadata remain off the homepage.
- Process is a four-column/two-column editorial field and outcomes remain four readable
  statements with no active-state or scroll-state logic.

Production-build browser results:

- Premium middle suite: 6/6 at 390×844, 430×932, 768×1024, 1024×768,
  1366×768, and 1440×900.
- Homepage regression suite: 8/8, additionally covering 1280×800 and 1728×1117.
- Statement suite: 3/3 with fixed geometry, one-time reveal, and immediate
  reduced-motion content.
- Document-level horizontal overflow: 0px at every viewport.
- All six capability and five project states synchronized media, title, link, touch,
  and keyboard selection.
- Mobile menu close/navigation restored native scrolling and all tested anchors cleared
  the fixed header.
- Reduced motion shows completed diagrams, pauses Grace, and leaves all copy readable.
- Removing bitmap placeholders reduced shipped static media by roughly 596KB.

Review captures live in `docs/qa/system-field-refactor-2026-08-18/`.

## Process, visual proof, and outcomes refinement — 2026-08-18

Scope was limited to the sequence between Selected Work and the final CTA. The hero,
Worked With, studio statement, capability system, Selected Work, CTA, and footer were
held unchanged.

- Process changed from a static text grid to one explicit four-state interaction. Tap,
  horizontal swipe, and arrow/Home/End keys synchronize one active step with one visual.
- Four deterministic system-field states represent input, workflow mapping, build, and
  feedback. They reuse the existing media grammar and contain no fake product data.
- Outcomes changed from a second 2×2 grid to one compact editorial composition with the
  requested four lines visible together and no state machine.
- Two full-page visual refinement cycles were captured at mobile and desktop sizes in
  `docs/qa/process-proof-outcomes-2026-08-18/`.

Production-build results:

- Focused middle suite: 6/6 at 390×844, 430×932, 768×1024, 1024×768,
  1366×768, and 1440×900.
- Homepage regression suite: 8/8, additionally covering 1280×800 and 1728×1117.
- Statement regression suite: 3/3 at 390×844, 430×932, and 1440×900.
- Document-level horizontal overflow: 0px at every viewport.
- Process tap, horizontal swipe, Arrow keys, Home/End behavior, exactly-one-selected
  state, and reduced-motion settling passed.
- Mobile menu lock/release, anchor clearance, capability/project controls, resize, and
  console-error checks passed.
- A 768px intrinsic aspect-ratio overflow found during the first production-build pass
  was corrected by constraining the visual to its grid track; the rerun passed without
  clipping or document overflow.

## Ordered media outcomes refinement — 2026-08-19

Scope remained limited to capability transition behavior, Process media states,
Outcomes, and the spacing handoffs around those sections. The hero, Worked With,
statement composition/copy, Grace treatment, CTA, and footer were not redesigned.

- Outcomes was rebuilt from a giant four-line type block into one compact active title
  paired with a dominant system-field visual. Next/previous controls, arrow keys, tap,
  and horizontal swipe move only one adjacent state at a time and clamp at each end.
- Faster decisions, Clearer workflows, Less follow-up, and Ready to launch each have a
  distinct deterministic geometry using the same graphite grid and cool violet-blue
  media language as Process.
- Process geometry was sharpened so Brief gathers inputs, System map organizes routes,
  Build assembles modules, and Proof resolves into a live output and feedback path.
- Capability headline, keywords, and media now transition through one keyed presence
  unit, while each system visual resolves once and settles.
- Statement → capabilities, Grace → Process, and Process → Outcomes handoffs were
  reduced through content-driven section padding rather than spacer or viewport-height
  rules.

Production-build browser results:

- Focused middle suite: 6/6 at 390×844, 430×932, 768×1024, 1024×768,
  1366×768, and 1440×900.
- Homepage regression suite: 8/8, additionally covering 1280×800 and 1728×1117.
- Statement regression suite: 3/3 at 390×844, 430×932, and 1440×900.
- Outcome state order passed exactly `0 → 1 → 2 → 3`; controls do not wrap or skip.
- Tap/swipe, keyboard, reduced motion, menu lock/release, anchor clearance, responsive
  resize, duplicate Grace, console errors, and 0px document overflow checks passed.
- Two visual refinement cycles and final production-build captures live in
  `docs/qa/outcomes-media-refinement-2026-08-19/`.

## Scroll-position-driven Process state — 2026-08-23

The rejected IntersectionObserver/timer replay implementation was removed. Process now
derives its active step from one normalized Framer Motion `scrollYProgress` value. The
existing copy, layout, SystemVisual geometry, and transition timing remain unchanged;
the panel entry is a keyed CSS transition so the browser cannot strand a Framer Motion
layer at zero opacity after repeated mobile passes.

- Progress uses `start 70%` → `end 30%` to keep the fixed header clear and give the compact
  section a stable travel range.
- `clamp(floor(progress × 4), 0, 3)` maps exactly to Brief, System map, Build, and Proof.
  Reversing scroll reads the same value in reverse; there is no reset branch or timer.
- Every step boundary increments `data-process-transition`. A genuine progress re-entry
  from zero increments it again so Brief's visual also remounts on every pass.
- Tap, swipe, and keyboard controls scroll to progress midpoints instead of writing the
  active state directly, keeping one source of truth.
- `scripts/qa-process-replay.mjs` verifies five complete DOWN → UP → DOWN → UP → DOWN
  passes, midpoint reversals, CSS `animationstart` events for every transition revision,
  reduced motion, no overflow, and browser errors in Chromium and WebKit at 390×844,
  430×932, 768×1024, and 1440×900.

Visual captures from the isolated QA server remain in
`docs/qa/process-replay-2026-08-22/`.

## Client delivery QA — 2026-08-28

The client feedback brief was verified from the connected Drive folder before the
delivery pass. The liked hero remains unchanged. The homepage now uses the existing
five `caseStudies` records in one Project Portfolio experience, with direct
`/work/[slug]` links and no fabricated clients or project media.

Automated checks:

- `npm run build` passed on Next 16.2.9 with all static routes generated.
- Targeted ESLint passed for the changed TypeScript and TSX files.
- Static-export Playwright smoke passed at 320, 375, 390, 430, 768, 1024, and 1440
  widths with 0px document overflow and no console/page errors.
- Desktop scroll advanced the portfolio state; orbital tile selection updated the
  active case-study link; process Arrow-key navigation reached `Build`.
- Mobile touch-rail selection and native horizontal scrolling advanced the project
  state; `prefers-reduced-motion` was enabled during QA.
- Fresh 390px and 768px pages had no hydration errors. Grace video is poster-only and
  unmounted below 768px; the real video mounts at 768px and above.
- Final static-export pass covered 320×700, 375×812, 390×844, 430×932, 768×1024,
  1024×768, and 1440×900 with 0px document overflow, five portfolio states, and four
  process tabs. The desktop stage stayed pinned at the navigation offset throughout
  its scroll runway.
- WebKit checks at 390×844 and 430×932 confirmed the native touch rail, selection,
  process tabs, reduced motion, and no console/page errors. The sticky fix uses
  `overflow: clip` so the portfolio stage is not trapped by the section’s overflow.
- Durable command results and the final delivery checklist are recorded in
  `docs/qa/client-delivery-2026-08-28.md`.

Review captures from the client delivery pass are kept outside the source commit in
the local `test-results/` workspace. The verified branch preview is:
`https://feat-mvp-website.execution-labs-web.pages.dev`

## Final composition polish — 2026-08-29

The approved homepage identity and interaction system were held. The final pass reduced
capability and protocol copy, shortened the three sticky scene runways, removed the
duplicated Project Reel open action, and tightened the final CTA. Soniq now uses its
existing 1024px product artifact as one full interface view and two editorial detail
crops; generic problem/build cards, result container, pills, and the duplicate project
CTA were removed.

- Chromium desktop and mobile traversed Capabilities `0 → 1 → 2 → 3`, Portfolio
  `0 → 1 → 2 → 3 → 4`, and Protocol `0 → 1 → 2 → 3` in both directions.
- WebKit at 390×844 traversed the same state order in both directions with 100px native
  wheel increments.
- Mouse drag and Chromium touch drag advanced the Project Reel by exactly one card;
  linked media resolved to the selected real project route.
- Mobile menu lock and release, reduced-motion marquee/reel fallbacks, and 0px document
  overflow passed.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`, and `git diff --check` passed.
- Before and three refinement-pass captures are in
  `docs/qa/final-polish-2026-08-29/` and remain outside the source commit.
