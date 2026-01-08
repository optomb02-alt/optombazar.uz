'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/contexts/ToastContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { language, t } = useLanguage();
    const { addToCart, favorites, toggleFavorite } = useStore();
    const { showToast } = useToast();

    const name = language === 'uz' ? product.name_uz : product.name_ru;
    const isFavorite = favorites.includes(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        showToast(`${name} ${t('addToCart')}`, 'success');
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product.id);
    };

    const productUrl = `/product/${product.slug || product.id}`;
    const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300';

    return (
        <Link href={productUrl} className="group h-full flex">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col w-full animate-fade-in">
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Actions Overlay */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300 delay-75">
                        <button
                            onClick={handleToggleFavorite}
                            className={`p-2.5 rounded-xl shadow-lg transition-all transform hover:scale-110 active:scale-90 ${isFavorite
                                ? 'bg-red-500 text-white'
                                : 'glass text-slate-700 hover:text-red-500'
                                }`}
                        >
                            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                        {product.stock <= 0 ? (
                            <span className="glass px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-red-600 border-red-100">
                                {t('outOfStock')}
                            </span>
                        ) : (
                            <span className="glass px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-emerald-600 border-emerald-100">
                                {t('inStock') || 'Mavjud'}
                            </span>
                        )}
                        {product.items_per_pack > 1 && (
                            <span className="glass px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-indigo-600 border-indigo-100">
                                {product.items_per_pack} {t('pieces') || 'dona'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="space-y-1">
                        <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors duration-200">
                            {name}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none mb-1">Narxi</span>
                            <div className="flex items-baseline gap-1">
                                <span className="font-black text-lg text-slate-900">
                                    {product.price.toLocaleString()}
                                </span>
                                <span className="text-[10px] font-black text-indigo-600 uppercase">UZS</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-100 transition-all transform hover:scale-105 active:scale-95 disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed group/btn"
                        >
                            <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
