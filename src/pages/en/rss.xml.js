import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({data}) => data.lang === 'en' && !data.draft))
    .sort((a,b) => b.data.date.localeCompare(a.data.date));
  return rss({
    title: 'Blog RSS',
    description: 'English posts',
    site: new URL('/en', context.site).toString(),
    items: posts.map((post) => ({
      link: `/en/blog/${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
    })),
    stylesheet: true,
  });
}

