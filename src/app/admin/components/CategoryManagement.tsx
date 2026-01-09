'use client';

import React from 'react';
import { List, Plus, Edit, Trash2, ChevronRight, Hash } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

export default function CategoryManagement() {
    const { categories, getMainCategories, getSubcategories } = useStore() as any;

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Kategoriyalar</h1>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Tizimdagi barcha toifalar</p>
                </div>
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3">
                    <Plus size={18} /> Yangi Kategoriya
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {getMainCategories().map((mainCat: any) => (
                    <div key={mainCat.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-indigo-50/50 transition-all">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100 shadow-sm font-black">
                                    <Hash size={20} />
                                </div>
                                <h3 className="text-lg font-black text-slate-900">{mainCat.name_uz}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Edit size={16} /></button>
                                <button className="p-2 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            {getSubcategories(mainCat.id).map((sub: any) => (
                                <div key={sub.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-50 rounded-2xl hover:bg-white hover:border-indigo-100 transition-all group/item">
                                    <div className="flex items-center gap-3">
                                        <ChevronRight size={14} className="text-slate-300 group-hover/item:text-indigo-600 transition-colors" />
                                        <span className="text-sm font-bold text-slate-600">{sub.name_uz}</span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit size={14} /></button>
                                        <button className="p-2 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                                <Plus size={14} /> Sub-kategoriya qo'shish
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
