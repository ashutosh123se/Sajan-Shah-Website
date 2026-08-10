'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

import api from '@/lib/api';
import { MediaImage } from '@/components/common/MediaImage';

interface MerchProduct {
  id: string | number;
  name: string;
  title?: string;
  subtitle?: string;
  description: string;
  image?: string;
  galleryImages?: string[];
  buy_url_internal?: string;
  price?: number;
  objectPosition?: string;
  hasImage?: boolean;
  objectFit?: 'contain' | 'cover';
  cardBg?: string;
}

export const ProductsMerchandise: React.FC = () => {
  const [merchList, setMerchList] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const { addToCart } = useCart();
  const router = useRouter();

  const handleProductClick = (item: MerchProduct) => {
    if (!item.hasImage) return;
    setSelectedProduct(item);
    setActiveImage(item.image || '');
  };

  const handleShare = async () => {
    if (!selectedProduct) return;
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Sajan Shah - ${selectedProduct.title || selectedProduct.name}`,
          text: selectedProduct.subtitle,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleModalAddToCart = () => {
    if (selectedProduct) {
      const isApparel = selectedProduct.title?.includes('T-SHIRT') || selectedProduct.name?.includes('T-SHIRT');
      const productTitle = isApparel ? `${selectedProduct.title || selectedProduct.name} - Size ${selectedSize}` : (selectedProduct.title || selectedProduct.name);

      addToCart({
        id: isApparel ? `${selectedProduct.id}-${selectedSize}` : selectedProduct.id.toString(),
        title: productTitle,
        description: selectedProduct.description,
        price: selectedProduct.price || 499,
        imageUrl: selectedProduct.image || '',
        category: 'merchandise',
        stock: 100
      }, 1);
      setSelectedProduct(null);
      router.push('/cart');
    }
  };

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await api.get('/v1/products');
        const dbProducts = response.data.data.products || [];
        const dbMerch = dbProducts.filter(
          (p: any) => String(p.category || '').toLowerCase() === 'merchandise' && p.is_active !== false
        );
        setMerchList(
          dbMerch.map((m: any) => {
            const image = m.image_homepage || m.image_product_page || '';
            const galleryImages = [m.image_product_page, m.image_homepage].filter(
              (url: string | null | undefined, i: number, arr: (string | null | undefined)[]) =>
                Boolean(url) && arr.indexOf(url) === i
            ) as string[];
            return {
              id: m.id,
              name: m.name,
              title: m.name,
              subtitle: m.short_description || 'Exclusive Merchandise',
              description: m.description,
              image,
              galleryImages,
              buy_url_internal: m.buy_url_internal || '#',
              price: m.price !== null ? Number(m.price) : 0,
              hasImage: Boolean(image),
              objectPosition: 'center center',
            };
          })
        );
      } catch (error) {
        console.error('Failed to fetch merchandise:', error);
        setMerchList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchandise();
  }, []);

  const activeMerch = merchList;

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 bg-[#0a0a0a]">
        Loading Merchandise...
      </div>
    );
  }

  if (activeMerch.length === 0) {
    return (
      <section id="merchandise" className="py-32 bg-[#0a0a0a] text-center text-gray-500">
        No merchandise available yet.
      </section>
    );
  }

  return (
    <section id="merchandise" className="py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-full mb-6"
          >
            MERCHANDISE BY SAJAN SHAH
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            Wear the Identity <br />You Want to{' '}
            <span className="text-[#f26522]">Become</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 font-light max-w-3xl mx-auto"
          >
            Wear It. Use It. Become It. These are not just products. They are daily reminders of the person you are becoming.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeMerch.map((item: MerchProduct, index: number) => {
            const hasImage = item.hasImage !== undefined ? item.hasImage : (!!item.image && !item.image.includes('placeholder') && !item.image.includes('placehold.co'));
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5 cursor-pointer"
                onClick={() => handleProductClick(item)}
              >
                {/* ── Product visual ── */}
                {hasImage ? (
                  <div
                    className="w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
                    style={{ background: item.cardBg || 'transparent' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="w-full h-full transition-all duration-700"
                      style={{
                        objectFit: item.objectFit || 'cover',
                        objectPosition: item.objectPosition,
                        padding: item.objectFit === 'contain' ? '12px' : '0',
                      }}
                    />
                  </div>
                ) : (
                  /* Premium dark placeholder for items without a photo */
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1c1c] via-[#111] to-[#0a0a0a] transition-all duration-700 group-hover:opacity-40">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#f26522]/40 flex items-center justify-center mb-3">
                      <svg
                        className="w-8 h-8 text-[#f26522]/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                        />
                      </svg>
                    </div>
                    <span className="text-[#f26522]/50 text-[10px] font-black tracking-widest uppercase">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* ── Slide-up overlay ── */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-12 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/40 to-transparent">
                  <h3 className="text-xl font-black mb-1 text-white tracking-tight leading-none">
                    {item.title || item.name}
                  </h3>
                  <p className="text-[#f26522] text-[10px] font-black tracking-widest uppercase mb-4">
                    {item.subtitle}
                  </p>
                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                    <p className="text-gray-400 text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                      {item.description}
                    </p>
                    {hasImage && (
                      <span className="inline-flex items-center text-white font-black text-[10px] uppercase tracking-[0.2em] hover:text-[#f26522] transition-colors">
                        View Details →
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Add icon badge (top-right on hover) ── */}
                {hasImage && (
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-10 h-10 rounded-full bg-[#f26522] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl overflow-y-auto max-h-[95vh] md:max-h-[90vh] max-w-4xl w-full flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(242,101,34,0.15)] scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Image section */}
              <div
                className="w-full md:w-1/2 flex flex-col p-8 bg-[#0a0a0a]"
                style={{ background: selectedProduct.cardBg || '#0a0a0a' }}
              >
                <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
                  <img
                    src={activeImage || selectedProduct.image}
                    alt={selectedProduct.title || selectedProduct.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{
                      objectPosition: selectedProduct.objectPosition,
                      padding: selectedProduct.objectFit === 'contain' ? '24px' : '0',
                    }}
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0 && (
                  <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <button 
                      onClick={() => setActiveImage(selectedProduct.image!)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === selectedProduct.image || (!activeImage && true) ? 'border-[#f26522] scale-105' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'}`}
                    >
                      <MediaImage src={selectedProduct.image} alt={selectedProduct.name || 'Product'} className="w-full h-full object-cover" />
                    </button>
                    {selectedProduct.galleryImages.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-[#f26522] scale-105' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'}`}
                      >
                        <MediaImage src={img} alt="Product view" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details section */}
              <div className="w-full md:w-1/2 bg-[#111] relative overflow-hidden flex flex-col max-h-none md:max-h-[85vh]">
                
                {/* Fixed Watermark Background */}
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.04] select-none">
                  <img src="/MERCHANDISE/watermark.png" alt="Watermark" className="w-full h-full object-contain p-8" />
                </div>

                {/* Scrollable Content */}
                <div className="relative z-10 flex-1 flex flex-col overflow-x-hidden overflow-y-auto p-8 md:p-10 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[10px] font-black tracking-widest text-[#f26522] uppercase">
                    SAJAN SHAH EXCLUSIVE
                  </div>
                  <div className="flex gap-4 text-white/60">
                    <button onClick={handleShare} className="hover:text-white transition-colors" title="Share">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    <button onClick={() => setSelectedProduct(null)} className="hover:text-white transition-colors" title="Close">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">
                  {selectedProduct.title || selectedProduct.name}
                </h2>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-light text-white">₹{selectedProduct.price || 499}.00</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">MRP incl of all taxes</span>
                </div>

                <div className="w-full h-px bg-white/10 mb-6"></div>

                {/* Size Selector for T-Shirts */}
                {(selectedProduct.title?.includes('T-SHIRT') || selectedProduct.name?.includes('T-SHIRT')) && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs uppercase tracking-widest text-white/70">Size</span>
                      <span className="text-[10px] uppercase tracking-widest text-[#f26522] cursor-pointer hover:underline">Size Guide</span>
                    </div>
                    <div className="flex gap-3">
                      {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border rounded-lg text-sm font-medium transition-all ${selectedSize === size ? 'border-[#f26522] bg-[#f26522]/10 text-[#f26522]' : 'border-white/20 text-white/80 hover:border-[#f26522] hover:text-[#f26522]'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <button
                  onClick={handleModalAddToCart}
                  className="w-full bg-[#f26522] text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(242,101,34,0.4)] hover:shadow-none mb-8"
                >
                  ADD TO BAG
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-12 mb-8 pb-8 border-b border-white/10">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Free shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Premium Fashion</span>
                  </div>
                </div>

                {/* Product Details Section */}
                <div className="mb-4 flex justify-between items-center cursor-pointer group">
                  <h3 className="text-[11px] uppercase tracking-[0.15em] font-black text-white/90">Product Details & Overview</h3>
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>

                <div className="space-y-6 text-xs text-white/60 leading-relaxed pb-8">
                  <div className="space-y-2 font-mono text-[11px]">
                    <p><span className="text-white/40 uppercase tracking-widest">SKU:</span> SAJAN-{selectedProduct.id.toString().toUpperCase()}-001</p>
                    <p><span className="text-white/40 uppercase tracking-widest">Description:</span> {selectedProduct.title || selectedProduct.name}</p>
                    <p><span className="text-white/40 uppercase tracking-widest">Dimensions:</span> Customers are advised to refer to the size guide for precise measurements and optimal fit.</p>
                  </div>

                  <div>
                    <h4 className="text-white/80 font-bold mb-3 uppercase tracking-wider">{selectedProduct.subtitle}</h4>
                    <p className="whitespace-pre-line text-[13px] leading-[1.8] text-gray-300">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="space-y-2 font-mono text-[11px] pt-4">
                    <p><span className="text-white/40 uppercase tracking-widest">Net Quantity:</span> 1N</p>
                    {(selectedProduct.title?.includes('T-SHIRT') || selectedProduct.name?.includes('T-SHIRT')) && (
                      <>
                        <p><span className="text-white/40 uppercase tracking-widest">Fit:</span> Relaxed Fit</p>
                        <p><span className="text-white/40 uppercase tracking-widest">Care Instruction:</span> Machine Wash</p>
                        <p><span className="text-white/40 uppercase tracking-widest">Fabric Composition:</span> 100% Cotton</p>
                      </>
                    )}
                    <p><span className="text-white/40 uppercase tracking-widest">Manufactured and Marketed By:</span><br />RiseX Sajan Shah, Ahmedabad - 380009</p>
                    <p><span className="text-white/40 uppercase tracking-widest">Country Of Origin:</span> India</p>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
