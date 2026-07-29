import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { uploadImage } from '../utils/imageStorage';

// GET /api/v1/admin/products (Admin - includes inactive)
export const getAllProductsAdmin = async (req: Request, res: Response) => {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return sendSuccess(res, { products });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// GET /api/v1/products (Public)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.product.findMany({
      where: { is_active: true },
      orderBy: { createdAt: 'desc' },
    });
    return sendSuccess(res, { products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// GET /api/v1/products/featured (Public)
export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.product.findMany({
      where: {
        is_featured: true,
        is_active: true,
      },
      orderBy: { featured_order: 'asc' },
      take: 3,
    });
    return sendSuccess(res, { products });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// GET /api/v1/products/:slug (Public)
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await db.product.findUnique({
      where: { slug: slug as string },
    });

    if (!product || !product.is_active) {
      return sendError(res, 'Product not found', 404);
    }

    return sendSuccess(res, { product });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// POST /api/v1/admin/products (Admin)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      category,
      description,
      short_description,
      is_active,
      is_featured,
      featured_order,
      price,
      buy_url_amazon,
      buy_url_flipkart,
      buy_url_internal,
      image_homepage,
      image_product_page,
    } = req.body;

    // 1. Validate Category-specific Fields
    if (category === 'course' || category === 'merchandise') {
      if (price === undefined || price === null || price === '') {
        return sendError(res, 'Courses and merchandise require a price.', 400);
      }
    } else if (category !== 'book') {
      return sendError(res, "Category must be 'book', 'course', or 'merchandise'.", 400);
    }

    // 2. Validate is_featured and active rules
    const active = is_active !== undefined ? Boolean(is_active) : true;
    const featured = is_featured !== undefined ? Boolean(is_featured) : false;
    let slot = featured_order ? Number(featured_order) : null;

    if (featured) {
      if (!active) {
        return sendError(res, 'A product must be active to be featured on the homepage.', 400);
      }
      if (!image_homepage) {
        return sendError(
          res,
          'Upload a large Homepage cover image before featuring this product on the homepage.',
          400
        );
      }
      if (!slot || ![1, 2, 3].includes(slot)) {
        return sendError(res, 'Featured products must be assigned to slot 1, 2, or 3.', 400);
      }

      // Check slot availability
      const existingInSlot = await db.product.findFirst({
        where: { is_featured: true, featured_order: slot },
      });
      if (existingInSlot) {
        return sendError(res, `Slot ${slot} is already occupied by "${existingInSlot.name}". Unfeature it first.`, 400);
      }

      // Check total featured count
      const featuredCount = await db.product.count({ where: { is_featured: true } });
      if (featuredCount >= 3) {
        return sendError(res, 'Cannot feature more than 3 products at the same time.', 400);
      }
    } else {
      slot = null;
    }

    const uniqueSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Check slug uniqueness
    const existingSlug = await db.product.findUnique({ where: { slug: uniqueSlug } });
    if (existingSlug) {
      return sendError(res, 'A product with this slug already exists.', 400);
    }

    const product = await db.product.create({
      data: {
        name,
        slug: uniqueSlug,
        category,
        description,
        short_description: short_description || null,
        is_active: active,
        is_featured: featured,
        featured_order: slot,
        price: price !== undefined ? Number(price) : null,
        buy_url_amazon: buy_url_amazon || null,
        buy_url_flipkart: buy_url_flipkart || null,
        buy_url_internal: buy_url_internal || null,
        image_homepage: image_homepage || null,
        image_product_page: image_product_page || null,
      },
    });

    return sendSuccess(res, { product }, 'Product created successfully');
  } catch (error) {
    console.error('Error creating product:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// PUT /api/v1/admin/products/:id (Admin)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      category,
      description,
      short_description,
      is_active,
      is_featured,
      featured_order,
      price,
      buy_url_amazon,
      buy_url_flipkart,
      buy_url_internal,
      image_homepage,
      image_product_page,
    } = req.body;

    const existingProduct = await db.product.findUnique({ where: { id: id as string } });
    if (!existingProduct) {
      return sendError(res, 'Product not found', 404);
    }

    const nextCategory = category || existingProduct.category;

    // Validate Category-specific Fields
    if (nextCategory === 'course' || nextCategory === 'merchandise') {
      if (price === undefined && existingProduct.price === null) {
        return sendError(res, 'Courses and merchandise require a price.', 400);
      }
    }

    // Determine target active/featured status
    let active = is_active !== undefined ? Boolean(is_active) : existingProduct.is_active;
    let featured = is_featured !== undefined ? Boolean(is_featured) : existingProduct.is_featured;
    let slot = featured_order !== undefined ? (featured_order ? Number(featured_order) : null) : existingProduct.featured_order;

    if (!active) {
      // Removing or deactivating a featured product automatically clears its slot
      featured = false;
      slot = null;
    }

    if (featured) {
      if (!active) {
        return sendError(res, 'A product must be active to be featured.', 400);
      }
      const nextHomepageImage =
        image_homepage !== undefined ? image_homepage : existingProduct.image_homepage;
      if (!nextHomepageImage) {
        return sendError(
          res,
          'Upload a large Homepage cover image before featuring this product on the homepage.',
          400
        );
      }
      if (!slot || ![1, 2, 3].includes(slot)) {
        return sendError(res, 'Featured products must be assigned to slot 1, 2, or 3.', 400);
      }

      // Check slot availability (excluding current product)
      const existingInSlot = await db.product.findFirst({
        where: {
          is_featured: true,
          featured_order: slot,
          id: { not: id as string },
        },
      });
      if (existingInSlot) {
        return sendError(res, `Slot ${slot} is already occupied by "${existingInSlot.name}". Unfeature it first.`, 400);
      }
    } else {
      slot = null;
    }

    const uniqueSlug = slug || existingProduct.slug;
    if (uniqueSlug !== existingProduct.slug) {
      const existingSlug = await db.product.findFirst({
        where: { slug: uniqueSlug, id: { not: id as string } },
      });
      if (existingSlug) {
        return sendError(res, 'A product with this slug already exists.', 400);
      }
    }

    const product = await db.product.update({
      where: { id: id as string },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        slug: uniqueSlug,
        category: nextCategory,
        description: description !== undefined ? description : existingProduct.description,
        short_description: short_description !== undefined ? short_description : existingProduct.short_description,
        is_active: active,
        is_featured: featured,
        featured_order: slot,
        price: price !== undefined ? (price !== null ? Number(price) : null) : existingProduct.price,
        buy_url_amazon: buy_url_amazon !== undefined ? buy_url_amazon : existingProduct.buy_url_amazon,
        buy_url_flipkart: buy_url_flipkart !== undefined ? buy_url_flipkart : existingProduct.buy_url_flipkart,
        buy_url_internal: buy_url_internal !== undefined ? buy_url_internal : existingProduct.buy_url_internal,
        image_homepage: image_homepage !== undefined ? image_homepage : existingProduct.image_homepage,
        image_product_page: image_product_page !== undefined ? image_product_page : existingProduct.image_product_page,
      },
    });

    return sendSuccess(res, { product }, 'Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// DELETE /api/v1/admin/products/:id (Admin — Soft delete)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Soft delete: set active = false, featured = false, order = null
    const product = await db.product.update({
      where: { id: id as string },
      data: {
        is_active: false,
        is_featured: false,
        featured_order: null,
      },
    });

    return sendSuccess(res, { product }, 'Product soft-deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// PATCH /api/v1/admin/products/:id/feature (Admin)
export const featureProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_featured, featured_order } = req.body;

    const product = await db.product.findUnique({ where: { id: id as string } });
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }

    const nextFeatured = Boolean(is_featured);
    let nextSlot = featured_order ? Number(featured_order) : null;

    if (nextFeatured) {
      if (!product.is_active) {
        return sendError(res, 'Only active products can be featured on the homepage.', 400);
      }
      if (!product.image_homepage) {
        return sendError(
          res,
          'Upload a large Homepage cover image before assigning this product to a homepage slot.',
          400
        );
      }
      if (!nextSlot || ![1, 2, 3].includes(nextSlot)) {
        return sendError(res, 'Featured products must be assigned to slot 1, 2, or 3.', 400);
      }

      // Check slot occupancy
      const existingInSlot = await db.product.findFirst({
        where: {
          is_featured: true,
          featured_order: nextSlot,
          id: { not: id as string },
        },
      });
      if (existingInSlot) {
        return sendError(res, `Slot ${nextSlot} is already occupied by "${existingInSlot.name}". Unfeature it first.`, 400);
      }

      // Check total limit
      const featuredCount = await db.product.count({
        where: {
          is_featured: true,
          id: { not: id as string },
        },
      });
      if (featuredCount >= 3) {
        return sendError(res, 'Cannot feature more than 3 products at the same time.', 400);
      }
    } else {
      nextSlot = null;
    }

    const updatedProduct = await db.product.update({
      where: { id: id as string },
      data: {
        is_featured: nextFeatured,
        featured_order: nextSlot,
      },
    });

    return sendSuccess(res, { product: updatedProduct }, 'Homepage featured status updated successfully');
  } catch (error) {
    console.error('Error updating feature status:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// GET /api/v1/admin/products/featured-slots (Admin)
export const getFeaturedSlots = async (req: Request, res: Response) => {
  try {
    const slots = [1, 2, 3];
    const featuredProducts = await db.product.findMany({
      where: { is_featured: true, featured_order: { in: slots } },
    });

    const result = slots.map((slot) => {
      const prod = featuredProducts.find((p) => p.featured_order === slot);
      return {
        slot,
        product: prod
          ? {
              id: prod.id,
              name: prod.name,
              image_homepage: prod.image_homepage,
              slug: prod.slug,
            }
          : null,
      };
    });

    return sendSuccess(res, { slots: result });
  } catch (error) {
    console.error('Error fetching featured slots:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// POST /api/v1/admin/products/:id/upload-homepage-image (Admin)
export const uploadHomepageImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return sendError(res, 'No image file uploaded.', 400);
    }

    const product = await db.product.findUnique({ where: { id: id as string } });
    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    const imageUrl = await uploadImage(
      req.file.buffer,
      'products/homepage',
      req.file.originalname
    );

    const updatedProduct = await db.product.update({
      where: { id: id as string },
      data: { image_homepage: imageUrl },
    });

    return sendSuccess(res, { imageUrl, product: updatedProduct }, 'Homepage cover uploaded successfully');
  } catch (error) {
    console.error('Error uploading homepage image:', error);
    return sendError(res, 'Internal server error', 500);
  }
};

// POST /api/v1/admin/products/:id/upload-product-image (Admin)
export const uploadProductImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return sendError(res, 'No image file uploaded.', 400);
    }

    const product = await db.product.findUnique({ where: { id: id as string } });
    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    const imageUrl = await uploadImage(
      req.file.buffer,
      'products/product_page',
      req.file.originalname
    );

    const updatedProduct = await db.product.update({
      where: { id: id as string },
      data: { image_product_page: imageUrl },
    });

    return sendSuccess(res, { imageUrl, product: updatedProduct }, 'Product page image uploaded successfully');
  } catch (error) {
    console.error('Error uploading product image:', error);
    return sendError(res, 'Internal server error', 500);
  }
};
