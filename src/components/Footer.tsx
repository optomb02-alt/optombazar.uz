'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-slate-900 text-white py-16 mt-auto relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo & About */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-900/50">
                                <span className="text-white font-black text-2xl">O</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-2xl tracking-tight">Optombazar</span>
                                <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Ulgurji Platforma</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            {language === 'uz'
                                ? "O'zbekistonning eng yirik ulgurji savdo platformasi. Eng arzon narxlarda yuqori sifatli mahsulotlar va qulay yetkazib berish xizmati."
                                : "Крупнейшая оптовая торговая платформа Узбекистана. Высококачественные товары по лучшим ценам и удобный сервис доставки."
                            }
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-black text-indigo-400 text-xs uppercase tracking-widest mb-6">{language === 'uz' ? "Bog'lanish" : 'Контакты'}</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors">
                                    <Phone size={18} className="text-indigo-400 group-hover:text-white" />
                                </div>
                                <a href="tel:+998901234567" className="font-bold hover:text-white transition">+998 90 123 45 67</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors">
                                    <Mail size={18} className="text-indigo-400 group-hover:text-white" />
                                </div>
                                <a href="mailto:info@optombazar.uz" className="font-bold hover:text-white transition">info@optombazar.uz</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2.5 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors">
                                    <MapPin size={18} className="text-indigo-400 group-hover:text-white" />
                                </div>
                                <span className="font-bold">{language === 'uz' ? "Toshkent, O'rikzor" : 'Ташкент, Урикзор'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-black text-indigo-400 text-xs uppercase tracking-widest mb-6">{language === 'uz' ? 'Tezkor havolalar' : 'Быстрые ссылки'}</h3>
                        <ul className="grid grid-cols-2 gap-4 text-slate-300">
                            <li>
                                <Link href="/" className="font-bold hover:text-indigo-400 transition">{t('home')}</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="font-bold hover:text-indigo-400 transition">{t('blog')}</Link>
                            </li>
                            <li>
                                <Link href="/cart" className="font-bold hover:text-indigo-400 transition">{t('cart')}</Link>
                            </li>
                            <li>
                                <Link href="/profile" className="font-bold hover:text-indigo-400 transition">{t('profile') || 'Profil'}</Link>
                            </li>
                        </ul>

                        {/* Telegram Button */}
                        <a
                            href="https://t.me/optombazar_uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition-all shadow-lg shadow-indigo-900/20 transform hover:scale-105 active:scale-95"
                        >
                            <Send size={18} />
                            TELEGRAM
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <span>© {new Date().getFullYear()} Optombazar.uz</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
