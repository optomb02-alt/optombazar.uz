'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';
import ProductCard from '@/components/ProductCard';
import {
    Search, ChevronRight, ChevronLeft, Tag, Percent,
    Flame, Clock, Star, ArrowRight, Gift, Truck, Shield,
    Headphones, Package, Sparkles, TrendingUp, Zap
} from 'lucide-react';

interface HomeClientProps {
    initialProducts: any[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
    const { products, setProducts, loading, categories } = useStore();
    const { t, language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentBanner, setCurrentBanner] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (initialProducts.length > 0 && products.length === 0) {
            setProducts(initialProducts);
        }
    }, [initialProducts, products.length, setProducts]);

    // Auto-rotate banners
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const displayProducts = products.length > 0 ? products : initialProducts;

    const filteredProducts = displayProducts.filter((p: Product) => {
        const name = language === 'uz' ? p.name_uz : p.name_ru;
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        return matchesSearch && matchesCategory;
    });


    // Banner data with images
    const banners = [
        {
            title: language === 'uz' ? '🔥 Katta Chegirmalar!' : '🔥 Большие Скидки!',
            subtitle: language === 'uz' ? 'Barcha mahsulotlarga 30% gacha chegirma' : 'Скидки до 30% на все товары',
            bg: 'from-orange-500 via-red-500 to-pink-500',
            cta: language === 'uz' ? 'Xarid qilish' : 'Купить сейчас',
            image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop'
        },
        {
            title: language === 'uz' ? '🚚 Bepul Yetkazib Berish' : '🚚 Бесплатная Доставка',
            subtitle: language === 'uz' ? '500,000 so\'mdan ortiq buyurtmalarga' : 'При заказе от 500,000 сум',
            bg: 'from-emerald-500 via-teal-500 to-cyan-500',
            cta: language === 'uz' ? 'Batafsil' : 'Подробнее',
            image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop'
        },
        {
            title: language === 'uz' ? '⭐ Yangi Mahsulotlar' : '⭐ Новые Поступления',
            subtitle: language === 'uz' ? 'Har hafta yangi tovarlar' : 'Новинки каждую неделю',
            bg: 'from-violet-500 via-purple-500 to-indigo-500',
            cta: language === 'uz' ? 'Ko\'rish' : 'Смотреть',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop'
        }
    ];


    const quickCategories = [
        { id: 'all', name: language === 'uz' ? 'Barchasi' : 'Все', icon: Package, color: 'bg-slate-100 text-slate-600' },
        { id: 'sale', name: language === 'uz' ? 'Aksiya' : 'Акция', icon: Percent, color: 'bg-red-100 text-red-600' },
        { id: 'new', name: language === 'uz' ? 'Yangi' : 'Новое', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
        { id: 'popular', name: language === 'uz' ? 'Ommabop' : 'Хит', icon: Flame, color: 'bg-orange-100 text-orange-600' },
    ];

    const features = [
        { icon: Truck, title: language === 'uz' ? 'Tez yetkazish' : 'Быстрая доставка', desc: language === 'uz' ? '1-3 kun' : '1-3 дня' },
        { icon: Shield, title: language === 'uz' ? 'Kafolat' : 'Гарантия', desc: language === 'uz' ? '100% sifat' : '100% качество' },
        { icon: Headphones, title: language === 'uz' ? '24/7 Yordam' : '24/7 Поддержка', desc: language === 'uz' ? 'Doim aloqada' : 'Всегда на связи' },
        { icon: Gift, title: language === 'uz' ? 'Bonuslar' : 'Бонусы', desc: language === 'uz' ? 'Har xaridda' : 'За каждую покупку' },
    ];

    const scrollCategories = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1 pb-20 md:pb-6">
                {/* Search Bar - Mobile Sticky */}
                <div className="sticky top-14 md:top-16 z-40 bg-white border-b border-slate-100 p-3 md:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={language === 'uz' ? 'Qidirish...' : 'Поиск...'}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Banner Carousel */}
                <section className="relative overflow-hidden">
                    <div className="relative h-44 md:h-64">
                        {banners.map((banner, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 bg-gradient-to-r ${banner.bg} transition-opacity duration-500 ${idx === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                                    {/* Text Content */}
                                    <div className="text-white max-w-sm z-10">
                                        <h2 className="text-2xl md:text-4xl font-black mb-2 drop-shadow-lg">{banner.title}</h2>
                                        <p className="text-white/90 text-sm md:text-base mb-4 drop-shadow">{banner.subtitle}</p>
                                        <button className="px-5 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105">
                                            {banner.cta}
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    {/* Floating Promotional Badges - Center */}
                                    <div className="hidden lg:flex flex-col items-center gap-3 z-10">
                                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-sm animate-bounce shadow-lg">
                                            💰 {language === 'uz' ? 'Eng arzon narx!' : 'Лучшие цены!'}
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg font-black text-xs shadow-lg transform -rotate-3">
                                                -30%
                                            </div>
                                            <div className="bg-white text-slate-900 px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg transform rotate-3">
                                                TOP
                                            </div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-semibold text-xs">
                                            ⚡ {language === 'uz' ? 'Tezkor yetkazish' : 'Быстрая доставка'}
                                        </div>
                                    </div>

                                    {/* Banner Image */}
                                    <div className="hidden md:block relative">
                                        <div className="relative w-64 h-44 lg:w-72 lg:h-48 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                            <img
                                                src={banner.image}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                        </div>
                                        {/* Decorative elements */}
                                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-full blur-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Banner Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentBanner(idx)}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentBanner ? 'bg-white w-6' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Banner Nav Arrows */}
                    <button
                        onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition hidden md:block"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition hidden md:block"
                    >
                        <ChevronRight size={20} />
                    </button>
                </section>

                {/* Features Strip */}
                <section className="bg-white border-b border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 py-4 px-3 md:px-6">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <feature.icon size={20} className="text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">{feature.title}</div>
                                        <div className="text-xs text-slate-500">{feature.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content with Sidebar */}
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-6">
                        {/* Left Sidebar - Categories */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl border border-slate-100 p-4 sticky top-20">
                                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                                    <Package size={18} className="text-indigo-600" />
                                    {language === 'uz' ? 'Katalog' : 'Каталог'}
                                </h3>

                                <div className="space-y-1">
                                    {/* All products */}
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${activeCategory === 'all'
                                            ? 'bg-indigo-600 text-white'
                                            : 'hover:bg-slate-50 text-slate-700'
                                            }`}
                                    >
                                        <span className="text-lg">📦</span>
                                        <span className="font-medium text-sm">{language === 'uz' ? 'Barcha mahsulotlar' : 'Все товары'}</span>
                                    </button>

                                    {/* Main categories with icons */}
                                    {categories.filter((cat: any) => !cat.parent_id).map((cat: any) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${activeCategory === cat.id
                                                ? 'bg-indigo-600 text-white'
                                                : 'hover:bg-slate-50 text-slate-700'
                                                }`}
                                        >
                                            <span className="text-lg">{cat.icon || '📁'}</span>
                                            <span className="font-medium text-sm truncate">
                                                {language === 'uz' ? cat.name_uz : cat.name_ru}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Promo Banner in Sidebar */}
                                <div className="mt-4 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                                    <div className="text-2xl mb-2">🎁</div>
                                    <div className="font-bold text-sm">{language === 'uz' ? 'Maxsus taklif!' : 'Спецпредложение!'}</div>
                                    <div className="text-white/80 text-xs mt-1">{language === 'uz' ? 'Birinchi buyurtmaga 5% chegirma' : '5% скидка на первый заказ'}</div>
                                </div>
                            </div>
                        </aside>

                        {/* Right Content - Products */}
                        <div className="flex-1 min-w-0">
                            {/* Quick Category Chips */}
                            <div className="relative mb-4 lg:hidden">
                                <button
                                    onClick={() => scrollCategories('left')}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white shadow-lg rounded-full text-slate-600 hidden md:block"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <div
                                    ref={scrollRef}
                                    className="flex gap-2 overflow-x-auto scrollbar-hide px-0 md:px-8 pb-2"
                                >
                                    {quickCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${activeCategory === cat.id
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : `${cat.color} hover:opacity-80`
                                                }`}
                                        >
                                            <cat.icon size={16} />
                                            {cat.name}
                                        </button>
                                    ))}

                                    {/* Real categories from store */}
                                    {categories.slice(0, 6).map((cat: any) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${activeCategory === cat.id
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                                                }`}
                                        >
                                            {language === 'uz' ? cat.name_uz : cat.name_ru}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => scrollCategories('right')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-white shadow-lg rounded-full text-slate-600 hidden md:block"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* Desktop Search */}
                            <div className="hidden md:flex items-center justify-between mb-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={language === 'uz' ? 'Mahsulotlarni qidirish...' : 'Поиск товаров...'}
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <span>{filteredProducts.length} {language === 'uz' ? 'ta mahsulot' : 'товаров'}</span>
                                </div>
                            </div>

                            {/* Products Section Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                                        <TrendingUp size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg md:text-xl font-black text-slate-900">
                                            {activeCategory === 'all'
                                                ? (language === 'uz' ? 'Barcha Mahsulotlar' : 'Все Товары')
                                                : activeCategory === 'sale'
                                                    ? (language === 'uz' ? 'Aksiya' : 'Акции')
                                                    : activeCategory === 'new'
                                                        ? (language === 'uz' ? 'Yangi Kelganlar' : 'Новинки')
                                                        : activeCategory === 'popular'
                                                            ? (language === 'uz' ? 'Ommabop' : 'Популярное')
                                                            : (language === 'uz' ? 'Mahsulotlar' : 'Товары')
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {loading && displayProducts.length === 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-2xl p-3 space-y-3 border border-slate-100">
                                            <div className="aspect-square bg-slate-100 rounded-xl shimmer" />
                                            <div className="h-4 bg-slate-100 rounded shimmer w-3/4" />
                                            <div className="h-5 bg-slate-100 rounded shimmer w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {filteredProducts.map((product: Product, index: number) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}

                            {!loading && filteredProducts.length === 0 && (
                                <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search size={24} className="text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                                        {language === 'uz' ? 'Mahsulotlar topilmadi' : 'Товары не найдены'}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4">
                                        {language === 'uz' ? 'Boshqa so\'z bilan qidiring' : 'Попробуйте другой запрос'}
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition"
                                    >
                                        {language === 'uz' ? 'Filtrni tozalash' : 'Сбросить фильтр'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
