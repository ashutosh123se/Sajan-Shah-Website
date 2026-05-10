import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = '1', limit = '12', sort, featured } = req.query;
    
    let products = await db.product.findMany();
    
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
    const productData = req.body;
    const product = await db.product.create({ data: productData });
    sendSuccess(res, { product }, 'Product created successfully');
  } catch (error) {
    console.error('Create product error:', error);
    sendError(res, 'Internal server error', 500);
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
