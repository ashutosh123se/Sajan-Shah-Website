'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import api from '@/lib/api';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  category: string;
  tags: string[];
  stock?: number;
  isActive: boolean;
  isFeatured: boolean;
}

export const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?featured=true&limit=4');
        setProducts(response.data.data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      books: 'bg-blue-100 text-blue-800',
      merchandise: 'bg-green-100 text-green-800',
      courses: 'bg-purple-100 text-purple-800',
      posters: 'bg-yellow-100 text-yellow-800',
      bands: 'bg-red-100 text-red-800',
      ai: 'bg-indigo-100 text-indigo-800',
      bundles: 'bg-pink-100 text-pink-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 uppercase tracking-tight">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Discover our most popular memory-enhancing products and resources
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-none border border-gray-200 p-4 animate-pulse">
                <div className="h-48 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-4 bg-gray-200 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-gray-200 rounded-none overflow-hidden hover:border-brand-orange transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col"
              >
                {/* Product Image */}
                <div className="h-56 bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Badge */}
                  <div className="mb-4">
                    {getCategoryBadge(product.category)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-brand-dark mb-2 uppercase tracking-wide line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-6 mt-auto pt-4 border-t border-gray-100">
                    <div className="text-2xl font-black text-brand-orange">
                      {formatPrice(product.price)}
                    </div>
                    {product.stock !== undefined && (
                      <div className={`text-xs px-2 py-1 rounded-sm uppercase tracking-widest font-bold ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full font-bold uppercase tracking-widest rounded-none"
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/products/${product.id}`}
                      className="w-full font-bold uppercase tracking-widest rounded-none"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available at the moment.</p>
          </div>
        )}

        {/* Shop All CTA */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            size="lg"
            className="font-bold uppercase tracking-widest px-8 py-4 rounded-none"
            onClick={() => window.location.href = '/products'}
          >
            Shop All Products →
          </Button>
        </div>
      </div>
    </section>
  );
};
