import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({data}) => data.lang === 'zh' && !data.draft))
    .sort((a,b) => b.data.date.localeCompare(a.data.date));
  return rss({
    title: '博客 RSS',
    description: '中文文章订阅',
    site: context.site,
    items: posts.map((post) => ({
      link: `/blog/${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
    })),
    stylesheet: true,
  });
}

