# gfish-home — 个人主页与博客 (Astro)

中文 | English: [README.md](README.md)

---

## 简介

使用 Astro 构建的“纯静态优先”双语个人站点：主页矩阵、博客、简历、Now、项目与社媒链接，支持 RSS、Sitemap、SEO 元信息、可选分析、备案展示与海内外部署。

- 双语路由：`/`（中文）、`/en`（英文）
- 内容集合：MDX + zod 校验 Frontmatter
- 数据驱动：`links.json`、`projects.json`、`resume.json`、`now.json`
- SEO：Open Graph、Twitter；可扩展 JSON‑LD
- 订阅与抓取：`/rss.xml`、`/en/rss.xml`、`/sitemap.xml`、`/robots.txt`

## 技术栈
- Astro + MDX + Tailwind
- Content Collections（`astro:content` + `zod`）

## 目录结构
- `src/pages` 路由（中/英）
- `src/layouts` `BaseLayout.astro`、`BlogLayout.astro`
- `src/components` `Nav`、`Footer`、`LangSwitch`、`SocialLinks`、`ProjectCard`、`PostList`、`QRCodes`
- `src/content/blog` 博客 MDX（中/英一对）
- `src/content/config.ts` 集合 Schema
- `src/data` `site.json`、`links.json`、`projects.json`、`resume.json`、`now.json`
- `public` 静态资源（`images/`、`fonts/`、`_headers`、`_redirects`）
- `docs/prompt.md` 提示词合集

## 本地开发
- Node.js 18+（推荐 20+）
- 安装：`npm i`
- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview`

遥测（可选）
- 关闭：`npx astro telemetry disable`
- 临时：`$env:ASTRO_TELEMETRY_DISABLED=1; npm run build`

## 环境变量
- `PUBLIC_ALLOW_INDEX` 索引开关
  - 备案/预览：`0`/未设 → 全站 `noindex`，robots `Disallow`
  - 正式：`1` → 允许抓取，robots 含 Sitemap
- 可选分析（不启用则不注入）
  - Plausible：`PUBLIC_ANALYTICS_PROVIDER=plausible`，`PUBLIC_PLAUSIBLE_DOMAIN=gfish.online`
  - Umami：`PUBLIC_ANALYTICS_PROVIDER=umami`，`PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js`，`PUBLIC_UMAMI_WEBSITE_ID=<站点ID>`
- 参考 `.env.example`

## 内容维护
- 中文文章：`src/content/blog/<slug>.mdx`
- 英文文章：`src/content/blog/<slug>.en.mdx`
- 一键新建中英：
  - 命令：`npm run new:post -- <slug> "中文标题" "English Title" [--date YYYY-MM-DD] [--draft]`
  - 示例：`npm run new:post -- astro-i18n-guide "Astro 双语与内容模型最佳实践" "Best Practices for Astro i18n & Content" --date 2026-01-15`
- Frontmatter 示例：
  ---
  title: Astro 双语与内容模型最佳实践
  description: 使用 Content Collections 管理中英文博客与 SEO。
  date: "2026-01-15"
  lang: zh
  tags: ["astro","i18n","content"]
  image: "/images/blog/astro-i18n-guide/cover.webp"
  canonical: "https://gfish.online/blog/astro-i18n-guide"
  ---
- 单语也可；`draft: true` 不出现在列表/RSS/Sitemap
- 图片：放 `public/images/blog/<slug>/...`，用绝对路径引用

更新数据
- 文案：`src/data/site.json`
- 社媒：`src/data/links.json`
- 项目：`src/data/projects.json`
- 简历：`src/data/resume.json`
- Now：`src/data/now.json`
- 二维码：`public/images/wechat-qr.jpg`、`public/images/wechat-personal.png`

## 部署
- Vercel：`vercel.json` 配置 `www`→根域重定向与安全头
- Cloudflare Pages：`public/_headers` 设安全头；控制台 Bulk Redirects 做 `www`→根域

## 备注
- Canonical：`https://gfish.online`（见 `astro.config.mjs`）
- 中国区：在 `src/data/site.json` 填写 ICP/公网安备显示于页脚

## 常见问题（FAQ）
- `@astrojs/sitemap` 报错 → 已使用自定义 `src/pages/sitemap.xml.js`
- Frontmatter `date` 必须为字符串，如 `"2026-01-15"`
- 预览禁收录：`PUBLIC_ALLOW_INDEX=0`（robots `Disallow` + meta `noindex`）
- 关闭遥测：`npx astro telemetry disable`
- 分析与 CSP：按上文设置环境变量；自托管需调整 CSP 白名单
- `www`→根域：Vercel 用 `vercel.json`；Pages 用 Bulk Redirects
- 图片不显示：必须位于 `public/` 下并用绝对路径引用
- 修改 canonical：更新 `astro.config.mjs` 的 `site`

## 发布检查清单
- 内容：主页/Links/Projects/Resume/Now 更新；Frontmatter 校验通过；草稿用 `draft: true`
- SEO/抓取：`PUBLIC_ALLOW_INDEX=1`；`sitemap.xml`、`/rss.xml`、`/en/rss.xml` 有效；`hreflang` 互指
- 资产/性能：自托管图片（webp/avif）；无外链字体；Lighthouse ≥ 95
- 安全/合规：HTTPS、HSTS、CSP、Referrer‑Policy、X‑Content‑Type‑Options；备案号显示
- 域名/重定向：`www.gfish.online` 301 → `gfish.online`；启用 IPv6/HTTP3（如支持）

---

如需脚本一键创建新文章、接入分析（Plausible/Umami）或 JSON‑LD，欢迎提 Issue 或继续协作。
