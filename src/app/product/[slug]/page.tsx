import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO - THIS IS THE KEY FOR SEO!
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Mahsulot topilmadi',
        };
    }

    const name = product.name_uz || product.name_ru || 'Mahsulot';
    const description = (product.description_uz || product.description_ru || '').slice(0, 160);
    const image = product.images?.[0] || '/icons/icon-512.png';

    return {
        title: name,
        description: description,
        openGraph: {
            title: name,
            description: description,
            images: [
                {
                    url: image,
                    width: 800,
                    height: 600,
                    alt: name,
                },
            ],
            type: 'website',
            siteName: 'Optombazar.uz',
        },
        twitter: {
            card: 'summary_large_image',
            title: name,
            description: description,
            images: [image],
        },
        alternates: {
            canonical: `/product/${slug}`,
        },
    };
}

// Generate static paths for popular products (optional, improves performance)
export async function generateStaticParams() {
    const products = await getProducts();
    return products.slice(0, 20).map((product: any) => ({
        slug: product.slug || product.id.toString(),
    }));
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Structured data for SEO (JSON-LD)
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name_uz,
        description: product.description_uz,
        image: product.images,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'UZS',
            availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
        },
        brand: {
            '@type': 'Brand',
            name: 'Optombazar',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <ProductDetailClient product={product} />
        </>
    );
}
