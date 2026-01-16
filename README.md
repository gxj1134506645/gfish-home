# gfish-home — Personal Site & Blog (Astro)

English | 简体中文: [README.zh-CN.md](README.zh-CN.md)

---

## Overview

Static‑first bilingual personal site built with Astro: links hub, blog, resume, Now page, projects, and social profiles. Includes RSS, Sitemap, SEO meta, optional analytics, and deploy presets.

- Bilingual routes: `/` (Chinese), `/en` (English)
- Content collections: MDX + zod frontmatter
- Data‑driven: `links.json`, `projects.json`, `resume.json`, `now.json`
- SEO: Open Graph, Twitter; optional JSON‑LD
- Feeds: `/rss.xml`, `/en/rss.xml`, `/sitemap.xml`, `/robots.txt`

## Stack
- Astro + MDX + Tailwind
- Content Collections (`astro:content` + `zod`)

## Project Structure
- `src/pages` routes (CN/EN)
- `src/layouts` `BaseLayout.astro`, `BlogLayout.astro`
- `src/components` `Nav`, `Footer`, `LangSwitch`, `SocialLinks`, `ProjectCard`, `PostList`, `QRCodes`
- `src/content/blog` MDX posts (CN/EN)
- `src/content/config.ts` content schema
- `src/data` `site.json`, `links.json`, `projects.json`, `resume.json`, `now.json`
- `public` static assets (`images/`, `fonts/`, `_headers`, `_redirects`)
- `docs/prompt.md` prompts

## Develop
- Node.js 18+ (20+ recommended)
- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

Telemetry
- Disable: `npx astro telemetry disable`
- Per‑run: `ASTRO_TELEMETRY_DISABLED=1 npm run build`

## Environment
- `PUBLIC_ALLOW_INDEX` search indexing control
  - Staging: `0`/unset → `noindex`, robots `Disallow`
  - Production: `1` → allow, robots with Sitemap
- Optional analytics
  - Plausible: `PUBLIC_ANALYTICS_PROVIDER=plausible`, `PUBLIC_PLAUSIBLE_DOMAIN=gfish.online`
  - Umami: `PUBLIC_ANALYTICS_PROVIDER=umami`, `PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js`, `PUBLIC_UMAMI_WEBSITE_ID=<site-id>`
- See `.env.example`

## Content
- CN post: `src/content/blog/<slug>.mdx`
- EN post: `src/content/blog/<slug>.en.mdx`
- One‑command CN/EN post:
  - `npm run new:post -- <slug> "中文标题" "English Title" [--date YYYY-MM-DD] [--draft]`
  - Example: `npm run new:post -- astro-i18n-guide "Astro 双语与内容模型最佳实践" "Best Practices for Astro i18n & Content" --date 2026-01-15`
- Frontmatter example (EN):
  ```md
  ---
  title: Best Practices for Astro i18n & Content
  description: Managing bilingual blogs and SEO with Content Collections.
  date: "2026-01-15"
  lang: en
  tags: ["astro","i18n","content"]
  image: "/images/blog/astro-i18n-guide/cover.webp"
  canonical: "https://gfish.online/en/blog/astro-i18n-guide"
  ---
  ```
- Images under `public/images/blog/<slug>/...` (absolute paths)

Update data
- Copy: `src/data/site.json`
- Social: `src/data/links.json`
- Projects: `src/data/projects.json`
- Resume: `src/data/resume.json`
- Now: `src/data/now.json`
- QR: `public/images/wechat-qr.jpg`, `public/images/wechat-personal.png`

## Deploy
- Vercel: `vercel.json` handles `www` → apex and security headers
- Cloudflare Pages: `_headers` for headers; Bulk Redirects for `www` → apex

## Notes
- Canonical: `https://gfish.online` (`astro.config.mjs`)
- China: show ICP/PSB via `src/data/site.json`

## FAQ
- `@astrojs/sitemap` build error → repo ships custom `src/pages/sitemap.xml.js`
- Frontmatter `date` must be a string like `"2026-01-15"`
- Disable indexing on staging: `PUBLIC_ALLOW_INDEX=0` (robots `Disallow` + meta `noindex`)
- Disable telemetry: `npx astro telemetry disable`
- Analytics blocked by CSP: set env vars; update CSP when self‑hosting
- `www` → apex: Vercel via `vercel.json`; Pages via Bulk Redirects
- Images not showing: ensure assets are under `public/` and use absolute paths
- Change canonical: update `site` in `astro.config.mjs`

## Release Checklist
- Content: homepage/links/projects/resume/now updated; frontmatter valid; drafts use `draft: true`
- SEO/Crawl: `PUBLIC_ALLOW_INDEX=1`; `sitemap.xml`, `/rss.xml`, `/en/rss.xml` valid; `hreflang` alternates
- Assets/Perf: self‑hosted images (webp/avif), no external fonts; Lighthouse ≥ 95
- Security/Compliance: HTTPS, HSTS, CSP, Referrer‑Policy, X‑Content‑Type‑Options; ICP/PSB shown if applicable
- Domains/Redirects: `www.gfish.online` 301 → `gfish.online`; IPv6 & HTTP/3 enabled

---

Contributions welcome. Open an Issue for ideas like JSON‑LD, more templates, or scripts.
