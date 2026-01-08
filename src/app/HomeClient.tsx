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

import { Search, Sparkles, Truck, ShieldCheck, Zap } from 'lucide-react';

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

    const categories = [
        { id: 'all', name_uz: 'Barchasi', name_ru: 'Все' },
        { id: 'household', name_uz: 'Roʻzgʻor', name_ru: 'Хозтовары' },
        { id: 'cleaning', name_uz: 'Yuvish vositalari', name_ru: 'Моющие средства' },
        { id: 'disposable', name_uz: 'Bir martalik', name_ru: 'Одноразовые' },
        { id: 'hygiene', name_uz: 'Gigiyena', name_ru: 'Гигиена' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />

            <main className="flex-1 pb-20 md:pb-12">
                {/* Premium Hero Section */}
                <section className="relative overflow-hidden bg-slate-900 pt-16 pb-24 md:pt-24 md:pb-40">
                    {/* Abstract Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 blur-[120px] rounded-full" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 blur-[120px] rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-widest animate-fade-in">
                                <Sparkles size={14} />
                                {language === 'uz' ? 'Yangi Davr Ulgurji Savdosi' : 'Новая Эра Оптовой Торговли'}
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight animate-fade-in">
                                {language === 'uz' ? (
                                    <>
                                        O'zbekistonda <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Ulgurji Savdo</span> Endi Oson
                                    </>
                                ) : (
                                    <>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Оптовая Торговля</span> в Узбекистане Стала Проще
                                    </>
                                )}
                            </h1>

                            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in transition-all">
                                {language === 'uz'
                                    ? "Eng arzon narxlar, yuqori sifat va tezkor yetkazib berish xizmati. Biznesingiz uchun eng ma'qul tanlov."
                                    : 'Самые низкие цены, высокое качество и быстрая доставка. Лучший выбор для вашего бизнеса.'
                                }
                            </p>

                            {/* Hero Search Bar */}
                            <div className="max-w-2xl mx-auto relative group animate-fade-in delay-200">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder={language === 'uz' ? 'Mahsulotlarni qidirish...' : 'Поиск товаров...'}
                                    className="w-full pl-14 pr-6 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all text-lg shadow-2xl"
                                />
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 pt-8 animate-fade-in delay-300">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Truck size={20} className="text-indigo-400" />
                                    <span className="text-sm font-bold">{language === 'uz' ? 'Tezkor Yetkazib Berish' : 'Быстрая Доставка'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <ShieldCheck size={20} className="text-emerald-400" />
                                    <span className="text-sm font-bold">{language === 'uz' ? 'Sifat Kafolati' : 'Гарантия Качества'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Zap size={20} className="text-amber-400" />
                                    <span className="text-sm font-bold">{language === 'uz' ? 'Eng Arzon Narxlar' : 'Лучшие Цены'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="container mx-auto px-4 -mt-12 relative z-20">
                    {/* Category Navigation */}
                    <div className="glass rounded-3xl p-2 hidden md:flex items-center gap-2 shadow-2xl mb-12 border border-white/20">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all ${cat.id === 'all'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'text-slate-600 hover:bg-white/50 hover:text-indigo-600'
                                    }`}
                            >
                                {language === 'uz' ? cat.name_uz : cat.name_ru}
                            </button>
                        ))}
                    </div>

                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                {language === 'uz' ? 'Ommabop Mahsulotlar' : 'Популярные Товары'}
                            </h2>
                            <div className="h-1 w-20 bg-indigo-600 rounded-full mt-2" />
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading && displayProducts.length === 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 shadow-sm">
                                    <div className="aspect-[4/5] bg-slate-100 rounded-xl shimmer" />
                                    <div className="h-4 bg-slate-100 rounded shimmer w-3/4" />
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 bg-slate-100 rounded shimmer w-1/2" />
                                        <div className="h-10 w-10 bg-slate-100 rounded-xl shimmer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                            {displayProducts.map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {!loading && displayProducts.length === 0 && (
                        <div className="text-center py-24 glass rounded-3xl p-12 border border-dashed border-slate-300">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">
                                {language === 'uz' ? 'Mahsulotlar hozircha yo\'q' : 'Товары пока отсутствуют'}
                            </h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                {language === 'uz' ? 'Tez orada yangi mahsulotlar qo\'shiladi.' : 'Новые товары будут добавлены в ближайшее время.'}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
