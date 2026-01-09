'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    List,
    Users,
    BookOpen,
    LogOut,
    Lock,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import { useStore } from '@/contexts/StoreContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const { orders } = useStore();
    const router = useRouter();
    const pathname = usePathname();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Login Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check session storage on mount
        const auth = sessionStorage.getItem('optombazar_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be an API call
        if (username === 'Akramjon' && password === 'Hisobot201415') {
            setIsAuthenticated(true);
            sessionStorage.setItem('optombazar_admin_auth', 'true');
            showToast('Xush kelibsiz!', 'success');
        } else {
            showToast(t('loginError') || 'Xato ma\'lumotlar', 'error');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('optombazar_admin_auth');
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full glass p-10 rounded-[40px] border border-white shadow-2xl animate-fade-in">
                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white shadow-sm">
                        <Lock size={32} className="text-indigo-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 text-center mb-2">{t('adminPanel')}</h1>
                    <p className="text-center text-slate-400 text-sm mb-10 font-bold uppercase tracking-widest">{t('loginTitle') || 'Tizimga kirish'}</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('username')}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold"
                                placeholder="Akramjon"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t('password')}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all font-bold"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl shadow-indigo-200 active:scale-95"
                        >
                            {t('loginButton') || 'Kirish'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { id: 'inventory', icon: Package, label: t('inventory') || 'Ombor', href: '/admin/inventory' },
        { id: 'categories', icon: List, label: t('categories') || 'Kategoriyalar', href: '/admin/categories' },
        { id: 'orders', icon: ShoppingBag, label: t('orders') || 'Buyurtmalar', href: '/admin/orders', badge: orders?.filter(o => o.status === 'new').length },
        { id: 'customers', icon: Users, label: t('customers') || 'Mijozlar', href: '/admin/customers' },
        { id: 'blog', icon: BookOpen, label: t('blog') || 'Blog', href: '/admin/blog' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transition-transform duration-500 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center justify-between mb-12 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 font-black">O</div>
                            <span className="text-xl font-black tracking-tighter text-slate-900 italic">Admin<span className="text-indigo-600">.Panel</span></span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => router.push(item.href)}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isActive
                                        ? 'bg-slate-900 text-white shadow-2xl shadow-indigo-900/10'
                                        : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={18} />
                                        {item.label}
                                    </div>
                                    {item.badge ? (
                                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] ${isActive ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white'}`}>
                                            {item.badge}
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="pt-6 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 text-rose-500 hover:bg-rose-50 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                        >
                            <LogOut size={18} />
                            {t('logout') || 'Chiqish'}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className={`p-3 text-slate-400 hover:text-indigo-600 transition-all ${isSidebarOpen ? 'lg:hidden' : ''}`}>
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hidden sm:block">Optombazar {new Date().getFullYear()}</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all relative group">
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                        <div className="flex items-center gap-4 border-l border-slate-100 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-slate-900">Akramjon</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Administrator</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black shadow-sm">A</div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <div className="container mx-auto max-w-7xl animate-fade-in pb-12">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
