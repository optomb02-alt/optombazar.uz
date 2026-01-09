'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
    const { t, language } = useLanguage();

    const socialLinks = [
        { icon: Send, href: 'https://t.me/optombazar_uz', label: 'Telegram' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-10 mt-auto relative overflow-hidden">
            {/* Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                                <span className="text-white font-black text-xl">O</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tight">Optombazar</span>
                                <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-bold">Ulgurji Platforma</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {language === 'uz'
                                ? "O'zbekistonning eng yirik ulgurji savdo platformasi."
                                : "Крупнейшая оптовая платформа Узбекистана."}
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-slate-800 hover:bg-indigo-600 rounded-lg transition-all hover:scale-105"
                                    title={social.label}
                                >
                                    <social.icon size={16} className="text-slate-400 hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-indigo-400 text-xs uppercase tracking-widest mb-4">{language === 'uz' ? "Bog'lanish" : 'Контакты'}</h3>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-center gap-2">
                                <div className="p-1.5 bg-slate-800 rounded-lg">
                                    <Phone size={14} className="text-indigo-400" />
                                </div>
                                <a href="tel:+998901234567" className="text-sm font-medium hover:text-white transition">+998 90 123 45 67</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="p-1.5 bg-slate-800 rounded-lg">
                                    <Mail size={14} className="text-indigo-400" />
                                </div>
                                <a href="mailto:info@optombazar.uz" className="text-sm font-medium hover:text-white transition">info@optombazar.uz</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="p-1.5 bg-slate-800 rounded-lg">
                                    <MapPin size={14} className="text-indigo-400" />
                                </div>
                                <span className="text-sm font-medium">{language === 'uz' ? "Toshkent, O'rikzor" : 'Ташкент, Урикзор'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-indigo-400 text-xs uppercase tracking-widest mb-4">{language === 'uz' ? 'Sahifalar' : 'Страницы'}</h3>
                        <ul className="grid grid-cols-2 gap-2 text-slate-300">
                            <li><Link href="/" className="text-sm font-medium hover:text-indigo-400 transition">{t('home')}</Link></li>
                            <li><Link href="/blog" className="text-sm font-medium hover:text-indigo-400 transition">{t('blog')}</Link></li>
                            <li><Link href="/cart" className="text-sm font-medium hover:text-indigo-400 transition">{t('cart')}</Link></li>
                            <li><Link href="/profile" className="text-sm font-medium hover:text-indigo-400 transition">{t('profile') || 'Profil'}</Link></li>
                        </ul>

                        {/* CTA Button */}
                        <a
                            href="https://t.me/optombazar_uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-lg transition-all shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105"
                        >
                            <Send size={14} />
                            Telegram
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-slate-500 text-xs">
                    <span>© {new Date().getFullYear()} Optombazar.uz</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-300 transition">Privacy</a>
                        <a href="#" className="hover:text-slate-300 transition">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
