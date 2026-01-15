# Astro 双语个人主页（中文/英文）静态站 – 提示词合集（简体中文）

本文件收录了一组高质量提示词，帮助你用 Astro 搭建“纯静态优先”的个人主页与博客，覆盖：双语路由、内容模型、SEO、RSS、Sitemap、主题样式、社媒矩阵、项目入口、简历与 Now 页、部署与加速等。将这些提示词粘贴给大模型即可分步产出代码与配置。

— 使用建议：按章节逐步执行，先“初始化与结构”，再“页面与内容”，最后“SEO/部署”。


## 1) 全局系统提示词（先贴给模型）
你是资深前端与网站架构工程师，精通 Astro、i18n、SEO、无服务器与静态部署。请严格遵循以下约束：
- 站点类型：纯静态内容站（主页/博客/简历/Now/项目与社媒入口），产品均为外链跳转。
- 技术栈：Astro + MDX + Tailwind（可选）+ Content Collections；无需客户端框架运行时。
- 国际化：仅中文简体（zh-CN）与英文（en）。采用目录路由镜像（`/` 与 `/en`）。
- 性能与 SEO：预渲染、最小 JS、结构化数据（JSON-LD）、Open Graph、`hreflang`、`alternate`、RSS、Sitemap。
- 可达性与合规：a11y 语义、合理对比度、键盘可用；不默认注入第三方跟踪；若使用分析，优先无 Cookie（Plausible/Umami）。
- 可部署性：优先 Cloudflare Pages 或 Vercel；支持国内静态镜像/自托管字体。
- 输出风格：
  - 代码与配置给出完整文件内容或明确补丁。
  - 目录结构清晰；使用占位符变量，便于后续替换。
  - 中文注释关键点；避免冗长解释，聚焦可执行结果。

变量占位符（统一使用）：
- {{site_name_zh}}, {{site_name_en}}, {{site_tagline_zh}}, {{site_tagline_en}}
- {{author_name}}, {{author_email}}, {{timezone}}, {{default_locale}}=zh-CN, {{alt_locale}}=en
- 社媒：{{link_github}}, {{link_twitter}}, {{link_csdn}}, {{link_juejin}}, {{link_zhihu}}, {{link_wechat_qr}}, {{link_linkedin}}, {{link_rss}}
- 域名与部署：{{primary_domain}}, {{cdn_domain_optional}}


## 2) 目标与范围提示词
请根据以下目标产出方案与任务拆解清单，并列出每一步的输入/输出与验收标准：
- 目标：用 Astro 搭建双语纯静态个人主页与博客：`/`, `/en`, `/blog`, `/en/blog`, `/resume`, `/en/resume`, `/now`, `/en/now`, `/projects`, `/en/projects`, `/links`, `/en/links`。
- 要求：
  - 使用 Content Collections 管理博客（MDX，含 Frontmatter 校验）。
  - 首页展示头像、Slogan、社媒矩阵与项目入口；数据来自 `src/data/links.json` 与 `src/data/projects.json`。
  - 生成 `sitemap.xml`、`rss.xml`、`robots.txt`；输出 `hreflang` 与 `alternate`。
  - 自托管字体、图片 `WebP/AVIF`、懒加载；添加基本安全头（文档或部署层配置）。
  - 简历数据 `src/data/resume.json` 渲染页面与“导出 PDF”按钮（可指向打印样式）。
  - Now 页 `src/data/now.json`；内容双语各一。


## 3) 初始化与目录结构提示词
请生成 Astro 项目基础结构与必要依赖安装指令，并给出完整目录树与占位文件：
- 依赖：`astro`, `@astrojs/mdx`, `@astrojs/tailwind`（若启用）, `@astrojs/rss`, `@astrojs/sitemap`, `zod`。
- 目录结构（示例）：
  - `src/pages`：`index.astro`, `en/index.astro`, `blog/[slug].astro`, `en/blog/[slug].astro`, `resume.astro`, `en/resume.astro`, `now.astro`, `en/now.astro`, `projects.astro`, `en/projects.astro`, `links.astro`, `en/links.astro`, `rss.xml.js`, `robots.txt`, `sitemap.xml.js`（或插件自动）。
  - `src/layouts`：`BaseLayout.astro`, `BlogLayout.astro`。
  - `src/components`：`Nav.astro`, `Footer.astro`, `LangSwitch.astro`, `SocialLinks.astro`, `ProjectCard.astro`, `PostList.astro`。
  - `src/content/blog`：示例 `hello-world.mdx` 与 `hello-world.en.mdx`。
  - `src/content/config.ts`：博客 schema。
  - `src/data`：`links.json`, `projects.json`, `resume.json`, `now.json`, `site.json`。
  - `public`：`images/`、`fonts/`（自托管字体）。
- 输出：
  - `astro.config.mjs` 启用 MDX、Tailwind（可选）、Sitemap；设置 `site: https://{{primary_domain}}`。
  - `package.json` 启动/构建脚本。
  - `.gitignore`；可选 `tsconfig.json`。


## 4) i18n 路由与文案提示词
请实现目录路由镜像 i18n：
- 规则：
  - 中文为默认：`/`；英文镜像：`/en`。
  - 导航、页脚、SEO 文案、按钮文字通过 `src/data/site.json` 中 `zh`/`en` 键管理。
  - `LangSwitch.astro` 输出 `link rel="alternate" hreflang="zh-CN|en"`，并在页面可视处提供语言切换链接。
- 交付：
  - `src/data/site.json` 样例与读取逻辑。
  - 在 `BaseLayout.astro` 中注入 `html lang`、`og:locale`、`alternate`。


## 5) 内容模型（Blog/Links/Projects/Resume/Now）提示词
请给出以下数据文件与 schema，并提供 1-2 条真实占位样例：
- 博客（Content Collections，`src/content/config.ts` 使用 zod）：
  - Frontmatter：`title`(string), `description`(string), `date`(ISO string), `lang`(enum: `zh`|`en`), `tags`(string[])，`image`(可选)，`canonical`(可选)，`draft`(boolean, 默认 false)。
  - 约定：同一篇文章中英两份：`slug.mdx` 与 `slug.en.mdx`；各自 `lang` 标注。
- 社媒矩阵 `src/data/links.json`：
  - 字段：`id`, `label_zh`, `label_en`, `icon`, `url`。
- 项目列表 `src/data/projects.json`：
  - 字段：`id`, `name_zh`, `name_en`, `desc_zh`, `desc_en`, `url`, `badge`(可选), `highlight`(bool)。
- 简历 `src/data/resume.json`：
  - 顶层：`basics`（姓名/邮箱/位置/社媒）、`summary_{zh,en}`、`skills`、`experience`、`education`、`projects`（与入口可复用）。
- Now 页 `src/data/now.json`：
  - 字段：`updatedAt`, `content_zh`(markdown 可嵌入), `content_en`。


## 6) 页面与组件提示词
请生成以下页面与组件代码（Astro 组件），并满足：
- 布局：`BaseLayout.astro`（注入 SEO、OG、结构化数据容器）、`BlogLayout.astro`（文章页标题/日期/标签）。
- 首页：头像、Slogan、社媒矩阵（`SocialLinks` 读取 `links.json`）、项目入口（`ProjectCard` 读取 `projects.json`，支持 `highlight`）、最近文章（读取博客集合，按 `date` 降序、按 `lang` 过滤）。
- 博客列表与详情：列表分页（可选），详情支持 MDX、目录（可选）。
- 简历页：从 `resume.json` 渲染；提供“打印为 PDF”按钮与 `@media print` 样式。
- Now 页：从 `now.json` 渲染；显示最近更新时间。
- Links/Projects 页：网格展示；可过滤/排序（仅静态）。
- 导航/页脚：提供语言切换与社媒入口；版权信息使用当前年份与 {{author_name}}。


## 7) SEO、Open Graph、JSON-LD、RSS、Sitemap 提示词
请实现：
- 全站 `<meta>`：`title`, `description`, `og:*`, `twitter:*`，文章页附带 `article:*`。
- `hreflang` 与 `alternate`：每个有双语的页面输出两条互指。
- 结构化数据：
  - 首页/作者：`Person`/`WebSite` JSON-LD；
  - 文章页：`BlogPosting` JSON-LD（`headline`, `datePublished`, `dateModified`, `inLanguage`, `author`）。
- `@astrojs/rss` 生成 `rss.xml`，源为最新中文和英文文章（各自频道或合并频道，注明 `language`）。
- `@astrojs/sitemap` 生成 `sitemap.xml`，并为中英镜像正确设置 `xhtml:link rel="alternate"`。
- `robots.txt`：允许抓取、指向 `sitemap.xml`。


## 8) 资产优化与样式提示词
请：
- 启用 Tailwind（可选），配置基本色板与暗色模式（`class` 策略）。
- 图片：使用 `Astro <Image />`（或 `@astrojs/image`），生成 `webp/avif`，懒加载与尺寸约束。
- 自托管字体：`public/fonts`，`@font-face` 声明与回退字体；避免外链字体。
- 安全头建议：CSP（脚本/样式/图片/连接来源最小化）、`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`（在部署平台配置）。


## 9) 部署与海内外访问提示词
请输出部署方案与脚本：
- 构建命令：`astro build`；产物 `dist/`。
- 托管：
  - Cloudflare Pages：项目绑定、构建设置（Node 版本/包管理器）、自定义域名、HTTPS、HTTP/3。
  - Vercel：导入仓库、一键部署、自定义域名，地区为全球边缘；静态导出直接托管。
- 国内可达建议：
  - 静态资源同步/镜像到国内 CDN（如对象存储开启 CDN）；
  - 字体/图标/脚本全部自托管；
  - DNS 启用 IPv6；www 与裸域 301 统一。


## 10) 验收清单提示词
请依据以下清单做自检，并输出通过/未通过项列表：
- 路由齐全：`/` 与 `/en`、各功能页中英镜像可达。
- 博客：MDX 渲染正常，Frontmatter 校验，按语言过滤，RSS 正常。
- SEO：`title/description` 合理；OG/Twitter 完整；`hreflang` 正确互指；JSON-LD 校验通过。
- Sitemap/Robots：存在且路径正确；搜索引擎可抓取。
- 首页：社媒矩阵/项目入口/最近文章正确加载自数据文件。
- 简历页：打印样式良好；信息来源于 `resume.json`。
- Now 页：更新时间正确显示；数据来源 `now.json`。
- 资产与性能：图片懒加载、格式优化；无阻塞外链资源；Lighthouse >= 95。
- 可访问性：语义标签、对比度、键盘焦点可见；ARIA 合理。


## 11) 分步示例提示词（直接可用）
A. 初始化项目
请创建 Astro 项目并配置：MDX、Tailwind（开启暗黑模式 class）、Sitemap；生成下述文件与示例内容：
- `astro.config.mjs`, `package.json` 脚本、`tsconfig.json`（可选）；
- `src/pages`/`src/layouts`/`src/components`/`src/data`/`src/content` 结构；
- `src/content/config.ts` 博客 schema；
- 示例文章 `hello-world.mdx` 与 `hello-world.en.mdx`；
- `src/data/site.json`、`links.json`、`projects.json`、`resume.json`、`now.json`；
- 自托管字体与图片占位；
- 输出完整代码与文件树。

B. 首页与组件
请实现 `BaseLayout.astro`、`Nav.astro`、`Footer.astro`、`LangSwitch.astro`、`SocialLinks.astro`、`ProjectCard.astro`、`PostList.astro`，并完成 `src/pages/index.astro` 与 `src/pages/en/index.astro`。读取数据文件并渲染，包含 SEO/OG/alternate 链接。

C. 博客与 RSS/Sitemap
请实现 `blog/[slug].astro` 与 `en/blog/[slug].astro` 的详情与列表页；生成 `rss.xml`（用 `@astrojs/rss`）与 `sitemap.xml`（用 `@astrojs/sitemap`）。提供代码与新增/修改文件列表。

D. 简历与 Now 页
请根据 `resume.json` 与 `now.json` 生成 `resume.astro`、`en/resume.astro`、`now.astro`、`en/now.astro`，含打印样式与时间格式本地化。

E. Links/Projects 页
请生成 `links.astro`、`en/links.astro`、`projects.astro`、`en/projects.astro`，展示来自 `links.json`、`projects.json` 的数据。

F. 部署与加速
请输出部署至 Cloudflare Pages 与 Vercel 的具体步骤与设置；给出 DNS/HTTPS/HTTP3 与国内镜像建议；列出需在平台上配置的安全头（文档形式）。


## 12) 数据文件样例（可直接使用）
- src/data/site.json
{
  "zh": {
    "siteName": "{{site_name_zh}}",
    "tagline": "{{site_tagline_zh}}",
    "nav": {"home": "首页", "blog": "博客", "projects": "项目", "links": "媒体矩阵", "resume": "简历", "now": "现在在做"},
    "footer": {"copyright": "© "+new Date().getFullYear()+" {{author_name}}"}
  },
  "en": {
    "siteName": "{{site_name_en}}",
    "tagline": "{{site_tagline_en}}",
    "nav": {"home": "Home", "blog": "Blog", "projects": "Projects", "links": "Links", "resume": "Resume", "now": "Now"},
    "footer": {"copyright": "© "+new Date().getFullYear()+" {{author_name}}"}
  }
}

- src/data/links.json
[
  {"id": "github", "label_zh": "GitHub", "label_en": "GitHub", "icon": "github", "url": "{{link_github}}"},
  {"id": "twitter", "label_zh": "X(推特)", "label_en": "X(Twitter)", "icon": "twitter", "url": "{{link_twitter}}"},
  {"id": "csdn", "label_zh": "CSDN", "label_en": "CSDN", "icon": "csdn", "url": "{{link_csdn}}"},
  {"id": "juejin", "label_zh": "掘金", "label_en": "Juejin", "icon": "juejin", "url": "{{link_juejin}}"},
  {"id": "zhihu", "label_zh": "知乎", "label_en": "Zhihu", "icon": "zhihu", "url": "{{link_zhihu}}"},
  {"id": "wechat", "label_zh": "公众号", "label_en": "WeChat", "icon": "wechat", "url": "{{link_wechat_qr}}"}
]

- src/data/projects.json
[
  {"id": "p1", "name_zh": "示例产品 A", "name_en": "Sample Product A", "desc_zh": "一个用于……的轻量工具", "desc_en": "A lightweight tool for ...", "url": "https://example.com/a", "highlight": true},
  {"id": "p2", "name_zh": "示例产品 B", "name_en": "Sample Product B", "desc_zh": "聚焦……的开源库", "desc_en": "An open-source library for ...", "url": "https://example.com/b", "badge": "OSS"}
]

- src/data/resume.json
{
  "basics": {"name": "{{author_name}}", "email": "{{author_email}}", "location": "", "website": "https://{{primary_domain}}", "profiles": [{"network": "GitHub", "url": "{{link_github}}"}]},
  "summary_zh": "……",
  "summary_en": "...",
  "skills": ["Astro", "TypeScript", "Node.js"],
  "experience": [{"company": "Acme", "position_zh": "前端工程师", "position_en": "Frontend Engineer", "start": "2022-01", "end": "2024-06", "summary_zh": "……", "summary_en": "..."}],
  "education": [{"school": "", "degree_zh": "", "degree_en": "", "start": "", "end": ""}],
  "projects": [{"name_zh": "示例产品 A", "name_en": "Sample Product A", "url": "https://example.com/a", "desc_zh": "……", "desc_en": "..."}]
}

- src/data/now.json
{"updatedAt": "2024-12-01", "content_zh": "我最近在……", "content_en": "I am currently ..."}

- src/content/config.ts（示意）
import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    lang: z.enum(['zh','en']),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    canonical: z.string().url().optional(),
    draft: z.boolean().default(false)
  })
});
export const collections = { blog };


## 13) 常见变体与扩展提示词
- 加站内搜索（静态索引）：
请基于构建期生成 JSON 索引（标题、摘要、标签、路径、语言），前端使用最小 JS（如 `tinysearch` 或自实现简单全文）并按语言过滤。输出所需构建脚本与组件。

- 文章目录与锚点：
请为博客详情生成 TOC（从 MDX 标题提取），在桌面端侧栏显示，移动端折叠；平滑滚动与可访问性支持。

- 图片与图标：
请提供基于 `astro:assets` 的处理示例；社媒图标建议使用 SVG Sprite，按 `icon` 字段映射。

- 分析与统计（可选）：
请展示接入 Plausible 与 Umami 的最小方案（不启用 Cookie Banner），并提供 noscript 回退。


—— 以上提示词可直接用于驱动代码生成与迭代。建议将本文件纳入仓库并随进度勾选“验收清单”。
