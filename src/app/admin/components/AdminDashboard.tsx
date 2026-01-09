'use client';

import React, { useMemo } from 'react';
import {
    TrendingUp,
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    AlertTriangle,
    Calendar,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    LayoutDashboard
} from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminDashboard() {
    const { orders, allUsers, products, t, language } = useStore() as any; // Cast for simplicity in migration

    // Basic Stats
    const totalRevenue = orders?.reduce((acc: number, order: any) => acc + order.total_amount, 0) || 0;
    const totalOrders = orders?.length || 0;
    const totalUsers = allUsers?.length || 0;
    const totalProducts = products?.length || 0;

    // Today's Stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysOrders = useMemo(() =>
        orders?.filter((order: any) => new Date(order.created_at) >= today) || [],
        [orders]
    );
    const todaysRevenue = todaysOrders.reduce((acc: number, order: any) => acc + order.total_amount, 0);

    // This Week's Stats
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weeklyOrders = useMemo(() =>
        orders?.filter((order: any) => new Date(order.created_at) >= weekAgo) || [],
        [orders]
    );
    const weeklyRevenue = weeklyOrders.reduce((acc: number, order: any) => acc + order.total_amount, 0);

    // Order Status Distribution
    const orderStatusCounts = useMemo(() => {
        const counts = { new: 0, processing: 0, completed: 0, cancelled: 0 };
        orders?.forEach((order: any) => {
            if (counts[order.status as keyof typeof counts] !== undefined) {
                counts[order.status as keyof typeof counts]++;
            }
        });
        return counts;
    }, [orders]);

    // Low Stock Products (less than 20 items)
    const lowStockProducts = useMemo(() =>
        products?.filter((p: any) => p.stock < 20).sort((a: any, b: any) => a.stock - b.stock).slice(0, 5) || [],
        [products]
    );

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'processing': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getStatusLabel = (status: string) => {
        const map: Record<string, string> = {
            new: t('statusNew') || 'Yangi',
            processing: t('statusProcessing') || 'Jarayonda',
            completed: t('statusCompleted') || 'Bajarildi',
            cancelled: t('statusCancelled') || 'Bekor qilindi'
        };
        return map[status] || status;
    };

    const stats = [
        { label: 'Jami Tushum', value: `${totalRevenue.toLocaleString()} UZS`, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+12.5%', isUp: true },
        { label: 'Jami Buyurtmalar', value: totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+8.2%', isUp: true },
        { label: 'Mijozlar', value: totalUsers, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+5.4%', isUp: true },
        { label: 'Mahsulotlar', value: totalProducts, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-2.1%', isUp: false },
    ];

    return (
        <div className="space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Xush kelibsiz! 👋</h1>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Bugun: {new Date().toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm text-xs font-black text-slate-600 flex items-center gap-2">
                        <Calendar size={14} className="text-indigo-600" />
                        Oxirgi 30 kun
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                            <div className="mt-4 flex items-center gap-2">
                                <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {stat.trend}
                                </span>
                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">O'tgan o'ydan</span>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-20`} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Status Distribution & Period Stats */}
                <div className="lg:col-span-8 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-6">Bugungi Tushum</p>
                                <h3 className="text-4xl font-black tracking-tight">{todaysRevenue.toLocaleString()} <span className="text-xs text-indigo-400 uppercase tracking-widest">UZS</span></h3>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5">
                                        {todaysOrders.length} Buyurtma
                                    </div>
                                    {todaysRevenue > 0 && <span className="text-emerald-400 text-xs font-black">+100% (+Bugun!)</span>}
                                </div>
                            </div>
                            <BarChart3 className="absolute bottom-4 right-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-6">Haftalik Tushum</p>
                                <h3 className="text-4xl font-black tracking-tight">{weeklyRevenue.toLocaleString()} <span className="text-xs text-white/40 uppercase tracking-widest">UZS</span></h3>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5">
                                        {weeklyOrders.length} Buyurtma
                                    </div>
                                    <span className="text-indigo-200 text-xs font-black">7 kunlik</span>
                                </div>
                            </div>
                            <TrendingUp className="absolute bottom-4 right-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Recent Activities List */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><ShoppingBag size={18} /></div>
                                So'nggi Buyurtmalar
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:tracking-[0.2em] transition-all">Barchasini ko'rish</button>
                        </div>

                        <div className="space-y-4">
                            {orders?.slice(0, 5).map((order: any) => (
                                <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all group">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 font-black shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            {order.customer_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{order.customer_name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(order.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900">{order.total_amount.toLocaleString()} UZS</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.payment_method}</p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {(!orders || orders.length === 0) && (
                                <div className="text-center py-12 text-slate-400 font-bold uppercase tracking-widest text-sm italic">
                                    Hozircha buyurtmalar yo'q
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Status Summary & Low Stock */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Status Stats */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center"><LayoutDashboard size={18} /></div>
                            Buyurtmalar Holati
                        </h3>
                        <div className="space-y-6">
                            {[
                                { id: 'new', label: 'Yangi', count: orderStatusCounts.new, color: 'bg-blue-600', text: 'text-blue-600' },
                                { id: 'processing', label: 'Jarayonda', count: orderStatusCounts.processing, color: 'bg-amber-500', text: 'text-amber-500' },
                                { id: 'completed', label: 'Bajarildi', count: orderStatusCounts.completed, color: 'bg-emerald-500', text: 'text-emerald-500' },
                                { id: 'cancelled', label: 'Bekor qilindi', count: orderStatusCounts.cancelled, color: 'bg-rose-500', text: 'text-rose-500' },
                            ].map((s) => (
                                <div key={s.id} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                                        <span>{s.label}</span>
                                        <span>{s.count}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${s.color} transition-all duration-1000`}
                                            style={{ width: `${totalOrders > 0 ? (s.count / totalOrders) * 100 : 0}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock Products */}
                    <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center"><AlertTriangle size={18} /></div>
                                Kam Qolgan Mahsulotlar
                            </h3>
                            {lowStockProducts.length === 0 ? (
                                <div className="bg-emerald-50 text-emerald-600 p-6 rounded-3xl flex items-center gap-4">
                                    <TrendingUp size={24} />
                                    <p className="text-xs font-black uppercase tracking-widest">Hammasi yetarli! ✓</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {lowStockProducts.map((p: any) => (
                                        <div key={p.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 overflow-hidden shrink-0">
                                                    <img src={p.images?.[0]} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-900 truncate uppercase tracking-widest leading-relaxed">
                                                    {language === 'uz' ? p.name_uz : p.name_ru}
                                                </p>
                                            </div>
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-lg shrink-0 ${p.stock < 5 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {p.stock} ta
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
