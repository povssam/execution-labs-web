# Execution Labs — Art Direction V2 Creative Brief

## Context

Execution Labs builds agents and software that save companies time and money. The current implementation is approved production-adjacent work and remains the untouched baseline for this exploration. This phase is visual art direction only; no production source has been changed.

## Audience

Founders and operators who have a real workflow, product, or internal-system problem and need a high-craft team that can move from ambiguity to a useful build quickly.

## Desired response

The site should make a serious prospective client think: “They understand the problem, they have taste, and they can build the thing.” It should feel premium, editorial, cinematic, minimal, technical but human, and confident without performing futurism.

## Core message

Agents and software that save time and money.

## Experience principles

- Lead with typography, real media, and a deliberate pace.
- Make Selected Work the proof moment, with Grace as the only available moving/artifact surface.
- Let each section have a distinct composition while sharing a strict grid, restrained type system, and dark technical atmosphere.
- Treat mobile as a designed composition, not a compressed desktop canvas.
- Let motion enter, perform one clear job, and settle.

## Guardrails

- Preserve the real client list, capability list, process list, approved hero language, and available assets.
- Do not invent metrics, testimonials, awards, case studies, logos, project imagery, or outcomes.
- Avoid generic SaaS grids, excessive pills, rainbow gradients, fake dashboards, and glassmorphism as a surface treatment.
- Keep the exploration isolated from `feat/mvp-website`; this phase does not deploy.

## Concise page architecture

1. Hero
2. What we build
3. Selected work / proof
4. How we work
5. Worked with
6. Contact CTA

## Implementation refinement — controlled signature

This pass implements the approved Direction A language on `feat/art-direction-v2`.
The goal is not a new concept. It is a tighter reading of the same dark editorial
technology studio: the prism asset carries the signature, real work arrives sooner,
and every transition has a clear resting state.

### Narrative

1. Hero: direct positioning, signature prism, and one clear action.
2. Worked With: legitimate client signal remains in the first viewport.
3. Studio statement: a full editorial beat with a short masked word reveal.
4. Capabilities: a readable editorial index.
5. Selected work: the strongest projects stay large and the index stays quiet.
6. Motion Work: Grace is the dominant moving proof surface.
7. Process, signals, and CTA: a clean path from capability to action.

### Non-goals

- No new effects, generated imagery, fake metrics, testimonials, or client claims.
- No hero structure change, footer rewrite, production deployment, or new primary CTA.
- No continuous animation outside the intentional Worked With rail and real Grace video.

### Success criteria

- The first viewport still reaches Worked With at 390, 430, 768, 1366, and 1440 widths.
- The statement owns one calm editorial beat before the capability system begins.
- Grace media is materially larger than its surrounding copy and chrome.
- Selected Work reads as a controlled index, not a rotating card carousel.
- Supporting copy remains readable on mobile and no page-level horizontal overflow exists.

## Coherent system-field refactor — 2026-08-18

The middle now follows one concept: Execution Labs turns ambiguous operational work
into a legible system. Capabilities and projects without authentic product captures use
the same restrained, non-claiming system-field visual language rather than unrelated
AI-generated dashboard imagery. Grace remains the single real moving proof surface.

Narrative sequence:

1. Studio statement establishes the ambition.
2. What We Build turns six capabilities into one interactive system instrument.
3. Selected Work pairs one dominant project with either authentic Grace media or a
   project-specific abstract system map.
4. Brief → System map → Build → Proof explains the method in one compact field.
5. Four outcomes close the argument before the approved CTA.

The standalone Motion Work section was merged into Selected Work because it repeated
Grace and interrupted the proof sequence. No client, metric, result, testimonial, or
case study was added.

## Client delivery alignment — 2026-08-28

The client feedback thread and supplied references are the source of truth for this
delivery. The approved hero remains intact. The first major change begins after the
hero: the former video/project treatment is now a Project Portfolio experience with a
central title, five real case-study states, orbiting artifact tiles, scroll progression,
and direct case-study links.

Only the real case-study data in `src/lib/data.ts` is used. Grace keeps the existing
video/poster; the other projects use restrained code-rendered artifact surfaces because
the repository contains no authentic project captures for them. The process section now
reads as one execution protocol field rather than four generic cards. Mobile uses a
native horizontal snap rail and the same concise project metadata, not a shrunken
desktop orbit.
