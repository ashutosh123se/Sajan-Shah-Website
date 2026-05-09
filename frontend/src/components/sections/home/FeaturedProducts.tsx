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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular memory-enhancing products and resources
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="p-4">
                  {/* Category Badge */}
                  <div className="mb-3">
                    {getCategoryBadge(product.category)}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(product.price)}
                    </div>
                    {product.stock !== undefined && (
                      <div className={`text-sm px-2 py-1 rounded ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1"
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/products/${product.id}`}
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
            <p className="text-gray-500">No featured products available at the moment.</p>
          </div>
        )}

        {/* Shop All CTA */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/products'}
          >
            Shop All Products →
          </Button>
        </div>
      </div>
    </section>
  );
};
