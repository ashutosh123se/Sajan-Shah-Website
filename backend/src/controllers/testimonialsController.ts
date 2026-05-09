import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query;
    
    // This would normally fetch from database
    const testimonials = [
      {
        id: '1',
        name: 'Rahul Kumar',
        designation: 'Student',
        organization: 'Delhi Public School',
        photoUrl: 'https://via.placeholder.com/150',
        quote: 'Sajan Shah\'s memory techniques transformed my academic performance completely!',
        isActive: true,
        order: 1
      },
      {
        id: '2',
        name: 'Priya Sharma',
        designation: 'CEO',
        organization: 'Tech Innovations Pvt Ltd',
        photoUrl: 'https://via.placeholder.com/150',
        quote: 'The business program helped me scale my company to new heights.',
        isActive: true,
        order: 2
      }
    ];
    
    let filteredTestimonials = testimonials.filter(t => t.isActive);
    
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
    sendSuccess(res, { testimonial: { ...testimonialData, id: Math.random().toString(36).substr(2, 9) } }, 'Testimonial created successfully');
  } catch (error) {
    console.error('Create testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    sendSuccess(res, { testimonial: { ...updateData, id } }, 'Testimonial updated successfully');
  } catch (error) {
    console.error('Update testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    sendSuccess(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    console.error('Delete testimonial error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
