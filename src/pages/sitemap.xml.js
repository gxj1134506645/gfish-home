import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const pages = [
    '/', '/en',
    '/blog', '/en/blog',
    '/resume', '/en/resume',
    '/now', '/en/now',
    '/projects', '/en/projects',
    '/links', '/en/links',
    '/rss.xml', '/en/rss.xml',
  ];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const postUrls = posts.map((p) => ({
    loc: (p.data.lang === 'en' ? '/en' : '') + `/blog/${p.slug}`,
    lastmod: p.data.date,
  }));

  const urls = [
    ...pages.map((p) => ({ loc: p })),
    ...postUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(({ loc, lastmod }) => `\n  <url>\n    <loc>${new URL(loc, site).toString()}</loc>` + (lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : '') + `\n  </url>`).join('') +
    `\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

