# Execution Labs — Art Direction V2 Directions

The local board at `docs/art-direction-v2/board/` mirrors the requested Figma page structure. It uses only the repository’s existing visual assets and real content. The Figma connector is not exposed in this workspace, so no Figma URL is fabricated.

## 01 — Direction A: Dark editorial technology studio

### Central idea

The studio as an editorial index: clear type, a disciplined information system, and one cinematic artifact at a time.

### Composition

- Desktop hero: oversized left-aligned statement over a strict two-column field, with the glass identity asset carrying the right side and fading into black.
- What we build: an editorial headline and a six-row capability index; hierarchy comes from type scale and line rhythm, not containers.
- Selected Work: “Proof, held in the frame.” Grace’s real poster/video is the dominant surface, with the real project list acting as a quiet index beside it.
- How we work: one large progression headline followed by a restrained text list.
- Worked With: a low-contrast client rail that behaves as a continuation of the system.
- CTA: a single oversized question and one text link.

### Mobile composition

The glass field moves behind/through the first hero beat, then resolves into a single-column editorial sequence. Capability and project lists retain their row rhythm; the Grace artifact becomes full-width and readable before the project index.

### Type, color, and media

Black, warm white, and muted gray only. The existing glass asset supplies the color and depth. Monospaced micro-labels create technical contrast against a large grotesk headline.

### Motion language

Mask the hero statement in line groups, reveal list rules sequentially, and transition the Grace surface with opacity plus a small scale correction. No perpetual ambient movement beyond the real video.

### Complexity and risk

Medium. It can reuse current layout primitives and existing media. Main risks are type rendering consistency and keeping the large image performant on low-end mobile devices.

## 02 — Direction B: Experimental creative technology

### Central idea

The system in motion: the page behaves like a spatial index where type, real media, and project selection change the room around them.

### Composition

- Desktop hero: the glass asset becomes a wide atmospheric field, with a split headline and one cyan emphasis word crossing the media boundary.
- What we build: a giant “06” anchors the capability system while the six capabilities sit as a precise list and one selected capability occupies a small data note.
- Selected Work: the real project index stays visible while Grace’s artifact floats forward on a slight angle with a small caption block.
- How we work: Brief → System map → Build → Proof becomes a horizontal track rather than four cards.
- Worked With: real clients form an asymmetric typographic constellation with restrained color cues.
- CTA: a compact statement paired with the E mark as a spatial closing gesture.

### Mobile composition

The hero becomes a full-bleed atmospheric field with compact type and a quiet “build / operate / prove” edge label. Selected Work is a vertical project index followed by the real Grace artifact; the process track becomes a connected vertical sequence.

### Type, color, and media

Near-black blue, pale lavender, muted gray, and one controlled cyan accent. The color is used only to establish interaction intent; the real glass asset remains the source of energy.

### Motion language

Project selection can move the artifact with a short transform/opacity transition. The selected capability note resolves after the index settles. The spatial layers must never rotate continuously or overshoot.

### Complexity and risk

High. Requires the most bespoke interaction logic, careful focus order, touch behavior, and compositing discipline. Floating media and layered backgrounds need GPU/performance testing, especially on mobile Safari.

## 03 — Direction C: Precision minimal brutalist

### Central idea

Precision is the personality: black and paper, hard rules, large hierarchy, and proof treated as an editorial record.

### Composition

- Desktop hero: a black/white treatment of the existing glass asset sits beside a tightly stacked headline; a single rule carries the supporting copy and CTA.
- What we build: a six-cell capability matrix with sharp divisions and no decorative containers.
- Selected Work: “The work is the proof.” Real projects become a quiet index beside a large grayscale Grace artifact.
- How we work: the four real process steps occupy a connected ruled progression.
- Worked With: a strict five-row client register.
- CTA: a large, quiet closing line on paper with a single underline link.

### Mobile composition

The hero stacks headline → grayscale asset → rule/copy → CTA. The capability matrix becomes one column, Selected Work puts the artifact before its index, and the process keeps a compact two-column rhythm without horizontal overflow.

### Type, color, and media

Paper, ink, black, and gray. The real glass asset is desaturated through presentation only; no new image is introduced.

### Motion language

Rules draw on entry, type resolves from a slight blur, and the selected work artifact fades between states. Motion is intentionally sparse and mostly opacity/transform.

### Complexity and risk

Low to medium. It is the simplest to implement and the easiest to make fast and accessible. The trade-off is that it moves furthest from the approved dark/prism identity and may feel more like a print system than a living technology studio.

## Recommendation

Recommend Direction A as the implementation candidate.

A keeps the strongest parts of the existing approved work—dark identity, prism atmosphere, real Grace media, and clear typography—while giving every lower section a distinct composition. It creates a premium studio feeling without making the interaction model carry the entire concept. Direction B should inform a restrained Selected Work transition or one spatial moment, not become the whole page. Direction C is a useful fallback if performance or brand restraint becomes the deciding constraint.

## Implementation pass — Direction A, controlled

The approved direction is now being translated as a restrained editorial system:

- The hero keeps the approved headline, structure, and full-bleed right-side prism treatment. Only its viewport framing is optically balanced.
- Worked With stays attached to the opening scene and occupies the bottom edge of the first viewport without a separate band or divider.
- Capabilities and Selected Work use an editorial index: large type, rules, and quiet selection state instead of rounded cards or rotating perspective.
- Selected Work prioritizes the strongest visible proof while preserving all real case-study routes in the work archive.
- Motion Work gives Grace the largest media surface and keeps its labels subordinate to the asset.
- CTA hierarchy remains singular: `Start a project` is the only primary action and the approved footer direction is unchanged.

The existing local art-direction board remains the visual reference because no Figma MCP connector is exposed in this workspace.

## Client delivery direction — orbital project portfolio

The portfolio is the signature post-hero moment. Its near-black field, thin rules,
hero-derived chromatic prism treatment, and restrained cyan state color extend the
existing Execution Labs visual system without turning the page into a generic AI
dashboard. Project artifacts sit on a controlled orbital composition around the central
`Project Portfolio` title; selecting a tile resolves its client, discipline, summary,
and existing case-study route.

On small screens the same rotor remains intact and is intentionally cropped beyond the
viewport. The center stays quiet while four to six upright project tiles occupy the
upper and side arc. Native vertical scroll advances the wheel; it never collapses into
an editorial card stack or horizontal carousel.

## Gather-reference correction — 2026-08-29

The approved hero remains unchanged. After it, `hero-glass.png` becomes the single
visual anchor: a cinematic refracted field bridges into the portfolio, and a circular
lens carries the four process states. Dashboard grids, system graphs, route maps, and
large technical readouts are no longer the primary visual language.

The portfolio follows the reference construction principle rather than its surface
styling: one large cropped rotor, eighteen radial arms, upright compact media tiles,
black center space, small centered copy, and precise scroll-derived rotation. Desktop
uses a broad circular field; mobile preserves the same geometry at roughly 650px and
crops it to a five-tile arc.

## Reference-grounded middle system — 2026-08-29

The portfolio's grammar now carries through the whole middle rather than being
repeated literally:

- `01 / Refracted Field` bridges the hero with one large optical field and a short statement.
- `02 / Project Orbit` uses the true circular rotor as the signature interactive composition.
- `03 / Protocol Lens` keeps one lens on screen while Brief, System, Build, and Proof become states.
- `04 / Capability Stack` uses one layered spatial object for AI Agents, Software, Automation, and Product Systems.
- `05 / Evidence Viewport` uses one real project viewport with five real project states.

Black space and real media do most of the work. Hero-derived `hero-glass.png` is used
as a restrained optical surface, while mono labels remain instrumentation rather than
the visual subject. The sections are intentionally sparse so the middle belongs to the
same refracted, engineered world as the approved hero.

## Client brand-alignment pass — 2026-08-30

The approved hero and Worked With rail remain locked. The post-hero now has one
connected visual grammar: a restrained refracted statement wakes the system, one
capability engine reconfigures rather than swapping generic illustrations, one
real-media Project Portfolio orbit becomes the work showcase, and the protocol lens
shows the same routing logic at four execution stages. The visual hierarchy is black
space first, real project media second, and instrumentation last.
