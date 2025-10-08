import { NextRequest } from 'next/server';
import { getBlogPosts } from '@/app/[locale]/blog/actions/getBlogPosts';

export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ locale: 'en' | 'ar' }> }
) {
  const { locale } = await params;
  const baseUrl = 'https://www.dreamto.app';

  const { posts } = await getBlogPosts(locale, { page: 1, limit: 50 });

  const feedItems = posts
    .map((p) => {
      const url = `${baseUrl}/${locale}/blog/${encodeURIComponent(p.slug)}`;
      const title = escapeXml(p.title);
      const description = escapeXml(p.excerpt);
      const pubDate = p.publishedAt ? new Date(p.publishedAt).toUTCString() : new Date().toUTCString();
      return `\n    <item>\n      <title>${title}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description><![CDATA[${description}]]></description>\n    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>DreamToApp Blog (${locale})</title>\n    <link>${baseUrl}/${locale}/blog</link>\n    <description>Latest posts from DreamToApp</description>\n    <language>${locale === 'ar' ? 'ar-sa' : 'en-us'}</language>${feedItems}\n  </channel>\n</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}


