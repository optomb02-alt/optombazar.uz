'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Eye, BookOpen, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStore } from '@/contexts/StoreContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

export default function BlogPage() {
    const { blogPosts, loading } = useStore();
    const { t, language } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />

            <main className="flex-1 pb-20 md:pb-12">
                {/* Hero section for Blog */}
                <section className="bg-slate-900 pt-16 pb-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 blur-[120px] rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-widest mb-6">
                            <BookOpen size={14} />
                            {language === 'uz' ? 'Maqolalar va Yangiliklar' : 'Статьи и Новости'}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            {t('blog')}
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {language === 'uz'
                                ? "Biznesingiz uchun foydali maslahatlar va ulgurji savdo olamidagi eng so'nggi yangiliklar."
                                : "Полезные советы для вашего бизнеса и последние новости из мира оптовой торговли."
                            }
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 -mt-12 relative z-20">
                    {loading && blogPosts.length === 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xl overflow-hidden">
                                    <div className="aspect-video bg-slate-100 rounded-2xl mb-6 shimmer" />
                                    <div className="h-6 bg-slate-100 rounded shimmer w-3/4 mb-4" />
                                    <div className="h-4 bg-slate-100 rounded shimmer w-full mb-2" />
                                    <div className="h-4 bg-slate-100 rounded shimmer w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : blogPosts.length === 0 ? (
                        <div className="text-center py-24 glass rounded-3xl p-12 border border-dashed border-slate-300">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">
                                {language === 'uz' ? 'Hozircha maqolalar yo\'q' : 'Статей пока нет'}
                            </h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                {language === 'uz' ? 'Tez orada yangi maqolalar qo\'shiladi.' : 'Новые статьи будут добавлены в ближайшее время.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => {
                                const title = language === 'uz' ? post.title_uz : post.title_ru;
                                const summary = language === 'uz' ? post.summary_uz : post.summary_ru;

                                return (
                                    <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group">
                                        <article className="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 border border-slate-100 overflow-hidden h-full flex flex-col">
                                            <div className="relative aspect-video overflow-hidden">
                                                <img
                                                    src={post.image_url}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="glass px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white border-white/20">
                                                        {post.category || 'Business'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={14} className="text-indigo-500" />
                                                        {new Date(post.created_at).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU')}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Eye size={14} className="text-indigo-500" />
                                                        {post.views}
                                                    </div>
                                                </div>

                                                <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                                                    {title}
                                                </h2>

                                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                                    {summary}
                                                </p>

                                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                                    <span className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                                        {language === 'uz' ? 'O\'qish' : 'Читать'}
                                                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                                    </span>
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                                {String.fromCharCode(64 + i)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
