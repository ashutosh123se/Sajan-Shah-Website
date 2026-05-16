import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = '1', limit = '12', sort, featured, inStock, isActive } = req.query;
    
    // Build query
    const where: any = {};
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (inStock === 'true') {
      where.stock = { gt: 0 };
      where.isActive = true;
    }

    if (isActive === 'true') {
      where.isActive = true;
    } else if (isActive === 'false') {
      where.isActive = false;
    }
    
    let products = await db.product.findMany({ where });
    
    // Apply sorting
    if (sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // Apply pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    sendSuccess(res, {
      products: paginatedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: products.length,
        pages: Math.ceil(products.length / limitNum)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await db.product.findUnique({ where: { id } });
    
    if (!product) {
      return sendError(res, 'Product not found', 404);
    }
    
    sendSuccess(res, { product });
  } catch (error) {
    console.error('Get product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, imageUrl, category, stock, slug, currency, isActive, isFeatured } = req.body;
    
    console.log('Attempting to create product:', { title, category, price });

    const product = await db.product.create({ 
      data: { 
        title, 
        description, 
        price: Number(price), 
        imageUrl, 
        category,
        stock: stock ? Number(stock) : 0,
        slug: slug || `${title.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
        currency: currency || 'INR',
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false
      } 
    });

    sendSuccess(res, { product }, 'Product created successfully');
  } catch (error: any) {
    console.error('Detailed Create product error:', error);
    // Return a more descriptive error if possible
    let errorMessage = 'Failed to create product';
    if (error.code === 'P2002') {
      errorMessage = 'A product with this name or slug already exists.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    sendError(res, errorMessage, 500);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const product = await db.product.update({ where: { id }, data: updateData });
    sendSuccess(res, { product }, 'Product updated successfully');
  } catch (error) {
    console.error('Update product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.product.delete({ where: { id } });
    sendSuccess(res, null, 'Product deleted successfully');
  } catch (error) {
    console.error('Delete product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
