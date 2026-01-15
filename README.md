# gfish-home — 个人主页与博客 (Astro)

简体中文 | English

---

## 简体中文

一个使用 Astro 构建的“纯静态优先”的双语个人站点：主页矩阵、博客、简历、Now、项目与社媒链接，支持 RSS、Sitemap、SEO 元信息、备案信息展示与国内/海外部署。

- 双语路由：`/`（中文）、`/en`（英文），功能页均有镜像
- 内容集合：MDX 博客，Frontmatter 由 zod 校验
- 数据驱动：`links.json`、`projects.json`、`resume.json`、`now.json`
- SEO：Open Graph、Twitter、可选 JSON‑LD（可后续扩展）
- 订阅与抓取：`/rss.xml`、`/en/rss.xml`、`/sitemap.xml`、`/robots.txt`
- 备案展示：页脚可显示 ICP 与公网安备

### 技术栈
- Astro + MDX + Tailwind
- Content Collections（`astro:content` + `zod`）

### 目录结构（节选）
- `src/pages`：路由页面（中/英）
- `src/layouts`：`BaseLayout.astro`、`BlogLayout.astro`
- `src/components`：`Nav`、`Footer`、`LangSwitch`、`SocialLinks`、`ProjectCard`、`PostList`、`QRCodes`
- `src/content/blog`：博客 MDX（中/英各一文件）
- `src/content/config.ts`：博客集合 Schema
- `src/data`：`site.json`、`links.json`、`projects.json`、`resume.json`、`now.json`
- `public`：静态资源（`images/`、`fonts/`、`_headers`、`_redirects`）
- `docs/prompt.md`：提示词合集

### 本地开发
- 要求：Node.js 18+（推荐 20+）
- 安装依赖：`npm i`
- 开发预览：`npm run dev`
- 构建产物：`npm run build`（输出到 `dist/`）
- 预览构建：`npm run preview`

可选：关闭 Astro 遥测
- 一次性：`npx astro telemetry disable`
- 临时（PowerShell）：`$env:ASTRO_TELEMETRY_DISABLED=1; npm run build`

### 环境变量
- `PUBLIC_ALLOW_INDEX`：是否允许搜索引擎索引
  - 备案/预览：`0`（或不设）→ 全站 `noindex`，`robots.txt` 返回 `Disallow`
  - 正式：`1` → 允许抓取，`robots.txt` 返回 `Allow` + Sitemap
- 可选分析：
  - Plausible：`PUBLIC_ANALYTICS_PROVIDER=plausible`，`PUBLIC_PLAUSIBLE_DOMAIN=gfish.online`
  - Umami：`PUBLIC_ANALYTICS_PROVIDER=umami`，`PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js`，`PUBLIC_UMAMI_WEBSITE_ID=<站点ID>`
- 样例：见 `.env.example`

### 内容维护
- 新增中文：`src/content/blog/<slug>.mdx`
- 新增英文：`src/content/blog/<slug>.en.mdx`
- 一键新建中英：
  - 命令：`npm run new:post -- <slug> "中文标题" "English Title" [--date YYYY-MM-DD] [--draft]`
  - 示例：`npm run new:post -- astro-i18n-guide "Astro 双语与内容模型最佳实践" "Best Practices for Astro i18n & Content" --date 2026-01-15`
- Frontmatter 示例：
  ```md
  ---
  title: Astro 双语与内容模型最佳实践
  description: 使用 Content Collections 管理中英文博客与 SEO。
  date: "2026-01-15"
  lang: zh
  tags: ["astro","i18n","content"]
  image: "/images/blog/astro-i18n-guide/cover.webp"
  canonical: "https://gfish.online/blog/astro-i18n-guide"
  ---
  ```
- 单语也可；`draft: true` 不出现在列表/RSS/Sitemap
- 图片：放 `public/images/blog/<slug>/...`，用绝对路径引用

更新数据
- 文案：`src/data/site.json`
- 社媒：`src/data/links.json`
- 项目：`src/data/projects.json`
- 简历：`src/data/resume.json`
- Now：`src/data/now.json`
- 二维码：`public/images/wechat-qr.jpg` 与 `public/images/wechat-personal.png`

### 部署
- Vercel
  - 导入仓库，构建：`astro build`
  - `vercel.json`：`www.gfish.online` → `gfish.online` 重定向；安全头（HSTS/CSP 等）
- Cloudflare Pages
  - 导入仓库，构建：`astro build`
  - `public/_headers`：全站安全头
  - `public/_redirects`：路径级重定向（域名级用 Bulk Redirects 配置 `www` → 根域）

### 备案与上线建议
- 备案前：使用平台二级域预览，`PUBLIC_ALLOW_INDEX=0`
- 备案后：填写 `src/data/site.json` 的 `icp`/`psb` 字段；生产设 `PUBLIC_ALLOW_INDEX=1`
- DNS：主域用 `https://gfish.online`，`www` 301 到根域；开启 IPv6/HTTP3（平台支持时）

### 常见问题（FAQ）
- `@astrojs/sitemap` 报错：本项目使用自定义 `src/pages/sitemap.xml.js`
- Frontmatter 错误：`date` 必须为字符串，比如 `"2026-01-15"`
- 禁止收录：`PUBLIC_ALLOW_INDEX=0` → robots `Disallow` + meta `noindex`
- 关闭遥测：`npx astro telemetry disable`
- 分析被 CSP 拦截：按上文设置环境变量；如自托管，请同步调整 CSP 白名单
- `www`→根域重定向：Vercel 用 `vercel.json`；Pages 用 Bulk Redirects
- 图片不显示：资源必须在 `public/` 下，路径以 `/` 开头
- 修改 canonical 域名：`astro.config.mjs` 的 `site`

### 发布检查清单
- 内容：
  - 首页/Links/Projects/Resume/Now 数据已更新
  - 博文 Frontmatter 通过校验（`date` 为字符串；标签正确）
  - 草稿使用 `draft: true`
- SEO/抓取：
  - 生产环境 `PUBLIC_ALLOW_INDEX=1`
  - `sitemap.xml`、`/rss.xml`、`/en/rss.xml` 可访问且结构正确
  - `hreflang` 互指；标题与描述合理
- 资产/性能：
  - 图片自托管并压缩（webp/avif），无外链字体依赖
  - Lighthouse 性能/可访问性/SEO ≥ 95
- 安全/合规：
  - HTTPS、HSTS、CSP、Referrer-Policy、X-Content-Type-Options 生效
  - ICP/公网安备（如适用）已在页脚显示
- 域名与重定向：
  - `www.gfish.online` 301 到 `gfish.online`
  - IPv6 与 HTTP/3 已开启（如平台支持）

---

## English

A bilingual, static‑first personal site built with Astro: links hub, blog, resume, Now page, projects, and social profiles. Includes RSS, Sitemap, SEO meta, filing badges (for China), and deploy presets.

- Bilingual routes: `/` (Chinese), `/en` (English)
- Content collections: MDX + zod frontmatter
- Data‑driven: `links.json`, `projects.json`, `resume.json`, `now.json`
- SEO: Open Graph, Twitter; optional JSON‑LD
- Feeds: `/rss.xml`, `/en/rss.xml`, `/sitemap.xml`, `/robots.txt`

### Stack
- Astro + MDX + Tailwind
- Content Collections (`astro:content` + `zod`)

### Get Started
- Node.js 18+ (20+ recommended)
- Install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

Telemetry
- Disable once: `npx astro telemetry disable`
- Per‑run: `ASTRO_TELEMETRY_DISABLED=1 npm run build`

### Environment
- `PUBLIC_ALLOW_INDEX`: search indexing control
  - Staging: `0`/unset → `noindex`, robots `Disallow`
  - Production: `1` → allow, robots with Sitemap
- Optional Analytics:
  - Plausible: `PUBLIC_ANALYTICS_PROVIDER=plausible`, `PUBLIC_PLAUSIBLE_DOMAIN=gfish.online`
  - Umami: `PUBLIC_ANALYTICS_PROVIDER=umami`, `PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js`, `PUBLIC_UMAMI_WEBSITE_ID=<site-id>`

### Content
- Chinese: `src/content/blog/<slug>.mdx`
- English: `src/content/blog/<slug>.en.mdx`
- One‑command bilingual post:
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
- Images: `public/images/blog/<slug>/...` (absolute paths)

Update data
- Copy: `src/data/site.json`
- Social: `src/data/links.json`
- Projects: `src/data/projects.json`
- Resume: `src/data/resume.json`
- Now: `src/data/now.json`
- QR images: `public/images/wechat-qr.jpg`, `public/images/wechat-personal.png`

### Deploy
- Vercel: `vercel.json` handles `www` → apex and security headers
- Cloudflare Pages: `_headers` for headers; Bulk Redirects for `www` → apex

### Notes
- Canonical: `https://gfish.online` (in `astro.config.mjs`)
- China: show ICP/PSB via `src/data/site.json`

### FAQ
- `@astrojs/sitemap` build error → this repo ships a custom `src/pages/sitemap.xml.js`
- Frontmatter errors: `date` must be a string like `"2026-01-15"`
- Disable indexing on staging: `PUBLIC_ALLOW_INDEX=0` (robots `Disallow` + meta `noindex`)
- Disable telemetry: `npx astro telemetry disable`
- Analytics blocked by CSP: set env vars; update CSP when self‑hosting
- `www` → apex: Vercel via `vercel.json`; Pages via Bulk Redirects
- Images not showing: ensure under `public/` and use absolute paths
- Change canonical: update `site` in `astro.config.mjs`

### Release Checklist
- Content:
  - Homepage/Links/Projects/Resume/Now updated
  - Frontmatter valid (`date` as string; tags correct)
  - Drafts use `draft: true`
- SEO/Crawl:
  - `PUBLIC_ALLOW_INDEX=1` in production
  - `sitemap.xml`, `/rss.xml`, `/en/rss.xml` reachable and valid
  - `hreflang` alternates; titles/descriptions meaningful
- Assets/Performance:
  - Self‑hosted compressed images (webp/avif), no external font deps
  - Lighthouse performance/accessibility/SEO ≥ 95
- Security/Compliance:
  - HTTPS, HSTS, CSP, Referrer‑Policy, X‑Content‑Type‑Options
  - ICP/PSB (if applicable) visible in footer
- Domains/Redirects:
  - `www.gfish.online` 301 → `gfish.online`
  - IPv6 & HTTP/3 enabled where supported

---

如需脚本一键创建新文章、接入分析（Plausible/Umami）或 JSON‑LD，欢迎提 Issue 或继续协作。

