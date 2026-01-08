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
        <Link href={productUrl} className="group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Favorite Button */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all ${isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                            }`}
                    >
                        <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                    </button>

                    {/* Stock Badge */}
                    {product.stock <= 0 && (
                        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {t('outOfStock')}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2 min-h-[40px] mb-2">
                        {name}
                    </h3>

                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-bold text-lg text-slate-800">
                                {product.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">UZS</span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
