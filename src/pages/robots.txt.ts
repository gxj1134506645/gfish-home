export function GET() {
  const allow = import.meta.env.PUBLIC_ALLOW_INDEX === '1';
  const body = allow
    ? `User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
