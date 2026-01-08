'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const { cart, favorites } = useStore();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const favCount = favorites.length;

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">O</span>
                        </div>
                        <span className="font-bold text-lg text-gray-800 hidden sm:block">Optombazar</span>
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">

                    {/* Blog Link (Desktop) */}
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <BookOpen size={20} />
                        {t('blog')}
                    </Link>

                    {/* Compact Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
                        className="flex items-center gap-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                        title={language === 'uz' ? 'Русский' : "O'zbekcha"}
                    >
                        <img
                            src={`https://flagcdn.com/w40/${language === 'uz' ? 'uz' : 'ru'}.png`}
                            alt={language.toUpperCase()}
                            className="w-5 h-5 object-cover rounded-full"
                        />
                        <span className="text-xs font-semibold text-gray-600 uppercase">{language}</span>
                    </button>

                    {/* Profile Trigger (Desktop only) */}
                    <Link
                        href="/profile"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors hidden md:block"
                    >
                        <User size={24} />
                    </Link>

                    {/* Favorites Trigger (Desktop only) */}
                    <Link
                        href="/favorites"
                        className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors hidden md:block"
                    >
                        <Heart size={24} className={favCount > 0 ? "fill-red-100 text-red-500" : ""} />
                        {favCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {favCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart Trigger (Desktop only) */}
                    <Link
                        href="/cart"
                        className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 hidden md:block"
                    >
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
