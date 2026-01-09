'use client';

import React, { useState } from 'react';
import {
    ShoppingBag,
    Search,
    Filter,
    ExternalLink,
    CheckCircle,
    XCircle,
    Clock,
    Truck,
    MoreVertical,
    ChevronDown
} from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';

export default function OrderManagement() {
    const { orders, updateOrderStatus } = useStore();
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateOrderStatus(id, status);
            showToast('Buyurtma holati yangilandi!', 'success');
        } catch (error) {
            showToast('Xatolik yuz berdi', 'error');
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100 ring-4 ring-blue-50/50';
            case 'processing': return 'bg-amber-50 text-amber-600 border-amber-100 ring-4 ring-amber-50/50';
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-4 ring-emerald-50/50';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100 ring-4 ring-rose-50/50';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <Clock size={14} />;
            case 'processing': return <Truck size={14} />;
            case 'completed': return <CheckCircle size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const filteredOrders = orders?.filter((order: any) => {
        const matchesSearch =
            order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_phone?.includes(searchTerm) ||
            order.id?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    }) || [];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Buyurtmalar Boshqaruvi</h1>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Bugun: {filteredOrders.length} ta natija</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Mijoz yoki ID bo'yicha qidirish..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-sm w-[300px] font-bold text-sm"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="pl-6 pr-12 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-sm font-black text-[10px] uppercase tracking-widest cursor-pointer appearance-none"
                        >
                            <option value="all">Barcha Holatlar</option>
                            <option value="new">🆕 Yangi</option>
                            <option value="processing">⏳ Jarayonda</option>
                            <option value="completed">✅ Bajarildi</option>
                            <option value="cancelled">❌ Bekor qilindi</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Buyurtma va Mijoz</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Summa va To'lov</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Ma'lumotlar</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Holat</th>
                                <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.map((order: any) => (
                                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg shadow-sm border border-white shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                {order.customer_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{order.customer_name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{order.customer_phone}</p>
                                                <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest mt-1">ID: {String(order.id || '').slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <p className="text-md font-black text-slate-900">{order.total_amount?.toLocaleString()} <span className="text-[10px]">UZS</span></p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-2 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{order.payment_method}</span>
                                            <span className="px-2 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{order.delivery_method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <p className="text-[10px] font-bold text-slate-600 leading-relaxed max-w-[200px] line-clamp-2">{order.address}</p>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">{new Date(order.created_at).toLocaleString()}</p>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border inline-flex items-center gap-2 ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="relative group/menu inline-block">
                                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all">
                                                <MoreVertical size={18} />
                                            </button>

                                            <div className="absolute right-0 top-10 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-30 p-2 text-left">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-slate-300 px-4 py-2">Holatni o'zgartirish</p>
                                                {[
                                                    { id: 'new', label: '🆕 Yangi', color: 'text-blue-600' },
                                                    { id: 'processing', label: '⏳ Jarayonda', color: 'text-amber-500' },
                                                    { id: 'completed', label: '✅ Bajarildi', color: 'text-emerald-500' },
                                                    { id: 'cancelled', label: '❌ Bekor qilish', color: 'text-rose-500' },
                                                ].map((s) => (
                                                    <button
                                                        key={s.id}
                                                        onClick={() => handleStatusUpdate(order.id, s.id)}
                                                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors ${s.color}`}
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                                <div className="h-px bg-slate-50 my-2" />
                                                <button className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 flex items-center gap-3">
                                                    <ExternalLink size={12} /> Tafsilotlar
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
