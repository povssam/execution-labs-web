# Execution Labs — Media Manifest V2

Approved brand and Grace media remain repository assets. Projects without authentic
captures use a code-rendered abstract system field with no fake UI, fake data, or
simulated client deliverable. No client, logo, metric, testimonial, or project claim
was invented.

| Asset | Source | Use in exploration | Responsive/performance note |
| --- | --- | --- | --- |
| `public/brand/hero-glass.png` | Existing brand asset | Hero atmosphere in A/B; desaturated presentation in C | Use as a single responsive image; preserve the existing crop and avoid duplicate copies |
| `public/brand/logo.png` | Existing brand asset | Available E mark reference; not required as a new hero lockup | Keep small and only where it supports navigation/CTA |
| `public/brand/grace/grace-animation-poster.jpg` | Existing Grace asset | Selected Work fallback/poster and phone-review surface | Poster-first loading; keep intrinsic ratio; lazy-load below hero |
| `public/brand/grace/grace-animation.mp4` | Existing Grace asset | Motion Work / Selected Work proof surface | Poster fallback, `playsInline`, no autoplay requirement for direction review |
| `public/brand/grace/grace-branding-concept.pdf` | Existing Grace reference | Not embedded in the board; retained as source material | Do not ship as page media without a deliberate review path |
| `src/components/home/SystemVisual.tsx` | Original code-rendered media | Six capability states and four non-Grace project states | Deterministic SVG geometry; no bitmap payload, logos, readable fake data, or claims |
| Process system fields (`brief`, `system-map`, `build`, `proof`) | Original code-rendered media | Interactive process proof sequence | Reuses the established SVG grammar; no fake interface text, data, metrics, or client imagery |
| Outcome system fields (`faster-decisions`, `clearer-workflows`, `less-follow-up`, `ready-to-launch`) | Original code-rendered media | Ordered outcomes sequence | Four deterministic SVG states using the same graphite grid and restrained violet-blue palette |

## Rights and provenance

The assets are local repository assets already used by the current implementation. The board references the real project names and real capability/process content from `src/lib/data.ts`.

## Asset guardrails

- Code-rendered project fields must remain abstract, clearly non-claiming, and free of
  logos, readable fake data, invented metrics, or simulated client deliverables.
- Keep media surfaces large enough to read the artifact and quiet enough that type remains primary.
- Prefer poster-first, responsive sizing, and lazy loading for below-the-fold media.

## Controlled presentation pass

The existing `hero-glass.png` remains the approved full-bleed hero atmosphere. Grace
remains the only real project-motion proof and appears once on the homepage. The former
generated bitmap placeholders were removed and replaced with one coherent, lightweight
system-field component following the guardrails above.

The focused process pass adds four new deterministic geometry states to the same
component rather than introducing another media style or bitmap payload.

The outcomes refinement adds no bitmap, canvas, video, or third-party media payload.
Its four proof states extend the existing deterministic system-field component and do
not contain fake labels, metrics, dashboards, or client claims.

## Client delivery asset use — 2026-08-28

The delivery uses the existing media inventory only:

- `public/brand/hero-glass.png` remains the hero anchor and is reused as a low-opacity
  prism texture inside the portfolio/process fields.
- `public/brand/grace/grace-animation.mp4` and its poster remain the only real project
  media, now appearing as the Grace portfolio tile.
- `src/lib/data.ts` supplies all five real client/project names, copy, years, tags, and
  case-study routes.
- Other portfolio tiles are deterministic CSS/SVG artifact surfaces labeled from that
  real data; no project, client, metric, or image was fabricated.
