import { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/db';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Maqola topilmadi - Optombazar.uz',
        };
    }

    const title = post.title_uz || post.title_ru || 'Maqola';
    const description = post.summary_uz || post.summary_ru || '';
    const image = post.image_url || '/icons/icon-512.png';

    return {
        title: `${title} - Optombazar.uz`,
        description: description.slice(0, 160),
        openGraph: {
            title: title,
            description: description,
            images: [{ url: image }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [image],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Maqola topilmadi</h1>
                <p className="text-slate-500 mt-2">Siz qidirayotgan maqola o'chirilgan yoki manzili o'zgargan bo'lishi mumkin.</p>
            </div>
        );
    }

    // Structured Data (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title_uz || post.title_ru,
        image: post.image_url,
        datePublished: post.created_at,
        author: {
            '@type': 'Organization',
            name: 'Optombazar.uz',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostClient post={post} />
        </>
    );
}
