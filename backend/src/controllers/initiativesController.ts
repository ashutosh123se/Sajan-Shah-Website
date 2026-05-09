import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getInitiatives = async (req: Request, res: Response) => {
  try {
    // This would normally fetch from database
    const initiatives = [
      {
        id: '1',
        title: 'United First Festival',
        slug: 'united-first-festival',
        description: 'Uniting youth from across communities',
        imageUrl: 'https://via.placeholder.com/300',
        stats: '10,000+ participants',
        order: 1,
        isActive: true
      },
      {
        id: '2',
        title: 'YMF – Youth Motivation Forum',
        slug: 'ymf',
        description: 'Annual forum empowering thousands of youth',
        imageUrl: 'https://via.placeholder.com/300',
        stats: '50+ schools reached',
        order: 2,
        isActive: true
      }
    ];
    
    sendSuccess(res, { initiatives });
  } catch (error) {
    console.error('Get initiatives error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createInitiative = async (req: Request, res: Response) => {
  try {
    const initiativeData = req.body;
    sendSuccess(res, { initiative: { ...initiativeData, id: Math.random().toString(36).substr(2, 9) } }, 'Initiative created successfully');
  } catch (error) {
    console.error('Create initiative error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateInitiative = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    sendSuccess(res, { initiative: { ...updateData, id } }, 'Initiative updated successfully');
  } catch (error) {
    console.error('Update initiative error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteInitiative = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    sendSuccess(res, null, 'Initiative deleted successfully');
  } catch (error) {
    console.error('Delete initiative error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
