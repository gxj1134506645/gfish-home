# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**gfish-home** 是一个使用 Astro 构建的静态个人主页与博客项目，支持中英双语，部署于 `gfish.online`。

- **项目类型**: 静态站点生成 (SSG)
- **主要功能**: 个人主页、博客系统、项目展示、简历展示
- **部署平台**: Vercel
- **多语言支持**: 中文 (`/`) 和英文 (`/en`)
- **版本控制**: https://github.com/gxj1134506645/gfish-home.git

## 技术栈

### 核心框架
- **Astro 4.5.0**: 现代静态站点生成器
- **Vite**: 构建工具（通过 Astro 集成）
- **TypeScript**: 类型安全的 JavaScript 超集

### 样式与UI
- **Tailwind CSS 3.4.1**: 实用优先的 CSS 框架
- **PostCSS**: CSS 后处理器

### 内容管理
- **MDX**: Markdown + JSX，支持在 Markdown 中使用组件
- **Content Collections**: Astro 的内容集合管理
- **Zod 3.22.4**: 内容验证

### 开发工具
- **npm**: 包管理器
- **ESLint**: 代码检查（如配置）
- **Prettier**: 代码格式化

### 部署与运维
- **Vercel**: 部署平台
- **Git**: 版本控制

### 可选集成
- **Plausible** 或 **Umami**: 网站分析工具

## 项目结构

```
gfish-home/
├── src/                      # 源代码目录
│   ├── components/          # 可复用组件
│   │   ├── Analytics.astro        # 分析追踪组件
│   │   ├── Footer.astro           # 页脚组件
│   │   ├── LangSwitch.astro       # 语言切换组件
│   │   ├── Nav.astro             # 导航栏组件
│   │   ├── PostList.astro         # 博客列表组件
│   │   ├── ProjectCard.astro      # 项目卡片组件
│   │   ├── QRCodes.astro          # 二维码组件
│   │   └── SocialLinks.astro      # 社交链接组件
│   ├── content/             # 内容集合（博客文章）
│   │   ├── blog/                 # MDX 格式的博客文章
│   │   └── config.ts             # Content Collections 配置 + Zod 验证
│   ├── data/                 # JSON 数据配置
│   │   ├── links.json            # 社交链接数据
│   │   ├── now.json              # 正在进行的项目
│   │   ├── projects.json         # 项目展示数据
│   │   ├── resume.json           # 简历数据
│   │   └── site.json             # 站点基础信息
│   ├── layouts/              # 布局模板
│   │   ├── BaseLayout.astro      # 基础布局（包含 <head>、导航、页脚）
│   │   └── BlogLayout.astro      # 博客专用布局
│   ├── pages/                # 页面路由（基于文件的路由）
│   │   ├── index.astro           # 首页（中文）
│   │   ├── en/index.astro        # 首页（英文）
│   │   ├── blog/                 # 博客列表页
│   │   ├── blog/[slug].astro     # 博客详情页（动态路由）
│   │   ├── links/                # 友情链接页
│   │   ├── now/                  # Now 页面
│   │   ├── projects/             # 项目展示页
│   │   ├── resume/               # 简历页
│   │   ├── wechat/               # 微信二维码页
│   │   └── robots.txt.ts         # robots.txt 生成
│   ├── styles/               # 全局样式
│   └── env.d.ts              # TypeScript 环境声明
├── public/                    # 静态资源（直接复制到构建输出）
│   ├── images/                # 图片资源
│   ├── _headers              # Vercel 安全头配置
│   └── _redirects            # Vercel 重定向规则
├── scripts/                   # 工具脚本
│   └── new-post.mjs          # 创建新博客文章的脚本
├── dist/                      # 构建输出目录（生成后）
├── astro.config.mjs          # Astro 主配置文件
├── tailwind.config.cjs       # Tailwind CSS 配置
├── postcss.config.cjs        # PostCSS 配置
├── tsconfig.json             # TypeScript 配置
├── vercel.json               # Vercel 部署配置
├── package.json              # 项目依赖和脚本
└── .env.example              # 环境变量示例文件
```

## 开发环境

- **操作系统**: Windows 11
- **终端**: PowerShell
- **编码格式**: UTF-8 (无 BOM)
- **Node.js**: 推荐 LTS 版本
- **包管理器**: npm

## 开发规范

### 通用代码规范
- 所有代码必须包含合理的中文注释
- 代码格式化使用 `npm run format`（基于 Prettier）
- 遵循 TypeScript 类型安全原则，避免使用 `any`
- 组件命名使用 PascalCase，文件名与组件名保持一致

### Astro 组件规范
- **组件结构**: `.astro` 文件包含两部分（frontmatter + template）
  - **frontmatter** (--- 之间): TypeScript 代码，获取数据、定义变量
  - **template**: HTML 模板，类似 JSX 但可直接编写 HTML
- **Props 传递**: 使用 `Astro.props` 接收父组件传递的属性
- **局部作用域**: frontmatter 中的变量不会泄露到全局
- **静态优先**: 默认情况下组件在构建时渲染为静态 HTML

### 内容管理规范
- **博客文章**: 存放在 `src/content/blog/` 目录，使用 `.mdx` 格式
- **Frontmatter**: 每篇文章必须包含以下字段（在 `src/content/config.ts` 中定义）:
  ```yaml
  ---
  title: 文章标题
  description: 文章描述
  pubDate: 发布日期 (YYYY-MM-DD)
  heroImage: 封面图片 (可选)
  lang: zh-CN | en-US
  tags: ['标签1', '标签2'] (可选)
  ---
  ```
- **Zod 验证**: `src/content/config.ts` 中定义了内容的 schema，确保数据完整性

### 路由规范
- **文件系统路由**: `src/pages/` 目录下的文件自动生成路由
- **动态路由**: 使用 `[param].astro` 语法，如 `[slug].astro`
- **双语路由**:
  - 中文: `/` 和 `/path`
  - 英文: `/en` 和 `/en/path`
- **嵌套路由**: 支持文件夹嵌套，如 `/blog/post/index.astro` → `/blog/post`

### 样式规范
- **Tailwind CSS**: 优先使用 Tailwind 实用类
- **作用域样式**: 在 `.astro` 组件中使用 `<style>` 标签，默认为作用域样式（scoped）
- **全局样式**: 全局样式放在 `src/styles/` 目录，在布局中引入
- **响应式设计**: 使用 Tailwind 的响应式前缀（`sm:`, `md:`, `lg:` 等）

### SEO 规范
- **Meta 标签**: 在布局组件中配置完整的 meta 标签
- **Open Graph**: 支持 OG 标签用于社交分享
- **Sitemap**: 自动生成 `sitemap.xml`
- **Robots.txt**: 通过 `src/pages/robots.txt.ts` 动态生成
- **多语言 SEO**: 使用 `lang` 属性和 `hreflang` 标签

### 环境变量规范
- **命名规范**: Astro 公共变量必须以 `PUBLIC_` 开头
- **索引控制**: `PUBLIC_ALLOW_INDEX`
  - `0` 或未设置: 全站 `noindex`（备案/预览环境）
  - `1`: 允许搜索引擎抓取（正式环境）
- **分析工具**: `PUBLIC_ANALYTICS_PROVIDER` (plausible | umami)

### 性能优化规范
- **图片优化**: 使用 Astro 的 `<Image />` 组件自动优化图片
- **代码分割**: Astro 默认按路由分割代码
- **预加载**: 对关键资源使用 `<link rel="preload">`
- **静态生成**: 优先使用静态生成而非客户端渲染
- **零 JS 默认**: Astro 组件默认不发送 JS，仅交互组件需要

### 部署规范
- **构建前检查**: 确保环境变量正确配置
- **构建命令**: `npm run build`
- **输出目录**: `dist/` 目录为构建产物
- **Vercel 配置**: `vercel.json` 定义了安全头、重定向等规则

### Git 规范
- **分支管理**: 使用功能分支开发，主分支保护
- **提交信息**: 使用清晰的提交信息（中文）
- **忽略文件**: `.gitignore` 已配置好，无需修改

### 安全规范
- **CSP 头**: 通过 `public/_headers` 配置内容安全策略
- **HTTPS**: Vercel 自动提供 HTTPS
- **XSS 防护**: 默认转义输出，避免使用 `set:html` 除非必要
- **依赖更新**: 定期更新依赖，修复安全漏洞

### 开发原则
- **KISS (简单至上)**: 追求代码和设计的极致简洁
- **YAGNI (精益求精)**: 仅实现当前明确所需的功能
- **SOLID**: 单一职责、开放封闭、里氏替换、接口隔离、依赖倒置
- **DRY (杜绝重复)**: 消除代码或逻辑中的重复模式
- **静态优先**: 优先使用静态生成而非客户端渲染
- **组件复用**: 提取可复用组件到 `src/components/`

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:4321)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建 (本地测试构建产物)
npm run preview

# 代码格式化
npm run format

# 创建新博客文章 (使用自定义脚本)
node scripts/new-post.mjs
```

## 核心特性

### 1. 双语支持
- 中文路由: `/` 和 `/path`
- 英文路由: `/en` 和 `/en/path`
- 语言切换组件: `src/components/LangSwitch.astro`
- 翻译文件: 各页面分别维护中英文版本

### 2. 内容管理
- **Content Collections**: 类型安全的内容管理
- **Zod 验证**: 自动验证 frontmatter 字段
- **MDX 支持**: 在 Markdown 中使用 React/Vue/Astro 组件

### 3. 性能优化
- **零 JS 默认**: 静态 HTML，仅在需要时加载 JS
- **按需加载**: 交互组件使用 `client:*` 指令
- **图片优化**: 自动生成 WebP、响应式图片
- **资源预取**: 智能预加载下一页资源

### 4. SEO 优化
- 动态 sitemap.xml
- robots.txt
- Open Graph 和 Twitter Cards
- 结构化数据（Schema.org）

### 5. 部署配置
- **Vercel**: 自动部署、HTTPS、CDN
- **安全头**: CSP、HSTS、X-Frame-Options
- **重定向**: www → non-www

## MCP 服务使用

本项目优先使用以下 MCP 服务（按优先级排序）：

1. **Serena** (本地代码分析+编辑)
   - 代码检索、架构分析、符号查找、项目知识管理
   - 首次使用前需检查 `check_onboarding_performed`
   - 多项目切换使用 `activate_project`
   - 适用场景:
     - 查找组件定义和使用位置
     - 分析 Content Collections 配置
     - 搜索特定的字符串或模式
     - 重构组件和提取复用代码

2. **Context7** (官方文档查询)
   - 框架 API、配置文档、版本差异
   - 适用场景:
     - 查询 Astro API 文档
     - 查询 Tailwind CSS 类名用法
     - 查询 MDX 语法
     - 查询 TypeScript 类型定义

3. **Sequential Thinking** (复杂规划)
   - 多步骤任务分解、架构设计
   - 适用场景:
     - 规划新功能实现
     - 设计组件架构
     - 制定重构方案

4. **DuckDuckGo** (外部信息)
   - 最新信息、官方公告
   - 适用场景:
     - 查询 Astro 最新版本特性
     - 搜索 Astro 社区最佳实践
     - 查找 Tailwind CSS 高级用法

## 工具使用

- **禁止使用 `&&` 链接命令**，请分步执行
- **文件操作优先使用 MCP Serena 工具**而非 bash 命令
- **开发命令**: 使用 npm scripts，避免直接调用 node_modules
- **代码格式化**: 提交前运行 `npm run format`

## 工作流程

### 新建博客文章
1. 使用脚本: `node scripts/new-post.mjs`
2. 或手动创建:
   - 在 `src/content/blog/` 创建 `.mdx` 文件
   - 添加 frontmatter（参考 config.ts 中的 schema）
   - 编写文章内容（支持 MDX 语法）
3. 本地预览: `npm run dev`
4. 格式化: `npm run format`

### 新建页面
1. 在 `src/pages/` 或 `src/pages/en/` 创建 `.astro` 文件
2. 引入布局: `import BaseLayout from '@/layouts/BaseLayout.astro'`
3. 使用布局包裹内容
4. 添加对应英文版本（如需双语）

### 添加组件
1. 在 `src/components/` 创建 `.astro` 文件
2. 定义 Props 接口（如需接收属性）
3. 在页面或其他组件中引入使用

### 修改样式
1. 优先使用 Tailwind 类名
2. 全局样式放在 `src/styles/global.css`
3. 组件特定样式使用 scoped `<style>`

## 注意事项

- **不允许随便生成文档**，未经明确要求不能生成任何文档
- **公众号文章末尾**必须加上：欢迎关注公众号FishTech Notes，一块交流使用心得
- **环境变量**: 使用 `.env.example` 作为模板创建 `.env` 文件
- **构建产物**: `dist/` 目录由构建生成，不要手动修改
- **依赖更新**: 定期运行 `npm update` 保持依赖最新
- **性能监控**: 使用配置的分析工具监控网站性能
- **访问控制**: 通过 `PUBLIC_ALLOW_INDEX` 控制搜索引擎索引

## 故障排查

### 构建失败
- 检查 TypeScript 类型错误
- 验证 MDX frontmatter 是否符合 Zod schema
- 查看构建日志中的错误信息

### 样式问题
- 确认 Tailwind 配置正确
- 检查 PostCSS 配置
- 清除 `.astro/` 缓存目录

### 部署问题
- 检查 Vercel 环境变量配置
- 验证 `vercel.json` 配置
- 查看 Vercel 部署日志

## 相关资源

- **Astro 官方文档**: https://docs.astro.build
- **Tailwind CSS 文档**: https://tailwindcss.com/docs
- **Vercel 文档**: https://vercel.com/docs
- **项目仓库**: https://github.com/gxj1134506645/gfish-home
