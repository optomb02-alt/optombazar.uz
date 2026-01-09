'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft, Send, MapPin, Loader2, Check, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import { MIN_ORDER_AMOUNT, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_COST } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

const CheckoutSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const { language } = useLanguage();
    const steps = [
        { id: 1, icon: ShoppingBag, label: language === 'uz' ? 'Savatcha' : 'Корзина' },
        { id: 2, icon: Truck, label: language === 'uz' ? 'Yetkazish' : 'Доставка' },
        { id: 3, icon: CreditCard, label: language === 'uz' ? "To'lov" : 'Оплата' },
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-5 h-1 bg-slate-100 -z-10 rounded-full" />
                <div
                    className="absolute left-0 top-5 h-1 bg-indigo-600 transition-all duration-700 ease-out -z-10 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center group">
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm border-2 ${step.id < currentStep
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : step.id === currentStep
                                    ? 'bg-white border-indigo-600 text-indigo-600 ring-8 ring-indigo-50 scale-110'
                                    : 'bg-white border-slate-100 text-slate-300'
                                }`}
                        >
                            {step.id < currentStep ? <Check size={22} className="animate-fade-in" /> : <step.icon size={22} />}
                        </div>
                        <span className={`text-[10px] uppercase tracking-widest mt-4 font-black transition-colors duration-300 ${step.id <= currentStep ? 'text-indigo-600' : 'text-slate-400'
                            }`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const { cart, cartTotal, placeOrder } = useStore();
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState<any>(undefined);
    const [isLocating, setIsLocating] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup' | 'yandex' | 'regional_mail'>('delivery');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getCurrentStep = () => {
        if (!name || !phone) return 1;
        if (deliveryMethod !== 'pickup' && !address) return 2;
        return 3;
    };

    const isMinOrderMet = cartTotal >= MIN_ORDER_AMOUNT;
    const isFreeDelivery = cartTotal >= FREE_DELIVERY_THRESHOLD;
    let deliveryCost = (deliveryMethod === 'delivery' && !isFreeDelivery) ? STANDARD_DELIVERY_COST : 0;
    const finalTotal = cartTotal + deliveryCost;

    // Format price consistently to avoid hydration mismatch
    const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            showToast('Geolocation is not supported', 'error');
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });

                try {
                    // Reverse geocoding orqali manzilni olish (Nominatim - bepul)
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=uz`,
                        { headers: { 'User-Agent': 'Optombazar/1.0' } }
                    );
                    const data = await response.json();

                    if (data && data.address) {
                        const addr = data.address;
                        // Manzilni formatlash: ko'cha, uy raqami, mahalla, tuman
                        const parts = [];
                        if (addr.road) parts.push(addr.road);
                        if (addr.house_number) parts.push(addr.house_number + '-uy');
                        if (addr.neighbourhood || addr.suburb) parts.push(addr.neighbourhood || addr.suburb);
                        if (addr.city || addr.town || addr.village) parts.push(addr.city || addr.town || addr.village);

                        const formattedAddress = parts.length > 0
                            ? parts.join(', ')
                            : data.display_name?.split(',').slice(0, 3).join(', ') || `${latitude}, ${longitude}`;

                        setAddress(formattedAddress + `\n🔗 https://yandex.uz/maps/?ll=${longitude},${latitude}&z=17&pt=${longitude},${latitude}`);
                    } else {
                        setAddress(`📍 ${latitude}, ${longitude}\n🔗 https://yandex.uz/maps/?ll=${longitude},${latitude}&z=17`);
                    }
                } catch (error) {
                    // Agar API ishlamasa, koordinatalarni ko'rsatish
                    setAddress(`📍 ${latitude}, ${longitude}\n🔗 https://yandex.uz/maps/?ll=${longitude},${latitude}&z=17`);
                }

                showToast(t('locationFound'), 'success');
                setIsLocating(false);
            },
            () => {
                showToast(t('locationError'), 'error');
                setIsLocating(false);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || (deliveryMethod !== 'pickup' && !address)) {
            showToast(t('fillAllFields'), 'error');
            return;
        }

        setIsSubmitting(true);
        const order = {
            customer_name: name,
            customer_phone: phone,
            address,
            location,
            items: cart,
            total_amount: finalTotal,
            delivery_method: deliveryMethod,
            payment_method: paymentMethod,
            status: 'new',
            created_at: new Date().toISOString()
        };

        const success = await placeOrder(order);
        if (success) {
            showToast(t('orderSuccess'), 'success');
            router.push('/');
        } else {
            showToast('Error placing order', 'error');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />
            <main className="flex-1 py-6">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-4">
                        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-4 group transition-colors">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            {t('backToShop')}
                        </button>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t('checkout')}</h1>
                    </div>

                    <CheckoutSteps currentStep={getCurrentStep()} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Form */}
                        <div className="lg:col-span-7 space-y-8 animate-fade-in">
                            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 space-y-5">
                                {/* Section 1: Contact */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                            <Check size={16} />
                                        </div>
                                        <h2 className="text-base font-black text-slate-900">1. {language === 'uz' ? 'Aloqa ma\'lumotlari' : 'Контактные данные'}</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('name')}</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white outline-none transition-all font-medium text-slate-900 text-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('phone')}</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white outline-none transition-all font-medium text-slate-900 text-sm"
                                                placeholder="+998"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Delivery */}
                                <div className="space-y-3 pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                            <Truck size={16} />
                                        </div>
                                        <h2 className="text-base font-black text-slate-900">2. {t('deliveryMethod')}</h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'delivery', icon: Truck, title: t('delivery'), note: t('deliveryNote') },
                                            { id: 'pickup', icon: Check, title: t('pickup'), note: 'Bepul' },
                                            { id: 'yandex', icon: Send, title: t('yandex'), note: t('yandexNote') },
                                            { id: 'regional_mail', icon: Mail, title: t('regional'), note: t('regionalNote') }
                                        ].map((method: any) => (
                                            <label key={method.id} className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${deliveryMethod === method.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200'}`}>
                                                <input type="radio" value={method.id} checked={deliveryMethod === method.id} onChange={(e) => setDeliveryMethod(e.target.value as any)} className="hidden" />
                                                <div className={`p-2 rounded-lg ${deliveryMethod === method.id ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                                                    {method.icon && <method.icon size={16} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-900 text-sm">{method.title}</p>
                                                    <p className="text-[10px] text-slate-500 truncate">{method.note}</p>
                                                </div>
                                                {deliveryMethod === method.id && <div className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>}
                                            </label>
                                        ))}
                                    </div>

                                    {deliveryMethod !== 'pickup' && (
                                        <div className="space-y-3 animate-fade-in">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{t('address')}</label>
                                                <textarea
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white outline-none transition-all font-medium text-slate-900 text-sm h-20 resize-none"
                                                    placeholder={t('addressPlaceholder')}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleGetLocation}
                                                disabled={isLocating}
                                                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-200 py-3 rounded-xl font-bold text-xs uppercase tracking-wide transition-all"
                                            >
                                                {isLocating ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
                                                {isLocating ? t('detecting') : t('detectLocation')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl shadow-indigo-900/20 sticky top-20 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <h2 className="text-xl font-black mb-6 tracking-tight">{language === 'uz' ? 'Xarid Xulosasi' : 'Итого'}</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-slate-400">
                                        <span className="text-xs font-black uppercase tracking-widest">{t('subtotal') || 'Mahsulotlar'}</span>
                                        <span className="font-bold text-white">{formatPrice(cartTotal)} UZS</span>
                                    </div>
                                    {deliveryCost > 0 && (
                                        <div className="flex justify-between items-center text-slate-400">
                                            <span className="text-xs font-black uppercase tracking-widest">{t('delivery')}</span>
                                            <span className="font-bold text-white">{formatPrice(deliveryCost)} UZS</span>
                                        </div>
                                    )}

                                    <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                        <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{t('total')}</span>
                                        <div className="text-right">
                                            <div className="text-4xl font-black tracking-tight">{formatPrice(finalTotal)}</div>
                                            <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">UZS</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">{t('paymentMethod')}</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['cash', 'card', 'transfer'].map((method) => (
                                            <button
                                                key={method}
                                                onClick={() => setPaymentMethod(method as any)}
                                                className={`py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === method ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-white/5 bg-white/5 text-white/40 hover:bg-white/10'}`}
                                            >
                                                {t(method)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !isMinOrderMet}
                                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-10
                    ${!isMinOrderMet ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/30'}`}
                                >
                                    {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : (
                                        <>
                                            <Send size={18} />
                                            {t('checkout')}
                                        </>
                                    )}
                                </button>
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

const Mail = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
