'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Star, Zap, Eye } from 'lucide-react';
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

    // Format price consistently to avoid hydration mismatch
    const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    // Deterministic sale calculation based on product ID (fixes hydration error)
    const productIdNum = typeof product.id === 'string' ? parseInt(product.id, 10) || 0 : product.id;
    const isOnSale = productIdNum % 3 === 0;
    const salePercent = isOnSale ? 10 + (productIdNum % 20) : 0;
    const originalPrice = isOnSale ? Math.round(product.price * (1 + salePercent / 100)) : product.price;

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
        <Link href={productUrl} className="group block h-full">
            <div className="bg-white rounded-2xl h-full flex flex-col overflow-hidden border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Sale Badge */}
                    {isOnSale && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-[10px] font-black rounded-lg flex items-center gap-1">
                            <Zap size={10} />
                            -{salePercent}%
                        </div>
                    )}

                    {/* Pack Badge */}
                    {product.items_per_pack > 1 && (
                        <div className="absolute top-2 right-10 px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg">
                            {product.items_per_pack} {t('pieces')}
                        </div>
                    )}

                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`absolute top-2 right-2 p-1.5 rounded-lg transition-all ${isFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 backdrop-blur text-slate-400 hover:text-red-500'
                            }`}
                    >
                        <Heart size={14} className={isFavorite ? 'fill-current' : ''} />
                    </button>

                    {/* Quick View on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="p-2 bg-white rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                            <Eye size={18} className="text-slate-600" />
                        </div>
                    </div>

                    {/* Out of Stock Overlay */}
                    {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-full">
                                {t('outOfStock')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                            ))}
                        </div>
                        <span className="text-[10px] text-slate-400">(128)</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-medium text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors mb-auto min-h-[2.5rem]">
                        {name}
                    </h3>

                    {/* Price & Actions */}
                    <div className="mt-2 pt-2 border-t border-slate-100">
                        <div className="flex items-end justify-between">
                            <div>
                                {isOnSale && (
                                    <div className="text-xs text-slate-400 line-through">
                                        {formatPrice(originalPrice)} {language === 'uz' ? "so'm" : 'сум'}
                                    </div>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className={`font-black text-base ${isOnSale ? 'text-red-600' : 'text-slate-900'}`}>
                                        {formatPrice(product.price)}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{language === 'uz' ? "so'm" : 'сум'}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all active:scale-95 disabled:bg-slate-200 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
