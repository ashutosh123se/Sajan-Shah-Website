import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getContributors = async (req: Request, res: Response) => {
  try {
    // This would normally fetch from database
    const contributors = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        photoUrl: 'https://via.placeholder.com/150',
        role: 'Educational Psychologist',
        description: 'Expert in learning methodologies and cognitive development',
        order: 1
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        photoUrl: 'https://via.placeholder.com/150',
        role: 'Neuroscience Researcher',
        description: 'Specialist in memory enhancement techniques',
        order: 2
      }
    ];
    
    sendSuccess(res, { contributors });
  } catch (error) {
    console.error('Get contributors error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createContributor = async (req: Request, res: Response) => {
  try {
    const contributorData = req.body;
    sendSuccess(res, { contributor: { ...contributorData, id: Math.random().toString(36).substr(2, 9) } }, 'Contributor created successfully');
  } catch (error) {
    console.error('Create contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateContributor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    sendSuccess(res, { contributor: { ...updateData, id } }, 'Contributor updated successfully');
  } catch (error) {
    console.error('Update contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteContributor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    sendSuccess(res, null, 'Contributor deleted successfully');
  } catch (error) {
    console.error('Delete contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
