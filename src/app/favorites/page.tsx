'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';
import ProductCard from '@/components/ProductCard';

export default function FavoritesPage() {
    const { products, favorites } = useStore();
    const { t, language } = useLanguage();
    const router = useRouter();

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
                        <div>
                            <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-4 group transition-colors">
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                {t('backToShop')}
                            </button>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                                {t('favorites')}
                                <span className="bg-rose-100 text-rose-500 text-sm font-black px-4 py-1 rounded-full uppercase tracking-widest">
                                    {favoriteProducts.length}
                                </span>
                            </h1>
                        </div>
                    </div>

                    {favoriteProducts.length === 0 ? (
                        <div className="text-center py-24 glass rounded-[40px] p-12 border border-slate-100 shadow-2xl shadow-rose-100/30 max-w-lg mx-auto animate-fade-in">
                            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Heart size={40} className="text-rose-300 fill-rose-100" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-4">{t('emptyFavorites')}</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed max-w-xs mx-auto">
                                {language === 'uz' ? 'Hali hech qanday mahsulotni yoqtirmadingiz. Ularni tanlang va shu yerda saqlang!' : 'Вы еще не добавили ни одного товара в избранное.'}
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-xl shadow-indigo-200 transform hover:scale-105 active:scale-95"
                            >
                                <ShoppingBag size={18} />
                                {t('backToShop')}
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                            {favoriteProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
