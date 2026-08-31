'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { VideoUploadField } from '@/components/admin/VideoUploadField';
import {
  DEFAULT_HOME_HERO,
  HomeHeroContent,
  HomeHeroSlide,
  normalizeHomeHeroContent,
} from '@/lib/homeHeroDefaults';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

type Props = {
  value: Partial<HomeHeroContent> | null | undefined;
  onChange: (next: HomeHeroContent) => void;
};

function emptySlide(order: number): HomeHeroSlide {
  return {
    id: Date.now(),
    order,
    isActive: true,
    headline: '',
    subheadline: '',
    ctaText: 'Learn More',
    ctaLink: '/',
    image: '',
    video: '',
  };
}

export function HeroSlidesEditor({ value, onChange }: Props) {
  const content = normalizeHomeHeroContent(value);
  const slides = [...content.slides].sort((a, b) => a.order - b.order);

  const patch = (partial: Partial<HomeHeroContent>) => {
    onChange(normalizeHomeHeroContent({ ...content, ...partial }));
  };

  const updateSlide = (index: number, partial: Partial<HomeHeroSlide>) => {
    const next = slides.map((s, i) => (i === index ? { ...s, ...partial } : s));
    patch({ slides: next.map((s, i) => ({ ...s, order: i + 1 })) });
  };

  const moveSlide = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    patch({ slides: next.map((s, i) => ({ ...s, order: i + 1 })) });
  };

  const removeSlide = (index: number) => {
    const next = slides.filter((_, i) => i !== index);
    patch({ slides: next.map((s, i) => ({ ...s, order: i + 1 })) });
  };

  const addSlide = () => {
    patch({ slides: [...slides, emptySlide(slides.length + 1)] });
  };

  const resetDefaults = () => {
    if (
      !window.confirm(
        'Reset hero slides to the current website defaults? Unsaved local edits in this form will be replaced (click Save Changes to persist).'
      )
    ) {
      return;
    }
    onChange({
      ...DEFAULT_HOME_HERO,
      slides: DEFAULT_HOME_HERO.slides.map((s) => ({ ...s })),
    });
  };

  return (
    <div className="col-span-2 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-black/40 border border-white/10">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Background Video URL
          </label>
          <VideoUploadField
            label=""
            value={content.backgroundVideo || ''}
            folder="home"
            onChange={(url) => patch({ backgroundVideo: url })}
          />
          <p className="text-[11px] text-gray-500 mt-2">Shown behind all slides.</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Poster Image
          </label>
          <ImageUploadField
            label=""
            value={content.posterImage || ''}
            folder="home"
            onChange={(url) => patch({ posterImage: url })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Slide Interval (ms)
          </label>
          <input
            type="number"
            min={2000}
            step={500}
            value={content.intervalMs}
            onChange={(e) => patch({ intervalMs: Number(e.target.value) || 6000 })}
            className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522] transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div>
          <label className="text-sm font-bold text-[#f26522] uppercase tracking-widest">
            Hero Slides
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Add, edit, reorder, or disable slides. Disabled slides stay saved but hidden on the site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={resetDefaults}
            className="h-8 px-3 text-[10px] bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
          >
            Reset to defaults
          </Button>
          <Button
            type="button"
            onClick={addSlide}
            className="h-8 px-3 text-[10px] bg-[#f26522] hover:bg-[#d9551b] text-white rounded-none"
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Slide
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {slides.length === 0 ? (
          <div className="text-sm text-gray-500 border border-dashed border-white/10 p-8 text-center">
            No slides yet. Click “Add Slide” or “Reset to defaults”.
          </div>
        ) : (
          slides.map((slide, idx) => (
            <div
              key={String(slide.id)}
              className={`border p-5 space-y-4 ${
                slide.isActive ? 'border-white/10 bg-white/5' : 'border-white/5 bg-black/30 opacity-70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500">#{idx + 1}</span>
                  <label className="flex items-center gap-2 text-xs text-gray-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={slide.isActive}
                      onChange={(e) => updateSlide(idx, { isActive: e.target.checked })}
                      className="w-4 h-4 rounded bg-black border-white/20 text-[#f26522]"
                    />
                    Enabled on site
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSlide(idx, -1)}
                    disabled={idx === 0}
                    className="h-8 w-8 flex items-center justify-center border border-white/10 disabled:opacity-30 hover:bg-white/10"
                    aria-label="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSlide(idx, 1)}
                    disabled={idx === slides.length - 1}
                    className="h-8 w-8 flex items-center justify-center border border-white/10 disabled:opacity-30 hover:bg-white/10"
                    aria-label="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSlide(idx)}
                    className="h-8 w-8 flex items-center justify-center border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                    aria-label="Delete slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase">Headline</label>
                  <textarea
                    value={slide.headline}
                    onChange={(e) => updateSlide(idx, { headline: e.target.value })}
                    rows={2}
                    className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522]"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase">Subheadline</label>
                  <textarea
                    value={slide.subheadline}
                    onChange={(e) => updateSlide(idx, { subheadline: e.target.value })}
                    rows={2}
                    className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase">CTA Text</label>
                  <input
                    type="text"
                    value={slide.ctaText}
                    onChange={(e) => updateSlide(idx, { ctaText: e.target.value })}
                    className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase">CTA Link</label>
                  <input
                    type="text"
                    value={slide.ctaLink}
                    onChange={(e) => updateSlide(idx, { ctaLink: e.target.value })}
                    className="w-full bg-black border border-white/10 p-3 text-sm focus:border-[#f26522]"
                  />
                </div>
                <div className="space-y-1 md:col-span-1">
                  <label className="text-[10px] text-gray-500 uppercase">Slide Video (URL)</label>
                  <VideoUploadField
                    label=""
                    value={slide.video || ''}
                    folder="home"
                    onChange={(url) => updateSlide(idx, { video: url })}
                  />
                </div>
                <div className="space-y-1 md:col-span-1">
                  <label className="text-[10px] text-gray-500 uppercase">Slide Image (optional poster / visual)</label>
                  <ImageUploadField
                    label=""
                    value={slide.image || ''}
                    folder="home"
                    onChange={(url) => updateSlide(idx, { image: url })}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
