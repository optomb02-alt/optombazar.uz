'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/contexts/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

interface ProductDetailClientProps {
    product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { language, t } = useLanguage();
    const { addToCart, favorites, toggleFavorite, getCategoryById } = useStore();
    const { showToast } = useToast();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const name = language === 'uz' ? product.name_uz : product.name_ru;
    const description = language === 'uz' ? product.description_uz : product.description_ru;
    const isFavorite = favorites.includes(product.id);
    const category = getCategoryById(product.category);
    const categoryName = category ? (language === 'uz' ? category.name_uz : category.name_ru) : '';

    // Format price consistently to avoid hydration mismatch
    const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const mainImage = product.images?.[currentImageIndex] || 'https://via.placeholder.com/600';

    const handleAddToCart = () => {
        addToCart(product);
        showToast(`${name} ${t('addToCart')}`, 'success');
    };

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: name,
                text: description?.slice(0, 100),
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast(t('linkCopied') || 'Havola nusxalandi', 'success');
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pb-20 md:pb-0">
                <div className="container mx-auto px-4 py-6 md:py-10">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>{t('back') || 'Orqaga'}</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                                <img
                                    src={mainImage}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />

                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {product.images.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${idx === currentImageIndex ? 'border-blue-600' : 'border-transparent'
                                                }`}
                                        >
                                            <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Category */}
                            <div className="text-sm text-blue-600 font-medium">{categoryName}</div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-800">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-lg text-gray-500">UZS</span>
                                <span className="text-sm text-gray-400 ml-2">/ {t('perPack')}</span>
                            </div>

                            {/* Stock info */}
                            <div className="flex items-center gap-4 text-sm">
                                <span className={`px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {product.stock > 0 ? `✓ ${t('inStock')}` : `✗ ${t('outOfStock')}`}
                                </span>
                                <span className="text-gray-500">
                                    {t('itemsInPack')}: {product.items_per_pack} {t('pieces')}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">{description}</p>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-95"
                                >
                                    <ShoppingCart size={20} />
                                    {t('addToCart')}
                                </button>

                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className={`p-4 rounded-xl border-2 transition-all ${isFavorite
                                        ? 'border-red-500 bg-red-50 text-red-500'
                                        : 'border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400'
                                        }`}
                                >
                                    <Heart size={24} className={isFavorite ? 'fill-current' : ''} />
                                </button>

                                <button
                                    onClick={handleShare}
                                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 text-gray-400 hover:text-blue-500 transition-all"
                                >
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
