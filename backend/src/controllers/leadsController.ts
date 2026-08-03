import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, { leads });
  } catch (error) {
    console.error('Get all leads error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const lead = await db.lead.update({
      where: { id },
      data: { status }
    });

    sendSuccess(res, { lead }, 'Lead status updated');
  } catch (error) {
    console.error('Update lead status error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.lead.delete({ where: { id } });
    sendSuccess(res, null, 'Lead deleted');
  } catch (error) {
    console.error('Delete lead error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, source, data } = req.body;

    if (!name || !email) {
      return sendError(res, 'Name and email are required', 400);
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone,
        source,
        data: data ? (typeof data === 'string' ? data : JSON.stringify(data)) : null
      }
    });

    sendSuccess(res, { lead }, 'Lead captured successfully');
  } catch (error) {
    console.error('Create lead error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
