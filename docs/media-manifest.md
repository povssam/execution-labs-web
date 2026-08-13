# Execution Labs — Media Manifest V2

All media used in the exploration already exists in the repository. No image, client, logo, metric, testimonial, or project claim was invented.

| Asset | Source | Use in exploration | Responsive/performance note |
| --- | --- | --- | --- |
| `public/brand/hero-glass.png` | Existing brand asset | Hero atmosphere in A/B; desaturated presentation in C | Use as a single responsive image; preserve the existing crop and avoid duplicate copies |
| `public/brand/logo.png` | Existing brand asset | Available E mark reference; not required as a new hero lockup | Keep small and only where it supports navigation/CTA |
| `public/brand/grace/grace-animation-poster.jpg` | Existing Grace asset | Selected Work fallback/poster and phone-review surface | Poster-first loading; keep intrinsic ratio; lazy-load below hero |
| `public/brand/grace/grace-animation.mp4` | Existing Grace asset | Motion Work / Selected Work proof surface | Poster fallback, `playsInline`, no autoplay requirement for direction review |
| `public/brand/grace/grace-branding-concept.pdf` | Existing Grace reference | Not embedded in the board; retained as source material | Do not ship as page media without a deliberate review path |

## Rights and provenance

The assets are local repository assets already used by the current implementation. The board references the real project names and real capability/process content from `src/lib/data.ts`.

## Asset guardrails

- Do not add stock imagery, generated project screenshots, fake dashboards, or invented logos.
- Keep media surfaces large enough to read the artifact and quiet enough that type remains primary.
- Prefer poster-first, responsive sizing, and lazy loading for below-the-fold media.

## Controlled presentation pass

No new media was generated. The existing `hero-glass.png` remains the approved,
full-bleed right-side hero atmosphere. The Grace poster/video remains the only moving
proof asset. Projects without repository media use their real names, categories, and
artifact descriptions as an editorial field rather than generated dashboards or imagery.
