#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function usage() {
  console.log(`用法: npm run new:post -- <slug> "中文标题" "English Title" [--date YYYY-MM-DD] [--draft]

示例:
  npm run new:post -- astro-i18n-guide "Astro 双语与内容模型最佳实践" "Best Practices for Astro i18n & Content" --date 2026-01-15
`);
}

const args = process.argv.slice(2);
if (args.length < 3) {
  usage();
  process.exit(1);
}

const slug = args[0].toLowerCase().trim().replace(/\s+/g, '-');
const titleZh = args[1];
const titleEn = args[2];
let date = new Date().toISOString().slice(0, 10);
let draft = false;

for (let i = 3; i < args.length; i++) {
  if (args[i] === '--date' && args[i + 1]) { date = args[i + 1]; i++; }
  else if (args[i] === '--draft') { draft = true; }
}

const dir = join('src', 'content', 'blog');
mkdirSync(dir, { recursive: true });

const zhPath = join(dir, `${slug}.mdx`);
const enPath = join(dir, `${slug}.en.mdx`);

if (existsSync(zhPath) || existsSync(enPath)) {
  console.error('文件已存在：', zhPath, enPath);
  process.exit(1);
}

const fm = (title, lang) => `---\ntitle: ${title}\ndescription: \ndate: "${date}"\nlang: ${lang}\ntags: []\ndraft: ${draft}\n---\n\n`;

writeFileSync(zhPath, fm(titleZh, 'zh') + '在这里开始你的中文正文…\n');
writeFileSync(enPath, fm(titleEn, 'en') + 'Start your English content here…\n');

console.log('已创建文章：');
console.log(' -', zhPath);
console.log(' -', enPath);

