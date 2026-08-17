# Execution Labs — Media Manifest V2

Approved brand and Grace media remain repository assets. The homepage also uses a
small set of explicitly commissioned, non-claiming generated placeholders where the
project did not include visual proof. No client, logo, metric, testimonial, or project
claim was invented.

| Asset | Source | Use in exploration | Responsive/performance note |
| --- | --- | --- | --- |
| `public/brand/hero-glass.png` | Existing brand asset | Hero atmosphere in A/B; desaturated presentation in C | Use as a single responsive image; preserve the existing crop and avoid duplicate copies |
| `public/brand/logo.png` | Existing brand asset | Available E mark reference; not required as a new hero lockup | Keep small and only where it supports navigation/CTA |
| `public/brand/grace/grace-animation-poster.jpg` | Existing Grace asset | Selected Work fallback/poster and phone-review surface | Poster-first loading; keep intrinsic ratio; lazy-load below hero |
| `public/brand/grace/grace-animation.mp4` | Existing Grace asset | Motion Work / Selected Work proof surface | Poster fallback, `playsInline`, no autoplay requirement for direction review |
| `public/brand/grace/grace-branding-concept.pdf` | Existing Grace reference | Not embedded in the board; retained as source material | Do not ship as page media without a deliberate review path |
| `public/media/generated/orbit-artist-ops.webp` | Generated placeholder | Orbit Artist Group project proof | Abstract roster/artist operations surface; contains no real names, logos, or metrics |
| `public/media/generated/media-scaling-control.webp` | Generated placeholder | Media Scaling project proof | Abstract media operations workflow; contains no performance claims |
| `public/media/generated/soniq-audio-product.webp` | Generated placeholder | Soniq project proof | Abstract audio-product surface; contains no brand marks or claims |
| `public/media/generated/dividends-return-system.webp` | Generated placeholder | Dividends & Total Returns project proof | Abstract return-system visualization; contains no real financial data |
| `public/media/generated/capability-ai-agents.webp` | Generated placeholder | AI Agents capability proof | Abstract orchestration surface |
| `public/media/generated/capability-internal-tools.webp` | Generated placeholder | Internal Tools capability proof | Abstract operations workspace |
| `public/media/generated/capability-mvp-software.webp` | Generated placeholder | MVP Software capability proof | Abstract connected product states |
| `public/media/generated/capability-product-systems.webp` | Generated placeholder | Product Systems capability proof | Abstract modular system composition |
| `public/media/generated/capability-motion-design.webp` | Generated placeholder | Motion Design capability proof | Abstract interface motion frames |
| `public/media/generated/capability-automation.webp` | Generated placeholder | Automation capability proof | Abstract routed workflow composition |
| `public/media/generated/motion-work-study.webp` | Generated placeholder | Motion Work proof | Abstract interface-state progression; avoids repeating Grace |

## Rights and provenance

The assets are local repository assets already used by the current implementation. The board references the real project names and real capability/process content from `src/lib/data.ts`.

## Asset guardrails

- Generated placeholders must remain abstract, clearly non-claiming, and free of logos,
  readable fake data, invented metrics, or simulated client deliverables.
- Keep media surfaces large enough to read the artifact and quiet enough that type remains primary.
- Prefer poster-first, responsive sizing, and lazy loading for below-the-fold media.

## Controlled presentation pass

The existing `hero-glass.png` remains the approved full-bleed hero atmosphere. Grace
remains the only real project-motion proof and appears once on the homepage. Generated
media is used only as presentation placeholder material for the remaining project and
capability states, following the guardrails above.
