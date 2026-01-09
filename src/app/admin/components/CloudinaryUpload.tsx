'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image, Film, Loader2, Check } from 'lucide-react';

interface CloudinaryUploadProps {
    onUpload: (urls: string[]) => void;
    existingUrls?: string[];
    type?: 'image' | 'video' | 'both';
    maxFiles?: number;
}

const CLOUD_NAME = 'dkc6rlyeo';
const UPLOAD_PRESET = 'optombazar_preset';

export default function CloudinaryUpload({
    onUpload,
    existingUrls = [],
    type = 'image',
    maxFiles = 5
}: CloudinaryUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>(existingUrls);
    const [dragOver, setDragOver] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const acceptTypes = type === 'image'
        ? 'image/*'
        : type === 'video'
            ? 'video/*'
            : 'image/*,video/*';

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('cloud_name', CLOUD_NAME);

        const resourceType = file.type.startsWith('video') ? 'video' : 'image';

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files).slice(0, maxFiles - uploadedUrls.length);
        if (fileArray.length === 0) return;

        setUploading(true);
        setProgress(0);

        try {
            const urls: string[] = [];
            for (let i = 0; i < fileArray.length; i++) {
                const url = await uploadToCloudinary(fileArray[i]);
                urls.push(url);
                setProgress(Math.round(((i + 1) / fileArray.length) * 100));
            }

            const newUrls = [...uploadedUrls, ...urls];
            setUploadedUrls(newUrls);
            onUpload(newUrls);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Yuklashda xatolik. Cloudinary upload preset tekshiring.');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    const removeUrl = (index: number) => {
        const newUrls = uploadedUrls.filter((_, i) => i !== index);
        setUploadedUrls(newUrls);
        onUpload(newUrls);
    };

    return (
        <div className="space-y-4">
            {/* Upload Zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                    border-2 border-dashed rounded-[32px] p-10 text-center cursor-pointer transition-all duration-500
                    ${dragOver ? 'border-indigo-600 bg-indigo-50/50 scale-[0.98]' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'}
                    ${uploading ? 'pointer-events-none opacity-60' : ''}
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptTypes}
                    multiple={maxFiles > 1}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                />

                {uploading ? (
                    <div className="flex flex-col items-center gap-6 animate-pulse">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-2">Yuklanmoqda... {progress}%</p>
                            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            {type === 'video' ? <Film className="text-indigo-600" /> : <Image className="text-indigo-600" />}
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                                {type === 'video' ? 'Video yuklash' : 'Rasm yuklash'}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                Tortib tashlang yoki bosing ({maxFiles - uploadedUrls.length} ta qoldi)
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Uploaded Previews */}
            {uploadedUrls.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {uploadedUrls.map((url, index) => (
                        <div key={index} className="relative group overflow-visible">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative z-10 bg-white">
                                {url.includes('/video/') ? (
                                    <video
                                        src={url}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={url}
                                        alt={`Upload ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeUrl(index); }}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg shadow-rose-200 active:scale-90"
                            >
                                <X size={16} />
                            </button>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center z-20 shadow-lg shadow-emerald-100">
                                <Check size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
