'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, Phone, Save, Clock, CheckCircle, XCircle, ArrowLeft, Calendar, LayoutGrid, ShoppingBag } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

export default function ProfilePage() {
    const { user, orders, updateUserProfile } = useStore();
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'info' | 'orders'>('info');

    // Edit Form State
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserProfile({ ...user, name, phone, address });
        showToast(t('infoUpdated'), 'success');
    };

    // Filter orders for this user
    const myOrders = orders?.filter(o => o.customer_phone === (user?.phone || phone)) || [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <Clock size={16} />;
            case 'processing': return <Package size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'processing': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="mb-12 animate-fade-in text-center md:text-left">
                        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-4 group transition-colors">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            {t('backToShop')}
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t('myProfile')}</h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar / Tabs */}
                        <div className="md:w-1/3 animate-fade-in">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 space-y-2">
                                <button
                                    onClick={() => setActiveTab('info')}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'info'
                                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                        }`}
                                >
                                    <User size={18} />
                                    {t('personalInfo')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'orders'
                                            ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                                            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Package size={18} />
                                        {t('myOrders')}
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {myOrders.length}
                                    </span>
                                </button>
                            </div>

                            {user && (
                                <div className="mt-8 bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 transform group-hover:rotate-12 transition-transform duration-500">
                                            <Calendar size={32} />
                                        </div>
                                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t('registeredAt')}</p>
                                        <p className="text-xl font-black">{new Date(user.registered_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                </div>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="md:w-2/3 animate-fade-in delay-100">
                            {activeTab === 'info' ? (
                                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8">{t('personalInfo')}</h2>
                                    <form onSubmit={handleUpdate} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('name')}</label>
                                                <div className="relative group">
                                                    <User className="absolute left-6 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={e => setName(e.target.value)}
                                                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-indigo-600/20 outline-none transition-all font-bold text-slate-900"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('phone')}</label>
                                                <div className="relative group">
                                                    <Phone className="absolute left-6 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        value={phone}
                                                        onChange={e => setPhone(e.target.value)}
                                                        className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-indigo-600/20 outline-none transition-all font-bold text-slate-900"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('address')}</label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-6 top-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                                <textarea
                                                    value={address}
                                                    onChange={e => setAddress(e.target.value)}
                                                    className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[32px] focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-indigo-600/20 outline-none transition-all font-bold text-slate-900 min-h-[150px] resize-none"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full md:w-auto bg-slate-900 hover:bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200 transform hover:scale-105 active:scale-95"
                                        >
                                            <Save size={18} />
                                            {t('updateInfo')}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {myOrders.length === 0 ? (
                                        <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm p-12">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                                <LayoutGrid size={40} />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2">{t('noOrders')}</h3>
                                            <button
                                                onClick={() => router.push('/')}
                                                className="mt-6 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-700 transition-all flex items-center gap-2 mx-auto"
                                            >
                                                <ShoppingBag size={18} />
                                                {t('backToShop')}
                                            </button>
                                        </div>
                                    ) : (
                                        myOrders.map(order => (
                                            <div key={order.id} className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group overflow-hidden relative">
                                                {/* Left Gradient border */}
                                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-600/0 group-hover:bg-indigo-600 transition-all" />

                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-50 pb-8">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Buyurtma #{order.id.slice(-6)}</p>
                                                        <p className="text-lg font-black text-slate-900">{new Date(order.created_at).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border font-black text-[10px] uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        <span>{language === 'uz' ? (order.status === 'new' ? 'Yangi' : order.status) : order.status}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 mb-8">
                                                    {order.items?.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">{item.quantity}x</span>
                                                                <span className="font-bold text-slate-700">
                                                                    {language === 'uz' ? item.product?.name_uz : item.product?.name_ru}
                                                                </span>
                                                            </div>
                                                            <span className="font-black text-slate-900">
                                                                {(item.product?.price * item.quantity).toLocaleString()} UZS
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-end pt-8 border-t border-slate-50">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('paymentMethod')}</p>
                                                        <p className="text-xs font-bold text-slate-600">{order.payment_method}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">{t('total')}</p>
                                                        <p className="text-3xl font-black text-slate-900">{order.total_amount.toLocaleString()} <span className="text-xs font-black text-indigo-600">UZS</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
