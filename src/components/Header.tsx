'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, BookOpen, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const { cart, favorites } = useStore();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const favCount = favorites.length;

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100/50 shadow-sm">
            <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Optombazar"
                            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex flex-col">
                            <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">Optombazar</span>
                            <span className="text-[9px] uppercase tracking-widest text-indigo-600 font-bold hidden sm:block">Ulgurji Platforma</span>
                        </div>
                    </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1.5 md:gap-3">
                    {/* Blog Link (Desktop) */}
                    <Link
                        href="/blog"
                        className="hidden md:flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-all text-sm"
                    >
                        <BookOpen size={16} />
                        {t('blog')}
                    </Link>

                    {/* Language Switcher */}
                    <button
                        onClick={() => setLanguage(language === 'uz' ? 'ru' : 'uz')}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all border border-transparent hover:border-slate-200"
                        title={language === 'uz' ? 'Русский' : "O'zbekcha"}
                    >
                        <img
                            src={`https://flagcdn.com/w40/${language === 'uz' ? 'uz' : 'ru'}.png`}
                            alt={language.toUpperCase()}
                            className="w-4 h-4 object-cover rounded-full"
                        />
                        <span className="text-xs font-bold text-slate-700 uppercase">{language}</span>
                    </button>

                    {/* Icons */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/favorites"
                            className="relative p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all"
                        >
                            <Heart size={20} className={favCount > 0 ? "fill-red-500 text-red-500" : ""} />
                            {favCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {favCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/cart"
                            className="relative p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/profile"
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-all hidden md:block"
                        >
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
