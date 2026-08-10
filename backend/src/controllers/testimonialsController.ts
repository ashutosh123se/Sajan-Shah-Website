import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getAllTestimonials = async (_req: Request, res: Response) => {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { order: 'asc' },
    });
    sendSuccess(res, { testimonials });
  } catch (error) {
    console.error('Get all testimonials error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    
    const testimonials = await db.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    
    let filteredTestimonials = testimonials;
    
    if (limit) {
      filteredTestimonials = filteredTestimonials.slice(0, parseInt(limit as string));
    }
    
    sendSuccess(res, { testimonials: filteredTestimonials });
  } catch (error) {
    console.error('Get testimonials error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonialData = req.body;
    const testimonial = await db.testimonial.create({ data: testimonialData });
    sendSuccess(res, { testimonial }, 'Testimonial created successfully');
  } catch (error) {
    console.error('Create testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const testimonial = await db.testimonial.update({ where: { id }, data: updateData });
    sendSuccess(res, { testimonial }, 'Testimonial updated successfully');
  } catch (error) {
    console.error('Update testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.testimonial.delete({ where: { id } });
    sendSuccess(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    console.error('Delete testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
