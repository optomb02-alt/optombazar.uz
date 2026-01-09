'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft, Send, MapPin, Loader2, Check, ShoppingBag, Truck, CreditCard, Minus, Plus } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import { MIN_ORDER_AMOUNT, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_COST } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

export default function CartPage() {
    const { cart, updateCartQuantity, removeFromCart, cartTotal, placeOrder } = useStore();
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Business Logic
    const isMinOrderMet = cartTotal >= MIN_ORDER_AMOUNT;
    const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;

    // Format price consistently to avoid hydration mismatch
    const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50/50">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center max-w-sm w-full glass p-12 rounded-[40px] border border-white shadow-2xl shadow-indigo-100">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag size={40} className="text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">{t('emptyCart')}</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            {language === 'uz' ? 'Savatchangiz bo\'sh. Mahsulot tanlab uni to\'ldiring!' : 'Ваша корзина пуста. Начните покупки!'}
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-xl shadow-indigo-200 transform hover:scale-105 active:scale-95"
                        >
                            {t('backToShop')}
                        </Link>
                    </div>
                </main>
                <Footer />
                <MobileNavbar />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-100/30">
            <Header />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold transition-colors mb-4 group">
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                {t('backToShop')}
                            </Link>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                {t('cart')} <span className="text-indigo-600 ml-2">{cart.length}</span>
                            </h1>
                        </div>

                        {!isMinOrderMet && (
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-4 animate-fade-in shadow-sm">
                                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                                    <ShoppingBag size={20} />
                                </div>
                                <div className="text-sm">
                                    <p className="font-black text-amber-900 leading-tight">{t('minOrderWarning')}</p>
                                    <p className="text-amber-700 mt-1">Kamida {formatPrice(MIN_ORDER_AMOUNT)} UZS lik mahsulot oling.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-6">
                            {cart.map((item) => {
                                const name = language === 'uz' ? item.product.name_uz : item.product.name_ru;
                                const imageUrl = item.product.images?.[0] || 'https://via.placeholder.com/150';

                                return (
                                    <div key={item.product.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 flex flex-col sm:flex-row items-center gap-8 transition-all hover:shadow-xl hover:shadow-indigo-50/50 group animate-fade-in">
                                        <div className="w-32 h-32 bg-slate-100 rounded-3xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
                                            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 space-y-4 text-center sm:text-left">
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                                                    {name}
                                                </h3>
                                                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">
                                                    {item.product.items_per_pack} {t('pieces')} / {t('pack') || 'blok'}
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-50">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-black text-slate-900">
                                                        {formatPrice(item.product.price * item.quantity)}
                                                    </span>
                                                    <span className="text-[10px] font-black text-indigo-600 uppercase">UZS</span>
                                                </div>

                                                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                                                    <button
                                                        onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-indigo-600 active:scale-90 transition-all"
                                                    >
                                                        <Minus size={18} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 text-center bg-transparent font-black text-slate-900 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    />
                                                    <button
                                                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-indigo-600 active:scale-90 transition-all"
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary Checkout Card */}
                        <div className="lg:col-span-4">
                            <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-indigo-900/20 sticky top-28 overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <h2 className="text-2xl font-black mb-8 tracking-tight">{t('checkout')}</h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-slate-400">
                                        <span className="text-xs font-black uppercase tracking-widest">{language === 'uz' ? 'Mahsulotlar' : 'Товары'}</span>
                                        <span className="font-bold text-white">{formatPrice(cartTotal)} UZS</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{t('delivery')}</span>
                                        <span className={`font-bold ${isFreeDelivery ? 'text-emerald-400' : 'text-white'}`}>
                                            {isFreeDelivery ? (language === 'uz' ? 'Bepul' : 'Бесплатно') : 'Kelishiladi'}
                                        </span>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{t('total')}</span>
                                        <div className="text-right">
                                            <div className="text-3xl font-black tracking-tight">{formatPrice(cartTotal)}</div>
                                            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">UZS</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => router.push('/checkout')}
                                        disabled={!isMinOrderMet}
                                        className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 flex items-center justify-center gap-3
                                            ${isMinOrderMet
                                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/30'
                                                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}`}
                                    >
                                        <Send size={18} />
                                        {t('continue')}
                                    </button>

                                    <div className="flex items-center gap-4 pt-4 text-white/40">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                                <CreditCard size={12} />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                                <MapPin size={12} />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                                <Truck size={12} />
                                            </div>
                                        </div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest">{language === 'uz' ? 'Xavfsiz To\'lov' : 'Безопасная Оплата'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
