import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const { audience, featured } = req.query;
    
    let programs = await db.program.findMany();
    
    // Apply filters
    if (audience) {
      programs = programs.filter(p => p.targetAudience.includes(audience as string));
    }
    
    if (featured === 'true') {
      programs = programs.filter(p => p.isFeatured);
    }
    
    // Filter active programs only
    programs = programs.filter(p => p.isActive);
    
    sendSuccess(res, { programs });
  } catch (error) {
    console.error('Get programs error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getProgramById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const program = await db.program.findUnique({ where: { id } });
    
    if (!program) {
      return sendError(res, 'Program not found', 404);
    }
    
    sendSuccess(res, { program });
  } catch (error) {
    console.error('Get program error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createProgram = async (req: Request, res: Response) => {
  try {
    const programData = req.body;
    const program = await db.program.create({ data: programData });
    sendSuccess(res, { program }, 'Program created successfully');
  } catch (error) {
    console.error('Create program error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const program = await db.program.update({ where: { id }, data: updateData });
    sendSuccess(res, { program }, 'Program updated successfully');
  } catch (error) {
    console.error('Update program error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.program.delete({ where: { id } });
    sendSuccess(res, null, 'Program deleted successfully');
  } catch (error) {
    console.error('Delete program error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const enrollInProgram = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { userId } = req.body;
    
    // This would normally create an enrollment and initiate payment
    sendSuccess(res, { 
      enrollmentId: Math.random().toString(36).substr(2, 9),
      message: 'Enrollment initiated. Please complete payment to confirm.' 
    });
  } catch (error) {
    console.error('Enroll in program error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
