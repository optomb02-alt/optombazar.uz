'use client';

import React, { useState } from 'react';
import { Users, Search, MoreVertical, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';

export default function CustomerManagement() {
    const { allUsers } = useStore() as any;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = allUsers?.filter((u: any) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.includes(searchTerm)
    ) || [];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mijozlar Bazasi</h1>
                    <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Jami: {filteredUsers.length} ta foydalanuvchi</p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Mijoz ismi yoki tel bo'yicha qidirish..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-sm w-[300px] font-bold text-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUsers.map((user: any) => (
                    <div key={user.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl border border-white shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                    {user.name?.charAt(0)}
                                </div>
                                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                                    <UserCheck size={10} /> Faol mijoz
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-2">{user.name}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Phone size={14} className="text-indigo-600" />
                                    <span className="text-xs font-bold">{user.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Calendar size={14} className="text-indigo-600" />
                                    <span className="text-xs font-bold">Ro'yxatdan o'tdi: {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:tracking-[0.2em] transition-all">Buyurtmalar tarixi</button>
                                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
}
