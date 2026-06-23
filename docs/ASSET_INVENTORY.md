# Asset Inventory — Execution Labs

Status of the brand inputs and exactly what I can and cannot access from this
environment.

## Access check (honest)

| Source | Accessible here? | How |
|---|---|---|
| Brand doc (Google Doc) | YES (text) | Read via the doc's public text export. Voice/brief captured. |
| Drive folder file list | YES (names only) | Folder is public; file names + sizes visible. |
| Drive binaries (logo, images, videos) | NO | WebFetch returns page metadata only. No file IDs, no direct download, cannot fetch binary image/video data. |
| Figma file | NO | Requires Figma auth / API token. Cannot render or export. |

**Conclusion:** I cannot pull the real logo, the colorful glass/lens image, the
reference/feedback screenshots, or the videos into the repo. Per Rule 1 I will
not invent or fake them.

## Files seen in the Drive folder (contents NOT viewable from here)

| File | Size | Best guess (unconfirmed) | Intended use on the site |
|---|---|---|---|
| Execution Labs - Brand Voice & Brief | Google Doc | Brand voice + brief | Copy/voice. ACCESSED. |
| IMG_7672.PNG | 3 KB | Likely the logo / mark (tiny file = simple mark) | Nav, hero, footer, favicon |
| IMG_7671.PNG | 917 KB | Brand visual or screenshot | TBD once viewable |
| IMG_7674.PNG | 2.4 MB | Likely the colorful glass/lens hero asset (large, high-res) | Hero signature visual |
| IMG_7673.PNG | 432 KB | Brand visual / Grace mockup | Work / showcase |
| IMG_7676.PNG | 501 KB | Brand visual / Grace mockup | Work / showcase |
| IMG_7675.JPG | 735 KB | Photo or screenshot | TBD |
| b66fa48...mp4 | 175 KB | UI motion / carousel reference video | Motion reference (not embedded) |
| b9052026...mp4 | 290 KB | UI motion reference video | Motion reference (not embedded) |

## What I need uploaded into `public/brand/`

Drop the files in with these exact names and I will wire them up immediately:

1. `public/brand/logo.svg` (preferred) or `logo.png` — the real Execution Labs
   logo/mark. Used in nav, hero, footer, and as the favicon.
2. `public/brand/glass.png` (or `.jpg`) — the colorful glass/lens hero asset.
   Used as the signature hero visual.
3. `public/brand/grace/` — Grace visuals (social mockups, phone UI frames).
   Name them `grace-1.png`, `grace-2.png`, ... Used in the Grace case study and
   the moving UI showcase columns.
4. (Optional, for my guidance only) `public/brand/refs/` — the feedback and
   website-reference screenshots. These help me match the direction; they will
   not ship.

If it is easier, just drop the original `IMG_76xx` files in and tell me which is
the logo and which is the glass/lens image.

## Done without those binaries (this pass)

- Added the **Grace** case study to Selected work (real project context).
- Removed the invented logo mark and the generated colorful glass image so the
  site stops shipping fake brand identity. The hero uses the wordmark and a
  neutral glow until the real assets land.
- Kept rendering correct (content visible by default, no blank sections).
