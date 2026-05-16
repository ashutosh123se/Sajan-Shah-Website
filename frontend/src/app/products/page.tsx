'use client';

import React from 'react';
import { ProductsHero } from '@/components/sections/products/ProductsHero';
import { ProductsEcosystem } from '@/components/sections/products/ProductsEcosystem';
import { ProductsBulkOrders } from '@/components/sections/products/ProductsBulkOrders';
import { ProductsBooks } from '@/components/sections/products/ProductsBooks';
import { ProductsCourses } from '@/components/sections/products/ProductsCourses';
import { ProductsMerchandise } from '@/components/sections/products/ProductsMerchandise';
import { ProductCategories } from '@/components/sections/products/ProductCategories';
import { ProductsTransformation } from '@/components/sections/products/ProductsTransformation';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section with Stats */}
      <ProductsHero />

      {/* Brand Ecosystem Intro */}
      <ProductsEcosystem />

      {/* Bulk Orders Section - Moved Up */}
      <ProductsBulkOrders />

      {/* Product Categories (3D Flip Cards) */}
      <ProductCategories />

      {/* Detailed Books Section */}
      <ProductsBooks />

      {/* Detailed Courses Section */}
      <ProductsCourses />

      {/* Detailed Merchandise Section */}
      <ProductsMerchandise />

      {/* Transformation Stories Slider */}
      <ProductsTransformation />
    </main>
  );
}
