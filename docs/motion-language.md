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
| Process route | Scroll, hover, or focus | 300–420ms opacity and line progression | Current step bright; prior steps settled | Static readable route |
| Client Signals | Scroll, tap, hover, or focus | 280–420ms opacity and restrained scale | One outcome leads at a time | Instant active state |

## System-field refinement — 2026-08-18

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Capability selection | Tap, swipe, or arrow key | Copy crossfades while routes draw once and nodes resolve | Show the operational shape of the selected capability | Final diagram appears immediately |
| Project selection | Tap, swipe, drag, or arrow key | Title, concise descriptor, and media transition as one unit | Keep project identity and proof synchronized | Instant state replacement |
| Grace proof | Project selected and media visible | Real film plays as the only continuous middle-page motion | Demonstrate brand, product, and motion together | Poster/static frame |
| Process and outcomes | Enter viewport | 12–18px reveal, then fully readable static content | Establish hierarchy without a scroll state machine | Fully visible |

No system-field animation loops. Once its route and nodes resolve, the diagram remains
still. The standalone Motion Work scene was removed to avoid repeating Grace.

## Process proof sequence — 2026-08-18

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Process selection | Tap, horizontal swipe, or arrow key | 18px horizontal settle plus opacity over 380ms | Connect each concise process step to a distinct visual system state | Instant replacement |
| Process system field | Selection completes | Routes and nodes resolve once, then remain still | Replace explanatory copy with visual proof of input, map, build, and feedback | Complete diagram shown immediately |
| Outcomes entrance | Section enters | Four lines rise 12–18px in a short stagger, then remain fully readable | Close the middle with one editorial statement rather than another interaction | Full composition shown immediately |

No scroll-driven active state controls readability. Process state changes only through
an explicit user action, and all four outcomes remain visible together.

## Ordered outcomes refinement — 2026-08-19

| Moment | Trigger | Start → settle | Purpose | Reduced motion |
| --- | --- | --- | --- | --- |
| Capability state | Tap, swipe, or arrow key | Headline, keywords, and diagram crossfade as one keyed unit over 380ms | Keep language and proof synchronized | Instant replacement |
| Process state | Tap, swipe, or arrow key | One distinct diagram resolves once for input, mapping, assembly, or live proof | Make each process step visually legible without more copy | Final diagram immediately visible |
| Outcome state | Next/previous control, tap, swipe, or arrow key | Adjacent state only; media crosses 18px while the compact title settles 12px | Preserve the exact 1 → 2 → 3 → 4 narrative without scroll-state errors | Instant adjacent state |

Outcome navigation clamps at the first and final states. It never wraps, auto-plays,
or skips an intermediate state. Every system-field animation enters, communicates,
and becomes still.
