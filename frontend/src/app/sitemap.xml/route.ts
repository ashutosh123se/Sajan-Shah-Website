import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const currentDate = new Date().toISOString();

  const pages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/programs', changefreq: 'weekly', priority: '0.9' },
    { url: '/products', changefreq: 'daily', priority: '0.8' },
    { url: '/events', changefreq: 'weekly', priority: '0.9' },
    { url: '/members', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.6' },
    { url: '/contributions', changefreq: 'monthly', priority: '0.6' },
    { url: '/blog', changefreq: 'daily', priority: '0.8' },
    { url: '/resources', changefreq: 'weekly', priority: '0.7' },
    { url: '/login', changefreq: 'monthly', priority: '0.4' },
    { url: '/register', changefreq: 'monthly', priority: '0.4' },
    { url: '/member/dashboard', changefreq: 'weekly', priority: '0.6' },
    { url: '/admin', changefreq: 'weekly', priority: '0.5' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
