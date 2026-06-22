# Execution Labs — Preview Review (for Design + Sales)

**Live preview:** https://execution-labs.pages.dev
**Reviewed:** Home, Work, Contact — desktop (1440) and mobile (390)
**Status:** Renders correctly everywhere, no broken layout, no horizontal scroll. This is a polish + go-to-market readiness review, not a bug list.

---

## TL;DR — 3 things to fix BEFORE driving any traffic

1. **The contact form does not send anywhere.** Submitting shows a "Brief received" success screen but no email/CRM is wired up. Every lead is silently lost. This is the #1 blocker for sales.
2. **All case studies are placeholder data.** Orbit Artist Group, Media Scaling, Soniq, Dividends & Total Returns, Custom AI Ops System and their metrics (-70%, $4.2M, 1.1k users, etc.) are invented. Do not share publicly or in sales outreach until they are real and approved by the clients.
3. **No link preview / no analytics / no custom domain.** Sharing the URL in email or DMs shows no preview card, we can't measure traffic, and it's on a `pages.dev` URL instead of executionlabs.com.

---

## What's working well (keep it)

- Clean, confident, dark, technical look that matches the brief. Mono labels, rounded cards, thin borders, subtle grid + glow.
- The hero "ops dashboard" is a strong, on-brand proof-of-capability visual instead of stock art.
- Clear information architecture: What we build → Why us → Work → Process → CTA.
- Strong, plain-spoken copy. Short sentences, no agency fluff, no em dashes.
- Fully responsive, fast static site, content visible immediately.

---

## FOR DESIGN

### Polish / refinement
- **Hero dashboard density on mobile.** The 6 panels compress hard on small screens and some labels get tight (e.g. "operational" next to "System status", client-brief text near its panel edge). Consider showing fewer panels on mobile or letting them stack full-width.
- **Lots of vertical whitespace.** Section padding is generous (`py-24 sm:py-32`). On-brand, but the page scrolls long for the amount of content. Tightening 10–15% would feel more confident and less empty.
- **Work page redundancy.** Each case study shows a card (with metrics) *and* a detail panel (with the same metrics restated). Consider differentiating them or dropping the duplicate metric block.
- **Contact page balance (desktop).** The left info column ends high, leaving a large empty area under it next to the form. Add a testimonial, a logo strip, or a small "what happens next" timeline to fill it.
- **Favicon / brand mark.** Still the default. Add a real Execution Labs mark for the tab and OG image.

### Missing design elements that help conversion
- **Social proof band** — client logos (even "trusted by" greyscale), or a single strong testimonial near the hero.
- **A face/name** — the site says "founder led" but shows no person. A small founder note or photo builds trust fast for high-ticket work.
- **OG / share image** — a branded 1200×630 image so shared links look intentional.
- **Subtle motion is already good;** no bounce, fast transitions. No change needed.

---

## FOR SALES

### Lead capture (critical)
- **Wire the form to a real destination** — email, a shared inbox, or a CRM (HubSpot/Pipedrive/Notion). Options: Formspree, Web3Forms, a Cloudflare Worker, or a CRM embed. Until then, treat the site as brochure-only and route people to email/DM.
- **Confirm `hello@executionlabs.com` is live and monitored.** It's listed in the footer and contact page as the direct line.
- **Add a "Book a call" path.** Right now the only CTA is "Start a project" → form. Warm leads convert better with a calendar link (Cal.com / Calendly). Consider a secondary "Book a 20-min call" button.

### Messaging & credibility
- **Real case studies with permission.** Replace the dummy ones. For each: client (or anonymized "a 40-person media agency"), the problem, what was built, and a *defensible* result. Avoid hard numbers you can't back up.
- **Qualifying is good** — the budget chips (Under 10k / 10k–30k / 30k+ / Not sure) and project-type chips pre-qualify leads. Keep these; they save sales time.
- **The hero stats (6 wks / 70% / 24h)** read as proof but are generic. Either tie them to a real example or label them as typical ("typical idea-to-MVP").

### Go-to-market readiness
- **Custom domain.** Point executionlabs.com (or a subdomain) at this Pages project so outreach links look legit.
- **Analytics.** Add Plausible or GA4 so we can see traffic sources and form starts vs. submits.
- **Lead routing/notification.** When a brief comes in, sales should get an instant notification (Slack/email) with the project type + budget so response time stays under the promised 24h.

---

## Suggested priority order

| # | Item | Owner | Effort | Impact |
|---|------|-------|--------|--------|
| 1 | Make contact form actually send (email/CRM) + notification | Eng | S | Critical |
| 2 | Replace dummy case studies with real, approved ones | Sales + Design | M | Critical |
| 3 | Point custom domain + add analytics | Eng | S | High |
| 4 | Add OG/share image + favicon | Design | S | High |
| 5 | Add social proof (logos / testimonial / founder) | Design + Sales | M | High |
| 6 | Add "Book a call" calendar CTA | Sales + Eng | S | Medium |
| 7 | Tighten spacing + mobile dashboard density | Design | S | Medium |
| 8 | De-duplicate metrics on Work page | Design | S | Low |

S = under a day, M = a few days.

---

*This is a static export deployed to Cloudflare Pages. To ship updates: `npm run build` then `wrangler pages deploy out --project-name=execution-labs`.*
