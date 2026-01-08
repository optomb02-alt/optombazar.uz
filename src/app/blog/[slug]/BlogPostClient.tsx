'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Eye, Share2, Tag, BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNavbar from '@/components/MobileNavbar';

interface BlogPostClientProps {
    post: any;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const { language, t } = useLanguage();
    const router = useRouter();

    const title = language === 'uz' ? post.title_uz : post.title_ru;
    const content = language === 'uz' ? post.content_uz : post.content_ru;
    const summary = language === 'uz' ? post.summary_uz : post.summary_ru;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: summary,
                url: window.location.href,
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <Header />

            <main className="flex-1 pb-20 md:pb-12">
                {/* Hero section for Post */}
                <section className="bg-slate-900 pt-12 pb-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 blur-[120px] rounded-full" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            {language === 'uz' ? 'Ortga qaytish' : 'Назад'}
                        </button>

                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">
                                <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10 text-white">
                                    {post.category || 'Business'}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {new Date(post.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Eye size={14} />
                                    {post.views}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {Math.ceil(content.length / 1000)} min read
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                                {title}
                            </h1>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 -mt-20 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <article className="bg-white rounded-[40px] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
                            {/* Featured Image */}
                            <div className="aspect-video w-full relative">
                                <img src={post.image_url} alt={title} className="w-full h-full object-cover" />
                            </div>

                            <div className="p-8 md:p-16">
                                {/* Content */}
                                <div
                                    className="prose prose-lg md:prose-xl prose-slate max-w-none 
                                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                                    prose-p:leading-relaxed prose-p:text-slate-600
                                    prose-strong:text-slate-900 prose-strong:font-black
                                    prose-img:rounded-3xl prose-img:shadow-xl"
                                    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
                                />

                                {/* Tags & Share */}
                                <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags?.map((tag: string) => (
                                            <span key={tag} className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default">
                                                <Tag size={12} /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 transform hover:scale-105 active:scale-95"
                                    >
                                        <Share2 size={18} />
                                        {language === 'uz' ? 'Ulashish' : 'Поделиться'}
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* More Articles Call to action */}
                        <div className="mt-12 bg-indigo-600 rounded-[40px] p-8 md:p-12 text-center text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-2xl md:text-3xl font-black mb-4">
                                    {language === 'uz' ? 'Yana maqolalar o\'qishni istaysizmi?' : 'Хотите прочитать больше статей?'}
                                </h2>
                                <p className="text-indigo-100 mb-8 max-w-md mx-auto">
                                    {language === 'uz' ? 'Bizning blogimizda biznesingiz uchun ko\'plab foydali maqolalar mavjud.' : 'В нашем блоге много полезных статей для вашего бизнеса.'}
                                </p>
                                <button
                                    onClick={() => router.push('/blog')}
                                    className="bg-white text-indigo-600 font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-xl hover:bg-slate-50 transform hover:scale-105"
                                >
                                    {language === 'uz' ? 'Barcha maqolalar' : 'Все статьи'}
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MobileNavbar />
        </div>
    );
}
