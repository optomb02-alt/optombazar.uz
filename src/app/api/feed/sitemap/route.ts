import { NextResponse } from 'next/server';
import { getProducts, getBlogPosts } from '@/lib/db';

export async function GET() {
    const baseUrl = 'https://optombazar.uz';

    try {
        const products = await getProducts();
        const blogPosts = await getBlogPosts();

        // Static pages
        const staticPages = [
            { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
            { loc: `${baseUrl}/blog`, priority: '0.8', changefreq: 'daily' },
            { loc: `${baseUrl}/cart`, priority: '0.6', changefreq: 'weekly' },
        ];

        // Product pages
        const productPages = products.map((product: any) => ({
            loc: `${baseUrl}/product/${product.slug || product.id}`,
            lastmod: product.created_at ? new Date(product.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            priority: '0.9',
            changefreq: 'weekly',
        }));

        // Blog pages
        const blogPages = blogPosts.map((post: any) => ({
            loc: `${baseUrl}/blog/${post.slug || post.id}`,
            lastmod: post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            priority: '0.7',
            changefreq: 'monthly',
        }));

        const allPages = [...staticPages, ...productPages, ...blogPages];

        const generateUrl = (page: any) => {
            const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
            return `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        };

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(generateUrl).join('\n')}
</urlset>`;

        return new NextResponse(sitemap, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 });
    }
}
