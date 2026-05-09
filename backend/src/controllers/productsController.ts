import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = '1', limit = '12', sort, featured } = req.query;
    
    let products = await db.productFindMany();
    
    // Apply filters
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }
    
    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }
    
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
    const { id } = req.params;
    const products = await db.productFindMany();
    const product = products.find(p => p.id === id);
    
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
    const productData = req.body;
    // This would normally create a product in the database
    sendSuccess(res, { product: { ...productData, id: Math.random().toString(36).substr(2, 9) } }, 'Product created successfully');
  } catch (error) {
    console.error('Create product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    // This would normally update the product in the database
    sendSuccess(res, { product: { ...updateData, id } }, 'Product updated successfully');
  } catch (error) {
    console.error('Update product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // This would normally soft delete the product in the database
    sendSuccess(res, null, 'Product deleted successfully');
  } catch (error) {
    console.error('Delete product error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
