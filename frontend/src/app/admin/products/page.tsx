'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import api from '@/lib/api';

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  imageUrl?: string;
  stock?: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProductsPage() {
  const { isSuperAdmin, isAdmin, isShopManager, isEditor } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    stock: '10',
    currency: 'INR',
    category: 'books',
    imageUrl: '',
    inStock: true,
    isFeatured: false,
  });

  const hasAccess = isSuperAdmin || isAdmin || isShopManager || isEditor;

  useEffect(() => {
    if (!hasAccess) return;
    fetchProducts();
  }, [hasAccess]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.data.products || []);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description || formData.title,
        price: Number(formData.price),
        currency: formData.currency,
        category: formData.category,
        imageUrl: formData.imageUrl,
        stock: Number(formData.stock),
        images: [],
        tags: [],
        isActive: formData.inStock,
        isFeatured: formData.isFeatured,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to save product';
      toast.error(message);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        slug: product.slug,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock?.toString() || '0',
        currency: product.currency || 'INR',
        category: product.category || 'books',
        imageUrl: product.imageUrl || '',
        inStock: product.isActive,
        isFeatured: product.isFeatured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        price: '',
        stock: '10',
        currency: 'INR',
        category: 'books',
        imageUrl: '',
        inStock: true,
        isFeatured: false,
      });
    }
    setIsModalOpen(true);
  };

  if (!hasAccess) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products Store</h1>
          <p className="text-gray-400 text-sm mt-1">Manage physical and digital products (books, merch, etc.).</p>
        </div>
        <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none font-medium">
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-400">Loading products...</div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-[#1a1a1a] border border-white/10 rounded-none flex flex-col hover:border-white/20 transition-all">
              <div className="aspect-square bg-[#222] p-4 relative flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-gray-600 text-sm">No Image</span>
                )}
                {product.isFeatured && (
                  <span className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">Featured</span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-bold text-white line-clamp-2 leading-tight mb-4">{product.title}</h3>
                
                <div className="mt-auto flex justify-between items-end mb-4">
                  <div className="text-xl font-bold text-white">₹{product.price}</div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${product.isActive && (product.stock || 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.isActive && (product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                      Qty: {product.stock || 0}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/5">
                  <Button variant="outline" className="flex-1 text-xs py-1 rounded-none border-white/10" onClick={() => openModal(product)}>Edit</Button>
                  <Button variant="outline" className="flex-1 text-xs py-1 rounded-none border-white/10 text-red-400 hover:bg-red-950/30" onClick={() => handleDelete(product.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center border border-white/10 bg-[#1a1a1a]">
            <p className="text-gray-400 text-lg mb-2">No products found</p>
            <Button onClick={() => openModal()} className="bg-white text-black hover:bg-gray-200 rounded-none">Add Product</Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#141414] p-6 border-b border-white/10 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Product Name</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Price (INR)</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3 h-32" />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3">
                    <option value="books">Books</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="courses">Courses</option>
                    <option value="posters">Posters</option>
                    <option value="bands">Bands</option>
                    <option value="ai">AI Tools</option>
                    <option value="bundles">Bundles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Stock Quantity</label>
                  <input type="number" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Image URL</label>
                  <input type="url" required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-[#222] border border-white/10 text-white px-4 py-3" />
                </div>

                <div className="col-span-2 flex gap-6 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.inStock} onChange={(e) => setFormData({...formData, inStock: e.target.checked})} className="w-5 h-5 bg-[#222] text-brand-orange focus:ring-0" />
                    <span className="text-sm text-gray-300">In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-5 h-5 bg-[#222] text-brand-orange focus:ring-0" />
                    <span className="text-sm text-gray-300">Featured</span>
                  </label>
                </div>
              </div>

              <div className="pt-8 flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none border-white/10 text-white hover:bg-white/5">Cancel</Button>
                <Button type="submit" className="rounded-none bg-white text-black hover:bg-gray-200">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
