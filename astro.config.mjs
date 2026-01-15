import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// 更新为你的主域名，例如：https://gfish.dev
export default defineConfig({
  site: 'https://gfish.online',
  integrations: [mdx(), tailwind({})],
});
