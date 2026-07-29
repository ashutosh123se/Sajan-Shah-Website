'use client';

import React, { useId, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadAdminImage } from '@/lib/adminImageUpload';

interface ImageUploadFieldProps {
  label?: string;
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  required?: boolean;
  className?: string;
  previewClassName?: string;
}

export function ImageUploadField({
  label = 'Image',
  value,
  onChange,
  folder = 'uploads',
  required = false,
  className = '',
  previewClassName = 'h-24 w-24',
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadAdminImage(file, folder);
      onChange(imageUrl);
      toast.success('Image uploaded');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
          {required ? ' *' : ''}
        </label>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {value ? (
          <div className={`${previewClassName} bg-black/40 border border-white/10 overflow-hidden shrink-0`}>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className={`${previewClassName} bg-black/40 border border-dashed border-white/20 flex items-center justify-center text-[10px] text-gray-500 uppercase tracking-wider shrink-0`}
          >
            No image
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
          <label
            htmlFor={inputId}
            className={`inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
              uploading
                ? 'bg-white/10 text-gray-400 cursor-wait'
                : 'bg-white text-black hover:bg-[#f26522] hover:text-white'
            }`}
          >
            {uploading ? 'Uploading...' : value ? 'Replace Image' : 'Upload Image'}
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-red-400 text-left"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
