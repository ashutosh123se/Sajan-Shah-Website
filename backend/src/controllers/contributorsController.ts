import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getContributors = async (req: Request, res: Response) => {
  try {
    const contributors = await db.contributor.findMany({
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { contributors });
  } catch (error) {
    console.error('Get contributors error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createContributor = async (req: Request, res: Response) => {
  try {
    const contributorData = req.body;
    const contributor = await db.contributor.create({ data: contributorData });
    sendSuccess(res, { contributor }, 'Contributor created successfully');
  } catch (error) {
    console.error('Create contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateContributor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const contributor = await db.contributor.update({ where: { id }, data: updateData });
    sendSuccess(res, { contributor }, 'Contributor updated successfully');
  } catch (error) {
    console.error('Update contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteContributor = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.contributor.delete({ where: { id } });
    sendSuccess(res, null, 'Contributor deleted successfully');
  } catch (error) {
    console.error('Delete contributor error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
