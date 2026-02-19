# Clippy Web

Production website for Clippy, a macOS clipboard manager.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- GSAP (UI motion)
- Tailwind CSS 4 (global utility imports)
- Vercel Analytics + Speed Insights

## Project Structure

```text
src/
  app/
    layout.tsx               # Global metadata, JSON-LD, fonts, app shell
    page.tsx                 # Landing page sections and interactive UI
    globals.css              # Design system + responsive rules
    download/latest/route.ts # Latest release download proxy
    robots.ts                # Robots policy
    sitemap.ts               # Sitemap entries
    manifest.ts              # Web app manifest
    opengraph-image.tsx      # Dynamic OG image
    twitter-image.tsx        # Dynamic Twitter image
  components/ui/
    liquid-glass-header.tsx  # Header/nav and mobile menu
  proxy.ts                   # Domain canonicalization + cache/index headers
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Domains and SEO

- Canonical domain: `https://www.clippyapp.live`
- Apex domain `https://clippyapp.live` is permanently redirected to `www`
- `*.vercel.app` responses are marked `noindex` via `X-Robots-Tag`
- Canonical, Open Graph, Twitter, JSON-LD, sitemap, robots, and manifest are configured

## Caching Behavior

- HTML/doc requests are sent with no-store/no-cache headers via `src/proxy.ts`
- Static assets remain cacheable/immutable
- Service workers are unregistered at load to avoid stale old-site shells

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- Build may fail in restricted/offline environments because `next/font/google` needs network access to fetch Geist.
- `public/*.svg` files are intentionally ignored (local-only large assets).
