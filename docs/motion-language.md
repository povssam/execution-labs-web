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
