'use client';

import React, { useState } from 'react';
import {
    Package,
    Plus,
    Save,
    Edit,
    X,
    Sparkles,
    Loader2,
    Trash2,
    Download,
    Camera,
    Wand2,
    CheckCircle,
    Search,
    ChevronRight,
    ChevronLeft,
    Image as ImageIcon
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { useStore } from '@/contexts/StoreContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import { Product } from '@/types';
import CloudinaryUpload from './CloudinaryUpload';

interface TitleSuggestion {
    title_uz: string;
    title_ru: string;
    description_uz: string;
    description_ru: string;
}

interface ImageAnalysis {
    productType: string;
    material: string;
    color: string;
    quantity: string;
    suggestions: TitleSuggestion[];
}

export default function ProductManagement() {
    const {
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        getMainCategories,
        getSubcategories
    } = useStore() as any;
    const { t, language } = useLanguage();
    const { showToast } = useToast();

    const [isGenerating, setIsGenerating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageInput, setImageInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // States for AI Image Analysis
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
    const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysis | null>(null);
    const [analysisImage, setAnalysisImage] = useState<string>('');

    const initialProductState: Partial<Product> = {
        name_uz: '', name_ru: '', description_uz: '', description_ru: '', slug: '',
        price: 0, items_per_pack: 0, stock: 0, images: [],
        video_url: '', category: ''
    };

    const [newProduct, setNewProduct] = useState<Partial<Product>>({ ...initialProductState, category: categories[0]?.id || '' });

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/['"]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    };

    const handleGenerateAI = async () => {
        if (!newProduct.name_uz && !newProduct.name_ru) {
            showToast('AI uchun mahsulot nomini kiriting', 'error');
            return;
        }

        setIsGenerating(true);

        const callAI = async (apiKey: string) => {
            const ai = new GoogleGenAI({ apiKey });
            return await ai.models.generateContent({
                model: 'gemini-flash-lite-latest',
                contents: `
            You are an assistant for a wholesale e-commerce site "Optombazar.uz".
            Input Data:
            Category: ${newProduct.category}
            Name (UZ): ${newProduct.name_uz || 'unknown'}
            Name (RU): ${newProduct.name_ru || 'unknown'}
            Task:
            1. If one name is missing, translate it from the other.
            2. Generate professional, sales-oriented descriptions (2-3 sentences) for wholesale buyers in both Uzbek and Russian.
            Return JSON format only.
        `,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name_uz: { type: Type.STRING },
                            name_ru: { type: Type.STRING },
                            description_uz: { type: Type.STRING },
                            description_ru: { type: Type.STRING },
                        },
                        required: ["name_uz", "name_ru", "description_uz", "description_ru"]
                    }
                }
            });
        };

        try {
            let response;
            const key1 = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            const keys = [key1].filter(Boolean) as string[];

            if (keys.length === 0) {
                throw new Error('API Key topilmadi');
            }

            for (let i = 0; i < keys.length; i++) {
                try {
                    response = await callAI(keys[i]);
                    if (response) break;
                } catch (error: any) {
                    if (i < keys.length - 1) continue;
                    throw error;
                }
            }

            if (response && response.text) {
                const data = JSON.parse(response.text);
                setNewProduct(prev => ({
                    ...prev,
                    name_uz: data.name_uz,
                    name_ru: data.name_ru,
                    description_uz: data.description_uz,
                    description_ru: data.description_ru,
                    slug: generateSlug(data.name_uz)
                }));
                showToast('AI Tavsif tayyor!', 'success');
            }
        } catch (error: any) {
            console.error("AI Generation Error", error);
            showToast('AI xatosi: ' + error.message, 'error');
        } finally {
            setIsGenerating(false);
        }
    };

    const analyzeImageWithAI = async (imageDataUrl: string) => {
        setIsAnalyzing(true);
        setAnalysisImage(imageDataUrl);

        const callVisionAI = async (apiKey: string, base64: string, mime: string) => {
            const ai = new GoogleGenAI({ apiKey });
            return await ai.models.generateContent({
                model: 'gemini-flash-lite-latest',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                inlineData: {
                                    mimeType: mime,
                                    data: base64
                                }
                            },
                            {
                                text: `Sen Optombazar.uz ulgurji savdo do'koni uchun mahsulot tahlilchisisan.
Bu rasmni tahlil qil va quyidagi ma'lumotlarni JSON formatda qaytar:
{
  "productType": "Mahsulot turi",
  "material": "Material",
  "color": "Rangi",
  "quantity": "Taxminiy soni",
  "suggestions": [
    {
      "title_uz": "O'zbekcha nom",
      "title_ru": "Ruscha nom",
      "description_uz": "Qisqa tavsif O'zbekcha",
      "description_ru": "Qisqa tavsif Ruscha"
    }
  ]
}
4 ta suggestion kirit. Faqat JSON qaytar.`
                            }
                        ]
                    }
                ]
            });
        };

        try {
            const key1 = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
            const keys = [key1].filter(Boolean) as string[];

            if (keys.length === 0) {
                showToast('API kaliti topilmadi.', 'error');
                setIsAnalyzing(false);
                return;
            }

            let mimeType = 'image/jpeg';
            let base64Data = '';

            if (imageDataUrl.startsWith('data:')) {
                const matches = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
                if (matches) {
                    mimeType = matches[1];
                    base64Data = matches[2];
                }
            }

            let response;
            for (let i = 0; i < keys.length; i++) {
                try {
                    response = await callVisionAI(keys[i], base64Data, mimeType);
                    if (response) break;
                } catch (error: any) {
                    if (i < keys.length - 1) continue;
                    throw error;
                }
            }

            if (response && response.text) {
                let jsonText = response.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const data: ImageAnalysis = JSON.parse(jsonText);
                setImageAnalysis(data);
                setShowSuggestionsModal(true);
                showToast(`✨ "${data.productType}" aniqlandi!`, 'success');
            }
        } catch (error: any) {
            console.error("AI Image Analysis Error", error);
            showToast(`Tahlil xatosi: ${error.message}`, 'error');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name_uz || !newProduct.price) {
            showToast('Barcha maydonlarni to\'ldiring', 'error');
            return;
        }

        const finalImages = newProduct.images?.length ? newProduct.images : ['https://via.placeholder.com/400'];
        const slug = newProduct.slug || generateSlug(newProduct.name_uz);

        const productData = {
            ...newProduct,
            images: finalImages,
            slug,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            items_per_pack: Number(newProduct.items_per_pack || 0)
        };

        if (editingId) {
            const success = await updateProduct({ ...productData, id: editingId });
            if (success) {
                showToast('Mahsulot yangilandi!', 'success');
                setEditingId(null);
                setNewProduct({ ...initialProductState, category: categories[0]?.id || '' });
                setImageInput('');
            } else {
                showToast('Tahrirlashda xatolik yuz berdi', 'error');
            }
        } else {
            const success = await addProduct(productData);
            if (success) {
                showToast('Mahsulot qo\'shildi!', 'success');
                setNewProduct({ ...initialProductState, category: categories[0]?.id || '' });
                setImageInput('');
            } else {
                showToast('Mahsulot qo\'shishda xatolik yuz berdi', 'error');
            }
        }
    };

    const filteredProducts = products.filter((p: any) =>
        p.name_uz?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ombor va Mahsulotlar</h1>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Jami: {products.length} ta mahsulot</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Mahsulotlarni qidirish..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-sm w-[300px] font-bold text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form Area */}
                <div className="lg:col-span-12 xl:col-span-4">
                    <div className={`bg-white p-8 rounded-[40px] border shadow-sm transition-all duration-500 sticky top-10 ${editingId ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingId ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
                                    {editingId ? <Edit size={20} /> : <Plus size={20} />}
                                </div>
                                {editingId ? 'Tahrirlash' : 'Yangi Mahsulot'}
                            </h2>
                            {editingId && (
                                <button onClick={() => setEditingId(null)} className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* AI Buttons */}
                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    type="button"
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating}
                                    className={`flex items-center justify-center gap-3 py-4 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-100 transition-all ${isGenerating ? 'opacity-50' : ''}`}
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                                    {isGenerating ? 'Generatsiya...' : 'AI bilan to\'ldirish'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mahsulot Nomi (UZ)</label>
                                        <input
                                            value={newProduct.name_uz}
                                            onChange={e => setNewProduct({ ...newProduct, name_uz: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mahsulot Nomi (RU)</label>
                                        <input
                                            value={newProduct.name_ru}
                                            onChange={e => setNewProduct({ ...newProduct, name_ru: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tavsif (UZ)</label>
                                        <textarea
                                            value={newProduct.description_uz}
                                            onChange={e => setNewProduct({ ...newProduct, description_uz: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold min-h-[100px]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tavsif (RU)</label>
                                        <textarea
                                            value={newProduct.description_ru}
                                            onChange={e => setNewProduct({ ...newProduct, description_ru: e.target.value })}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Narxi (UZS)</label>
                                    <input
                                        type="number"
                                        value={newProduct.price || ''}
                                        onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-black"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Paketda (ta)</label>
                                    <input
                                        type="number"
                                        value={newProduct.items_per_pack || ''}
                                        onChange={e => setNewProduct({ ...newProduct, items_per_pack: Number(e.target.value) })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-black"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Soni (Stock)</label>
                                    <input
                                        type="number"
                                        value={newProduct.stock || ''}
                                        onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Kategoriya</label>
                                    <select
                                        value={newProduct.category}
                                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold appearance-none cursor-pointer"
                                    >
                                        {getMainCategories().map((cat: any) => (
                                            <optgroup key={cat.id} label={cat.name_uz}>
                                                <option value={cat.id}>{cat.name_uz} (Barchasi)</option>
                                                {getSubcategories(cat.id).map((sub: any) => (
                                                    <option key={sub.id} value={sub.id}>↳ {sub.name_uz}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Video URL (YouTube/MP4)</label>
                                    <input
                                        value={newProduct.video_url || ''}
                                        onChange={e => setNewProduct({ ...newProduct, video_url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/10 font-bold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Rasmlar</p>
                                <CloudinaryUpload
                                    onUpload={(urls) => setNewProduct(prev => ({ ...prev, images: urls }))}
                                    existingUrls={newProduct.images || []}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-indigo-600 hover:bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-100 active:scale-95 mt-6"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <Save size={18} />
                                    {editingId ? 'O\'zgarishlarni Saqlash' : 'Mahsulotni Joylash'}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Table Area */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center"><Package size={18} /></div>
                                Mahsulotlar Ro'yxati
                            </h3>
                            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3">
                                <Download size={14} /> Facebook Feed XML
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Mahsulot</th>
                                        <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Toifa</th>
                                        <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Narx / Stok</th>
                                        <th className="px-10 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredProducts.map((p: any) => (
                                        <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform shrink-0">
                                                        <img src={p.images?.[0]} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{p.name_uz}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{p.slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
                                                {p.category}
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-indigo-600">{p.price.toLocaleString()} <span className="text-[10px]">UZS</span></p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${p.stock < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                    {p.stock} ta mavjud
                                                </p>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(p.id);
                                                            setNewProduct(p);
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className="p-3 text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(p.id)}
                                                        className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Placeholder */}
                        <div className="p-8 bg-slate-50/30 flex items-center justify-between">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">1-10 dan {products.length}</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white transition-all"><ChevronLeft size={16} /></button>
                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
