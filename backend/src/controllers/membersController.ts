import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { tier } = req.query;
    
    // This would normally fetch from database
    let members: any[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        photoUrl: 'https://via.placeholder.com/150',
        bio: 'Passionate learner and mentor',
        tier: 'Gold',
        joinedAt: new Date('2023-01-15')
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        photoUrl: 'https://via.placeholder.com/150',
        bio: 'Educational enthusiast',
        tier: 'Silver',
        joinedAt: new Date('2023-03-20')
      }
    ];
    
    if (tier) {
      members = members.filter(m => m.tier === tier);
    }
    
    sendSuccess(res, { members });
  } catch (error) {
    console.error('Get members error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // This would normally fetch from database
    
    const member = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      photoUrl: 'https://via.placeholder.com/150',
      bio: 'Passionate learner and mentor',
      tier: 'Gold',
      joinedAt: new Date('2023-01-15')
    };
    
    sendSuccess(res, { member });
  } catch (error) {
    console.error('Get member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const memberData = req.body;
    sendSuccess(res, { member: { ...memberData, id: Math.random().toString(36).substr(2, 9) } }, 'Member created successfully');
  } catch (error) {
    console.error('Create member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    sendSuccess(res, { member: { ...updateData, id } }, 'Member updated successfully');
  } catch (error) {
    console.error('Update member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    sendSuccess(res, null, 'Member deleted successfully');
  } catch (error) {
    console.error('Delete member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const applyForMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, bio, whyJoin } = req.body;
    
    // Validate required fields
    if (!name || !email || !bio || !whyJoin) {
      return sendError(res, 'All fields are required', 400);
    }
    
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      bio,
      whyJoin,
      status: 'PENDING',
      appliedAt: new Date()
    };
    
    // TODO: Send admin alert email
    
    sendSuccess(res, { application }, 'Application submitted successfully');
  } catch (error) {
    console.error('Apply for member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
