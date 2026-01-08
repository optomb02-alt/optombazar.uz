'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ShoppingBag, User, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';

const MobileNavbar: React.FC = () => {
    const pathname = usePathname();
    const { t } = useLanguage();
    const { cart, favorites } = useStore();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const favCount = favorites.length;

    const navItems = [
        { path: '/', label: 'home', icon: Home, badge: 0 },
        { path: '/blog', label: 'blog', icon: BookOpen, badge: 0 },
        { path: '/favorites', label: 'favorites', icon: Heart, badge: favCount },
        { path: '/cart', label: 'cart', icon: ShoppingBag, badge: cartCount },
        { path: '/profile', label: 'profile', icon: User, badge: 0 },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 md:hidden z-50 shadow-lg shadow-gray-200/50">
            <div className="flex justify-around items-stretch h-14">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 ${isActive ? 'text-blue-600' : 'text-gray-400 active:text-gray-600'
                                }`}
                        >
                            <div className={`relative p-1 rounded-xl transition-all ${isActive ? 'bg-blue-50' : ''}`}>
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                    className={item.path === '/favorites' && favCount > 0 ? 'fill-red-100 text-red-500' : ''}
                                />
                                {item.badge > 0 && (
                                    <span className={`absolute -top-1 -right-1 text-white text-[8px] font-bold min-w-[14px] h-3.5 flex items-center justify-center rounded-full px-0.5 shadow-sm ${item.path === '/favorites' ? 'bg-red-500' : 'bg-blue-600'
                                        }`}>
                                        {item.badge > 99 ? '99+' : item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[9px] mt-0.5 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {t(item.label)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileNavbar;
