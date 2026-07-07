Execution Labs website. Shipped and live in production.

Live: https://execution-labs-web.pages.dev
Repo: https://github.com/povssam/execution-labs-web
Branch flow: work on feat/mvp-website, PR to main, deploy from main.

Brand voice:
Execution Labs builds AI agents and software that save companies time and money.
Clean, confident, fast, dark, technical.
No generic agency language.
No em dashes.
Short sentences.
Plain words.

Stack:
Next.js App Router (static export, output: "export")
TypeScript
Tailwind CSS v4 (theme tokens in src/app/globals.css @theme)
lucide-react
No Lenis. Custom rAF smooth scroller in src/components/SmoothScroll.tsx. Client approved it. Keep it.

Pages:
/ (home), /work, /work/[slug], /services, /contact

Design system (do not regress):
Colors: ink #050505, charcoal, bone off-white. Prism accents only in atmosphere layers, never as UI color.
Signature motion: the "proof flow" system. Prism flow lines (.flow-line, .flow-rail-x/y) draw in on scroll via animation-timeline: view(). Fully drawn by default; animation is enhancement only.
Second motion: soft light sweep (.light-sweep) on featured media. Same prism palette.
Hero: prism glass image (public/brand/hero-glass.png) as full-bleed background atmosphere (.hero-glass-bg). Logo in the asset is cropped out of frame by transform (desktop) and object-position (mobile). No banner, no card, no text in the image.
Worked With: full-bleed editorial wordmark marquee. Real names only: Grace, Orbit Artist Group, Media Scaling, Soniq, Dividends & Total Returns. Opacity rhythm, wide spacing, edge fade masks, 72s/48s loop. No pills, no boxes, no separators.
What we build: editorial index list (number, title, stance). No icons, no pills.
Process: Brief, System map, Build, Proof. Steps sit on the flow rail. No stepper cards.
Motion Work: latest Grace video (public/brand/grace/grace-animation.mp4) full width first, short text under. Video assets are the proof; keep them dominant.

Motion rules:
Content visible by default. Never gate content on animation or JS.
Respect prefers-reduced-motion everywhere (marquee goes static and wrapped, sweeps and draws disabled).
No bounce. No overshoot. No parallax. Transitions 150 to 300ms.

Client (Amiri) confirmed direction:
Likes: smooth scroll, marquee, studio statement line, unique scroll-drawn animation.
Dislikes: template feel, chips and pills, fake dashboard filler, "AI-made in 2 prompts" look.
Feedback assets live in Drive folder "Labs" (client-feedback-*.png).

QA before deploy:
npm run lint
npm run build
Serve out/ and screenshot at 390x844, 430x932, 1366x768, 1440x900.
Check /, /work, /work/grace, /contact.

Deploy (Cloudflare Pages, static export in out/):
npx wrangler pages deploy out --project-name execution-labs-web --branch feat/mvp-website   # preview
npx wrangler pages deploy out --project-name execution-labs-web --branch main               # production
Needs CLOUDFLARE_API_TOKEN in env.
