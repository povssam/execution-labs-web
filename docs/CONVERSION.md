# Conversion Strategy — Execution Labs

How the site is engineered to convert, and who it converts. Built to be
trust-led, not pushy. No urgency tricks, popups, or fake scarcity.

## Who actually converts (ICP)

From the brand and the real case studies, the buyer is:

- **Founders, agency owners, and ops leads** at small-to-mid companies.
- In **music, media, finance, and ops** (matches the case studies).
- Often **non-technical** decision-makers — they buy outcomes, not stacks.
- Busy and **skeptical of agencies**; they've been burned by slow, vague vendors.
- Buying a **mid-ticket, considered purchase (10–30k)** — not impulse, not
  enterprise procurement. The decision is about trust and risk, not price alone.

**What moves this buyer:** proof the team ships, clarity on process/cost/timeline,
low perceived risk, and a low-commitment way to start. **What repels them:**
pressure, hype, jargon, and anything that smells like a hard sell.

## The conversion model we built around

1. **Two-speed CTA, every screen.** A committed path ("Start a project") and a
   low-friction one ("Book a call") so people self-select by readiness. Neither
   shouts.
2. **Risk reversal up front.** "Fixed scope, fixed price · Working software in
   days · You own everything · No long contracts." These are factual, tied to
   how engagements actually run — they lower the felt risk of a 10–30k decision.
3. **Certainty about the next step.** The contact page spells out exactly what
   happens after you submit (read → reply within a day → map before quote), so
   reaching out feels safe.
4. **Honest proof, not invented proof.** An "industries we ship for" strip and
   real case studies. Testimonials and logos are wired but only render when real,
   approved content exists — nothing fabricated ships.
5. **No-pressure microcopy** at the decision points: "Free scoping call. No
   pressure, no hard sell." / "We reply within a day. No spam, no sales pitch."

## What's implemented now

- Hero: low-friction "Book a call" beside "Start a project", no-pressure
  microcopy, and an honest "Shipped for teams in: Music · Media · Finance · Ops ·
  Startups" trust strip.
- New **risk-reversal band** on the homepage right before the closing CTA.
- **Testimonials section** that hides itself until real quotes are added
  (`testimonials` in `src/lib/data.ts`).
- Contact page rebuilt for conversion: numbered "What happens next", the
  risk-reversal checklist, a "Book a 20-minute call" option, and reassurance
  microcopy under the form. (Also fills the empty space flagged in the review.)
- Closing CTA: dual buttons + "Free 20-minute scoping call. No obligation."
- Clickable case studies + Services/FAQ (from the navigation pass) remove the
  research dead-ends that stall considered buyers.

## What unlocks the next jump (needs you — no fabrication allowed)

These are the highest-leverage items left, in order:

1. **1–3 real testimonials** (quote, name, role). Add to `testimonials` in
   `src/lib/data.ts` and the section appears automatically. Biggest single lever.
2. **Real client logos** for the trust strip (with permission).
3. **A founder name + 1–2 lines / photo** — "founder led" converts far better
   with a real human attached.
4. **Real case study numbers** you can stand behind (the current ones are
   placeholders — using them in outreach is a credibility risk).
5. **Calendar link** for "Book a call" (`NEXT_PUBLIC_CALENDAR_URL`) and the
   **Web3Forms key** so the form delivers. Until set, "Book a call" routes to the
   contact form and the form falls back to email.

## What we deliberately did NOT do

Countdown timers, exit-intent popups, "limited spots", spammy email capture,
or guilt-y close copy. For this buyer those lower trust and conversion.
