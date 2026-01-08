'use client';

import React, { useEffect } from 'react';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';
import ProductCard from '@/components/ProductCard';

interface HomeClientProps {
    initialProducts: any[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
    const { products, setProducts, loading } = useStore();
    const { t, language } = useLanguage();

    // Set initial products from SSR
    useEffect(() => {
        if (initialProducts.length > 0 && products.length === 0) {
            setProducts(initialProducts);
        }
    }, [initialProducts, products.length, setProducts]);

    const displayProducts = products.length > 0 ? products : initialProducts;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-12 md:py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            {language === 'uz'
                                ? "O'zbekistonning Eng Yirik Ulgurji Platformasi"
                                : 'Крупнейшая Оптовая Платформа Узбекистана'
                            }
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            {language === 'uz'
                                ? "Eng arzon narxlarda sifatli mahsulotlar. Toshkent bo'ylab yetkazib berish."
                                : 'Качественные товары по самым низким ценам. Доставка по Ташкенту.'
                            }
                        </p>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {language === 'uz' ? 'Barcha Mahsulotlar' : 'Все Товары'}
                    </h2>

                    {loading && displayProducts.length === 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="bg-gray-200 animate-pulse rounded-xl aspect-square" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {displayProducts.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {!loading && displayProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            {language === 'uz' ? 'Mahsulotlar topilmadi' : 'Товары не найдены'}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
