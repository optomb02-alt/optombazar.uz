'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
    const { t, language } = useLanguage();

    return (
        <footer className="bg-slate-900 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo & About */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">O</span>
                            </div>
                            <span className="font-bold text-xl">Optombazar.uz</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            {language === 'uz'
                                ? "O'zbekistonning eng yirik ulgurji savdo platformasi. Eng arzon narxlarda sifatli mahsulotlar."
                                : "Крупнейшая оптовая торговая платформа Узбекистана. Качественные товары по самым низким ценам."
                            }
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{language === 'uz' ? "Bog'lanish" : 'Контакты'}</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone size={18} className="text-blue-400" />
                                <a href="tel:+998901234567" className="hover:text-white transition">+998 90 123 45 67</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} className="text-blue-400" />
                                <a href="mailto:info@optombazar.uz" className="hover:text-white transition">info@optombazar.uz</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={18} className="text-blue-400" />
                                <span>{language === 'uz' ? "Toshkent, O'rikzor" : 'Ташкент, Урикзор'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">{language === 'uz' ? 'Tezkor havolalar' : 'Быстрые ссылки'}</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white transition">{t('home')}</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-white transition">{t('blog')}</Link>
                            </li>
                            <li>
                                <Link href="/cart" className="hover:text-white transition">{t('cart')}</Link>
                            </li>
                        </ul>

                        {/* Telegram */}
                        <a
                            href="https://t.me/optombazar_uz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                        >
                            <Send size={18} />
                            Telegram
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Optombazar.uz. {language === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.'}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
