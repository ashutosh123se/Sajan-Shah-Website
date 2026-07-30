'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { MediaImage } from '@/components/common/MediaImage';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  short_description?: string | null;
  is_active: boolean;
  is_featured: boolean;
  featured_order?: number | null;
  image_homepage?: string | null;
  image_product_page?: string | null;
  buy_url_amazon?: string | null;
  buy_url_flipkart?: string | null;
  buy_url_internal?: string | null;
  price?: number | null;
}

const FIELD_CLASS =
  'w-full bg-zinc-950 border border-white/15 text-white placeholder:text-zinc-400 px-4 py-3 focus:border-[#f26522] focus:outline-none caret-white [color-scheme:dark] selection:bg-[#f26522]/40 autofill:shadow-[inset_0_0_0_1000px_#09090b] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]';

interface Slot {
  slot: number;
  product: {
    id: string;
    name: string;
    image_homepage?: string;
    slug: string;
  } | null;
}

export default function AdminProductsPage() {
  const { isSuperAdmin, isAdmin, isEditor } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Slot changing state
  const [assigningSlot, setAssigningSlot] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'book',
    description: '',
    short_description: '',
    is_active: true,
    is_featured: false,
    featured_order: '',
    price: '',
    buy_url_amazon: '',
    buy_url_flipkart: '',
    buy_url_internal: '',
    image_homepage: '',
    image_product_page: '',
  });

  const hasAccess = isSuperAdmin || isAdmin || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    fetchData();
  }, [hasAccess]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, slotsRes] = await Promise.all([
        api.get('/v1/admin/products'),
        api.get('/v1/admin/products/featured-slots'),
      ]);
      setProducts(prodRes.data.data.products || []);
      setSlots(slotsRes.data.data.slots || []);
    } catch (error) {
      toast.error('Failed to load products or slots data');
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate (soft-delete) this product?')) return;
    try {
      await api.delete(`/v1/admin/products/${id}`);
      toast.success('Product soft-deleted successfully (set to inactive)');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleActiveToggle = async (product: Product) => {
    try {
      const nextActive = !product.is_active;
      await api.put(`/v1/admin/products/${product.id}`, {
        is_active: nextActive,
      });
      toast.success(`Product is now ${nextActive ? 'active' : 'inactive'}`);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to toggle product status');
    }
  };

  const handleFeatureToggle = async (product: Product) => {
    try {
      const nextFeatured = !product.is_featured;
      let nextSlot: number | null = null;

      if (nextFeatured) {
        if (!product.image_homepage) {
          toast.error('Upload a large Homepage cover image before featuring this product.');
          openModal(product);
          return;
        }
        // Find first empty slot
        const filledSlots = slots.filter(s => s.product !== null).map(s => s.slot);
        const emptySlot = [1, 2, 3].find(s => !filledSlots.includes(s));
        if (!emptySlot) {
          toast.error('All 3 slots are occupied. Unfeature a product first.');
          return;
        }
        nextSlot = emptySlot;
      }

      await api.patch(`/v1/admin/products/${product.id}/feature`, {
        is_featured: nextFeatured,
        featured_order: nextSlot,
      });
      toast.success(`Homepage slot updated`);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update slot');
    }
  };

  const handleSlotRemove = async (productId: string) => {
    try {
      await api.patch(`/v1/admin/products/${productId}/feature`, {
        is_featured: false,
      });
      toast.success('Product removed from homepage slot');
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to remove from slot');
    }
  };

  const handleSlotAssign = async (slotNum: number, productId: string) => {
    if (!productId) return;
    const product = products.find((p) => p.id === productId);
    if (product && !product.image_homepage) {
      toast.error('Upload a large Homepage cover image before assigning this product to a slot.');
      openModal(product);
      setAssigningSlot(null);
      return;
    }
    try {
      await api.patch(`/v1/admin/products/${productId}/feature`, {
        is_featured: true,
        featured_order: slotNum,
      });
      toast.success(`Slot ${slotNum} assigned successfully`);
      setAssigningSlot(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to assign slot');
    }
  };

  const handleNameChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: formData.name,
        slug: formData.slug,
        category: String(formData.category || 'book').toLowerCase().trim(),
        description: formData.description,
        short_description: formData.short_description,
        is_active: formData.is_active,
        image_homepage: formData.image_homepage || null,
        image_product_page: formData.image_product_page || null,
      };

      if (payload.category === 'book') {
        payload.buy_url_amazon = formData.buy_url_amazon || null;
        payload.buy_url_flipkart = formData.buy_url_flipkart || null;
        payload.price = null;
        payload.buy_url_internal = null;
      } else {
        payload.price = Number(formData.price);
        payload.buy_url_internal = formData.buy_url_internal || null;
        payload.buy_url_amazon = null;
        payload.buy_url_flipkart = null;
      }

      if (editingProduct) {
        await api.put(`/v1/admin/products/${editingProduct.id}`, payload);
        toast.success('Product updated successfully');
      } else {
        await api.post('/v1/admin/products', payload);
        toast.success('Product created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to save product');
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description || '',
        short_description: product.short_description || '',
        is_active: product.is_active,
        is_featured: product.is_featured,
        featured_order: product.featured_order?.toString() || '',
        price: product.price?.toString() || '',
        buy_url_amazon: product.buy_url_amazon || '',
        buy_url_flipkart: product.buy_url_flipkart || '',
        buy_url_internal: product.buy_url_internal || '',
        image_homepage: product.image_homepage || '',
        image_product_page: product.image_product_page || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        slug: '',
        category: 'book',
        description: '',
        short_description: '',
        is_active: true,
        is_featured: false,
        featured_order: '',
        price: '',
        buy_url_amazon: '',
        buy_url_flipkart: '',
        buy_url_internal: '',
        image_homepage: '',
        image_product_page: '',
      });
    }
    setIsModalOpen(true);
  };

  if (!hasAccess) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Access Denied. Insufficient permissions.
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 text-white font-sans selection:bg-[#f26522]/30">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Dynamic Product CMS</h1>
          <p className="text-gray-400 text-sm mt-2">Manage Books, Courses, and Merchandise dynamically.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-white text-black hover:bg-[#f26522] hover:text-white rounded-none font-bold px-6 py-2">
          + Add Product
        </Button>
      </div>

      {/* Featured Slots Panel */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-[#f26522]">Homepage Slots Management (Max 3)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slots.map((slotItem) => (
            <div key={slotItem.slot} className="bg-[#141414] border border-white/10 p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="bg-white/10 text-xs px-2 py-1 uppercase font-bold tracking-wider mb-3 inline-block">
                  Slot {slotItem.slot}
                </span>
                
                {slotItem.product ? (
                  <div className="flex gap-4 items-center mt-2">
                    <div className="w-16 h-20 bg-black border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      {slotItem.product.image_homepage ? (
                        <MediaImage src={slotItem.product.image_homepage} alt={slotItem.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] text-gray-600">No Image</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white line-clamp-2 leading-tight">{slotItem.product.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Slug: {slotItem.product.slug}</p>
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-white/10 py-6 text-center text-gray-500 text-sm mt-2">
                    No product assigned to Slot {slotItem.slot}
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                {assigningSlot === slotItem.slot ? (
                  <div className="w-full space-y-2">
                    <select 
                      onChange={(e) => handleSlotAssign(slotItem.slot, e.target.value)} 
                      defaultValue=""
                      className="w-full bg-black border border-white/20 text-white p-2 text-sm focus:border-[#f26522] focus:outline-none"
                    >
                      <option value="" disabled>-- Select active product --</option>
                      {products
                        .filter(p => p.is_active && (!p.is_featured || p.featured_order !== slotItem.slot))
                        .map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
                        ))
                      }
                    </select>
                    <button 
                      onClick={() => setAssigningSlot(null)}
                      className="text-xs text-red-400 underline uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={() => setAssigningSlot(slotItem.slot)}
                      className="text-xs py-1.5 px-3 bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
                    >
                      Change
                    </Button>
                    {slotItem.product && (
                      <Button 
                        onClick={() => handleSlotRemove(slotItem.product!.id)}
                        className="text-xs py-1.5 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-none border border-red-500/20"
                      >
                        Remove
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product List Table */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-bold uppercase tracking-widest text-[#f26522]">All Products Catalog</h2>
        
        {loading ? (
          <div className="py-20 text-center text-gray-500">Loading catalog...</div>
        ) : products.length > 0 ? (
          <div className="bg-[#141414] border border-white/10 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 uppercase text-xs tracking-wider font-bold">
                  <th className="p-4">Thumbnail</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Active</th>
                  <th className="p-4">Featured Slot</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4">
                      <div className="w-10 h-12 bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                        {product.image_homepage ? (
                          <MediaImage src={product.image_homepage} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[8px] text-gray-600">No Image</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{product.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">{product.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider">
                        {product.category}
                      </span>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        {product.category === 'book'
                          ? '→ Books'
                          : product.category === 'course'
                            ? '→ Courses'
                            : product.category === 'merchandise'
                              ? '→ Merchandise'
                              : '→ Unknown section'}
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleActiveToggle(product)}
                        className={`text-xs px-2.5 py-1 uppercase font-bold tracking-wider border transition-colors ${
                          product.is_active 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-white' 
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleFeatureToggle(product)}
                        className={`text-xs px-2.5 py-1 uppercase font-bold tracking-wider border transition-colors ${
                          product.is_featured 
                            ? 'bg-[#f26522]/10 text-[#f26522] border-[#f26522]/20 hover:bg-[#f26522] hover:text-white' 
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {product.is_featured ? `Featured (Slot ${product.featured_order})` : 'Feature it'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button 
                        variant="outline"
                        className="text-xs py-1 px-3 bg-white/5 hover:bg-white/10 rounded-none border border-white/10"
                        onClick={() => openModal(product)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline"
                        className="text-xs py-1 px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-none border border-red-500/20"
                        onClick={() => handleSoftDelete(product.id)}
                      >
                        Deactivate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-white/10 bg-[#141414] py-16 text-center space-y-4">
            <p className="text-gray-400">No products found in the catalog.</p>
            <Button onClick={() => openModal()} className="bg-white text-black hover:bg-[#f26522] hover:text-white rounded-none font-bold px-6">
              Create First Product
            </Button>
          </div>
        )}
      </div>

      {/* Form Modal (Create / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#141414] border border-white/10 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="shrink-0 bg-[#141414] p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-xl leading-none">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Product Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => handleNameChange(e.target.value)} 
                    className={FIELD_CLASS}
                    placeholder="Enter product title"
                  />
                </div>

                {/* Slug */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Slug (URL-safe)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.slug} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} 
                    className={FIELD_CLASS}
                    placeholder="product-slug"
                  />
                </div>

                {/* Category — controls which Products page section this appears in */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">
                    Product Type (where it appears on /products)
                  </label>
                  <p className="text-xs text-zinc-500 mb-3">
                    Choose one. The item will only show in that section on the public Products page.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'book', label: 'Book', hint: 'Shows only under Books' },
                      { value: 'course', label: 'Course', hint: 'Shows only under Courses' },
                      { value: 'merchandise', label: 'Merchandise', hint: 'Shows only under Merchandise' },
                    ].map((opt) => {
                      const selected = formData.category === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: opt.value })}
                          className={`text-left px-4 py-3 border rounded-lg transition-all ${
                            selected
                              ? 'border-[#f26522] bg-[#f26522]/10 ring-1 ring-[#f26522]/40'
                              : 'border-white/10 bg-zinc-950 hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                selected ? 'border-[#f26522]' : 'border-zinc-600'
                              }`}
                            >
                              {selected && <span className="w-2 h-2 rounded-full bg-[#f26522]" />}
                            </span>
                            <span className="text-sm font-bold text-white">{opt.label}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-5">{opt.hint}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="md:col-span-2 flex items-center">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.is_active} 
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})} 
                      className="w-5 h-5 bg-black border border-white/20 text-[#f26522] focus:ring-0 cursor-pointer" 
                    />
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-300">Is Active / Visible on site</span>
                  </label>
                </div>

                {/* Tagline / Short Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Short Tagline (Homepage Card)</label>
                  <input 
                    type="text" 
                    value={formData.short_description} 
                    onChange={(e) => setFormData({...formData, short_description: e.target.value})} 
                    className={FIELD_CLASS}
                    placeholder="Enter short tagline"
                  />
                </div>

                {/* Full Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Full Description (Product Page)</label>
                  <textarea 
                    required 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    className={`${FIELD_CLASS} h-32 resize-none`}
                    placeholder="Enter full product details"
                  />
                </div>

                {/* Dynamic Category Fields */}
                {formData.category === 'book' ? (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Amazon Buy URL (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.buy_url_amazon} 
                        onChange={(e) => setFormData({...formData, buy_url_amazon: e.target.value})} 
                        className={FIELD_CLASS}
                        placeholder="https://amazon.com/..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Flipkart Buy URL (Optional)</label>
                      <input 
                        type="url" 
                        value={formData.buy_url_flipkart} 
                        onChange={(e) => setFormData({...formData, buy_url_flipkart: e.target.value})} 
                        className={FIELD_CLASS}
                        placeholder="https://flipkart.com/..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Price (INR)</label>
                      <input 
                        type="number" 
                        required 
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                        className={FIELD_CLASS}
                        placeholder="e.g. 999"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Internal Buy URL</label>
                      <input 
                        type="url" 
                        required 
                        value={formData.buy_url_internal} 
                        onChange={(e) => setFormData({...formData, buy_url_internal: e.target.value})} 
                        className={FIELD_CLASS}
                        placeholder="https://yoursite.com/checkout/..."
                      />
                    </div>
                  </>
                )}

                {/* Dual image uploads: available while creating and editing */}
                <div className="md:col-span-2 border-t border-white/10 pt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#f26522]">Product Images</h3>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload both images here while adding the product. Homepage cover is needed for homepage slots (large ~1600×2000). Catalog image is used on the products page.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/40 border border-white/5 p-4">
                      <ImageUploadField
                        label="Homepage Cover (large)"
                        value={formData.image_homepage}
                        folder="products/homepage"
                        previewClassName="h-36 w-28"
                        onChange={(url) => setFormData((prev) => ({ ...prev, image_homepage: url }))}
                      />
                    </div>
                    <div className="bg-black/40 border border-white/5 p-4">
                      <ImageUploadField
                        label="Catalog / Product Page Image"
                        value={formData.image_product_page}
                        folder="products/product_page"
                        previewClassName="h-36 w-28"
                        onChange={(url) => setFormData((prev) => ({ ...prev, image_product_page: url }))}
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)} 
                  className="rounded-none border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-none bg-[#f26522] hover:bg-[#d95a1e] text-white font-bold px-6"
                >
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
