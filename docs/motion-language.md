# Execution Labs — Motion Language V2

## Shared rule

Every animation has one purpose: enter, perform that purpose, then settle. No bounce, overshoot, random rotation, endless floating, exaggerated parallax, or decorative particle field.

## Sequence

| Moment | Purpose | Treatment | Timing |
| --- | --- | --- | --- |
| Hero entry | Establish hierarchy | Line-group mask + opacity; media resolves from a soft blur | 560–760ms, ease-out |
| Capability entry | Establish system rhythm | Rule and row reveal in short stagger | 360–520ms |
| Project selection | Confirm the selected artifact | Selected row sharpens; neighboring rows lower opacity; media uses transform + opacity | 420–620ms |
| Process reveal | Show movement through the method | Connected rule grows into the next step | 480–680ms |
| CTA entry | Close with confidence | Type mask or opacity only; link underline resolves last | 420–560ms |

## Direction-specific notes

- A: editorial masks, rule reveals, and calm media transitions. Keep ambient atmosphere static; the Grace video is the only continuous movement.
- B: one controlled spatial shift may move the selected project artifact forward. No continuous perspective animation.
- C: rules and type do the work. Prefer opacity and a small blur-to-sharp resolve over scale.

## Interaction states

- Hover previews intent only; click/tap/keyboard commits selection.
- Focus is visible and never represented only by color.
- Touch selection must not capture page scrolling outside the intentional project interaction area.
- `prefers-reduced-motion: reduce` removes transforms, staggers, blur, and non-essential transitions while preserving state changes and content order.

## Controlled refinement

| Moment | Start | Transition | Resting state | Guardrail |
| --- | --- | --- | --- | --- |
| Hero prism | Approved full-bleed real asset | Existing load treatment only | Static signature composition | No looping drift or decorative parallax |
| Studio statement | Words masked and low on the baseline | Word-group reveal with a short, even stagger | Fully readable centered statement | Never emulate typing; no cursor or per-letter jitter |
| Capability selection | Previous detail at rest | Opacity and a small vertical settle | New detail holds its layout | No blur-heavy swap or scale jump |
| Selected Work selection | Quiet index row | Horizontal index shift and media crossfade | Large media plus compact facts | No arc rotation, overshoot, or competing card chrome |
| Motion Work | Real Grace poster/video | Media frame resolves once | Large, quiet media surface | The video is the only continuous movement in the section |

The page should feel still when the visitor stops scrolling. If an effect does not
improve comprehension, hierarchy, proof, or interaction feedback, it stays off.

## Middle-section interaction refinement

| Moment | Trigger | Transition | Resting state | Reduced motion |
| --- | --- | --- | --- | --- |
| Capability system | Tap, swipe, or arrow key | 420ms opacity/vertical settle | One connected active capability | Instant content replacement |
| Project arc | Tap, swipe, drag, or arrow key | 420–620ms transform and opacity | Active project centered; neighbors recede | Instant selection |
| Motion Work | Enter viewport | One reveal; Grace video supplies the motion | Full-width media surface | Poster frame, no autoplay/loop |
| Process route | Section scroll progress; hover or focus controls | 300–420ms opacity and line progression | One index derived from progress; visual state settles | Same scroll mapping with instant visual state |
| Client Signals | Scroll, tap, hover, or focus | 280–420ms opacity and restrained scale | One outcome leads at a time | Instant active state |

## System-field refinement — 2026-08-18

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Capability selection | Tap, swipe, or arrow key | Copy crossfades while routes draw once and nodes resolve | Show the operational shape of the selected capability | Final diagram appears immediately |
| Project selection | Tap, swipe, drag, or arrow key | Title, concise descriptor, and media transition as one unit | Keep project identity and proof synchronized | Instant state replacement |
| Grace proof | Project selected and media visible | Real film plays as the only continuous middle-page motion | Demonstrate brand, product, and motion together | Poster/static frame |
| Process and outcomes | Process scroll progress; outcomes remain readable | Process visual transitions only when the derived index changes | Make scroll position and system proof agree | Same four-state mapping without non-essential transitions |

No system-field animation loops. Once its route and nodes resolve, the diagram remains
still. The standalone Motion Work scene was removed to avoid repeating Grace.

## Process proof sequence — 2026-08-18

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Process selection | Tap, horizontal swipe, or arrow key | 18px horizontal settle plus opacity over 380ms | Connect each concise process step to a distinct visual system state | Instant replacement |
| Process system field | Selection completes | Routes and nodes resolve once, then remain still | Replace explanatory copy with visual proof of input, map, build, and feedback | Complete diagram shown immediately |
| Outcomes entrance | Section enters | Four lines rise 12–18px in a short stagger, then remain fully readable | Close the middle with one editorial statement rather than another interaction | Full composition shown immediately |

## Scroll-position-driven Process state — 2026-08-23

| Moment | Trigger | Start → settle | Source of truth | Reduced motion |
| --- | --- | --- | --- | --- |
| Process state | Framer Motion `useScroll` section progress | `0.00–0.25` Brief, `0.25–0.50` System map, `0.50–0.75` Build, `0.75–1.00` Proof | `clamp(floor(scrollYProgress × 4), 0, 3)` | Same mapping with the non-essential entry transition removed |
| Process reverse | Progress decreases | Proof → Build → System map → Brief | The same normalized progress value | Instant state changes |
| Process replay | Progress leaves zero and re-enters the section | The existing keyed SystemVisual re-mounts and its CSS draw/settle animations replay | A progress-derived transition revision | Static visual state |
| Process controls | Tap, swipe, or arrow/Home/End key | Scroll to a state midpoint, then let scroll progress update the active tab and visual | Native document scroll plus the MotionValue | Instant scroll and state changes |

There are no autoplay timers, `once` flags, reset observers, or independent step
observers. Every state boundary and genuine progress re-entry increments the keyed
transition revision. The panel uses the same 380ms cubic-bezier entry treatment as the
previous visual transition, implemented with a keyed CSS animation so mobile Safari does
not leave an entering Motion layer at zero opacity.

## Ordered outcomes refinement — 2026-08-19

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Capability state | Tap, swipe, or arrow key | Headline, keywords, and diagram crossfade as one keyed unit over 380ms | Keep language and proof synchronized | Instant replacement |
| Process state | Tap, swipe, or arrow key | One distinct diagram resolves once for input, mapping, assembly, or live proof | Make each process step visually legible without more copy | Final diagram immediately visible |
| Outcome state | Next/previous control, tap, swipe, or arrow key | Adjacent state only; media crosses 18px while the compact title settles 12px | Preserve the exact 1 → 2 → 3 → 4 narrative without scroll-state errors | Instant adjacent state |

Outcome navigation clamps at the first and final states. It never wraps, auto-plays,
or skips an intermediate state. Every system-field animation enters, communicates,
and becomes still.

## Client delivery motion — 2026-08-28

| Moment | Trigger | Motion | Guardrail |
| --- | --- | --- | --- |
| Portfolio state | Native document scroll | A requestAnimationFrame-throttled scroll readout advances one of five project states; tiles settle with opacity and transform | No scroll-jacking, timer, or continuous orbit rotation |
| Project selection | Tap, click, or arrow key | Active tile resolves, central copy remounts, and the existing case-study link updates | One active state; focus follows the visible desktop tile or mobile card |
| Mobile portfolio | Horizontal touch scroll | Native snap rail derives the centered project | Touch owns only the rail; vertical page scrolling remains native |
| Execution protocol | Tab click or arrow/Home/End key | Route line and readout resolve to the selected real process step | Reduced motion removes transition and entry animation |

The portfolio uses the existing case-study content as its state machine. No autoplay
behavior was added; Grace is the only existing continuous media and keeps its poster and
reduced-motion behavior.

## Circular portfolio correction — 2026-08-29

| Moment | Trigger | Motion | Guardrail |
| --- | --- | --- | --- |
| Portfolio progression | Native vertical scroll through the sticky scene | Scroll progress maps five project states to 20-degree rotor steps, then a damped spring adds weight | No wheel/touch interception, bounce, autoplay, or looping rotation |
| Tile orientation | Rotor movement | Each tile counter-rotates by the exact rotor plus arm angle so project media remains upright | No playful tilt or random movement |
| Direct selection | Click, tap, or keyboard | The page scrolls to the requested project state; the selected tile sharpens and gains a restrained prismatic edge | Existing project routes remain the only open actions |
| Reduced motion | System preference | State changes use discrete rotation with all nonessential CSS transitions removed | Content, selection, and routes remain fully available |

The active metadata changes without a keyed entrance animation so WebKit cannot leave
the selected project hidden after a scroll-derived state update.
