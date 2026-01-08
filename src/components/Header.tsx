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
        <header className="sticky top-0 z-50 glass shadow-sm">
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-black text-xl">O</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">Optombazar</span>
                            <span className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold">Ulgurji Platforma</span>
                        </div>
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Blog Link (Desktop) */}
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold px-4 py-2 rounded-xl hover:bg-white/50 transition-all duration-200"
                    >
                        <BookOpen size={20} />
                        {t('blog')}
                    </Link>

                    {/* Compact Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-100/50 hover:bg-slate-200/50 rounded-xl transition-all duration-200 border border-slate-200/50"
                        title={language === 'uz' ? 'Русский' : "O'zbekcha"}
                    >
                        <img
                            src={`https://flagcdn.com/w40/${language === 'uz' ? 'uz' : 'ru'}.png`}
                            alt={language.toUpperCase()}
                            className="w-5 h-5 object-cover rounded-full shadow-sm"
                        />
                        <span className="text-xs font-black text-slate-700 uppercase">{language}</span>
                    </button>

                    {/* Stats Icons */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <Link
                            href="/favorites"
                            className="relative p-2.5 rounded-xl hover:bg-white/50 text-slate-600 hover:text-red-500 transition-all duration-200"
                        >
                            <Heart size={22} className={favCount > 0 ? "fill-red-500 text-red-500" : ""} />
                            {favCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-lg shadow-sm">
                                    {favCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/cart"
                            className="relative p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200"
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-lg shadow-lg shadow-indigo-200">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Profile Trigger (Desktop only) */}
                    <Link
                        href="/profile"
                        className="p-2.5 rounded-xl hover:bg-white/50 text-slate-600 hover:text-indigo-600 transition-all duration-200 hidden md:block"
                    >
                        <User size={22} />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
