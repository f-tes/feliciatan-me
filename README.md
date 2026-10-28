# feliciatan.me

Personal research + builder site. Next.js (App Router) · TypeScript · Tailwind v4 · Motion · native HTML5 video · custom Canvas ASCII renderers (no Three.js).

## Run locally

Requires Node 20+ (built and tested on Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint         # type-check
npm run build && npm start   # production build, http://localhost:3000
```

## Deploy to feliciatan.me (Vercel)

**1. Put it on GitHub**
```bash
git init && git add . && git commit -m "feliciatan.me v1"
# create an empty repo on github.com (e.g. f-tes/feliciatan-me), then:
git branch -M main
git remote add origin https://github.com/f-tes/feliciatan-me.git
git push -u origin main
```
`node_modules/` and `.next/` are already git-ignored. The whole repo is ~5 MB (the demo video is ~2 MB).

**2. Deploy**
1. Go to vercel.com → sign in with GitHub → **Add New… → Project** → import the repo.
2. Framework is auto-detected as Next.js. Leave build settings as they are. Click **Deploy**.
3. You get a `*.vercel.app` URL in about a minute. Open it and check the list below before pointing the domain.

(CLI alternative: `npx vercel` for a preview, `npx vercel --prod` for production.)

**3. Connect the domain**
1. Vercel project → **Settings → Domains** → add `feliciatan.me` (and `www.feliciatan.me`, set to redirect to the apex).
2. At your domain registrar's DNS settings, add the records Vercel shows. They are normally an **A** record `@ → 76.76.21.21` and a **CNAME** `www → cname.vercel-dns.com`. Use whatever values the Domains page displays; they win over these.
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically.

Every push to `main` redeploys automatically.

**4. After it's live, check**
- Hero ASCII renders and follows the cursor; the torus in the footer rotates and drags.
- Hover Meta-Robots: the video plays, boxes and caption pop in, and it resets when you leave.
- All three research pages open; the MAESTRO "read the report" viewer shows 18 pages; the poster enlarges.
- Footer links: email, GitHub, LinkedIn. Test on your phone too.
- `yourdomain/media/maestro/` contains images only. No PDF is served anywhere.

## Where things live

| What | Where |
|---|---|
| Hero copy, interests, email / GitHub / LinkedIn | `src/data/profile.ts` |
| MAESTRO / Meta-Robots / SINDEX content, stats, tables, hover callouts | `src/data/research.ts` |
| Currently building, more projects (incl. physics, STEM groups) | `src/data/projects.ts` |
| Colours (Electric Periwinkle) | `@theme` in `src/app/globals.css` |
| Fonts (provisional Option A) | `src/lib/fonts.ts`, `src/app/layout.tsx`, font stacks in `globals.css` |
| Hero ASCII photo | `src/components/AsciiPhoto.tsx` (glyphs sampled from the photo's luminance; cursor = lens + ripple) |
| Hero photo tone | `scripts/make-duotone.mjs` → `public/media/hero/felicia-periwinkle.webp` |
| 3D ASCII torus | `src/components/AsciiTorus.tsx` (mesh, rotation, perspective, Lambert shading, z-buffer) |
| Project showcase + hover video | `src/components/ResearchShowcase.tsx` |

**Common edits**
- Add a current project: push an object into `building` in `projects.ts`.
- Add an archive entry: push into `past` (set `group` to file it under a sub-heading).
- Add SINDEX images: set `lead: { kind: "image", src: "/media/sindex/x.webp", alt: "…" }` in `research.ts`, put the file in `public/media/sindex/`, and add `callouts` (x/y/w/h as % of an 8:3 frame) for the hover boxes. Crop the lead image to 8:3 so boxes line up.
- Rebuild the hero tone from the original photo: `SRC=/path/to/photo.jpg node scripts/make-duotone.mjs`.

## Behaviour notes

- Video: poster by default, no autoplay on load, `preload="metadata"`. Desktop hover/focus plays muted and looped, then resets on leave. Touch / no-hover devices and reduced-motion users get a play button, and the description sits below the media instead of popping in.
- `prefers-reduced-motion`: no scramble, magnetic, hover autoplay, lens ripple or torus spin (the torus renders one static frame; drag still works).
- Animation loops pause off-screen and clean up on unmount.
- No PDFs are shipped. The MAESTRO report is 18 page images and the poster is an image, with no download links. Anything shown in a browser can still be screenshotted.

See `MISSING.md` for open assets and claims to verify.
