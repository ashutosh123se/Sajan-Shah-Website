import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getAllInitiatives = async (_req: Request, res: Response) => {
  try {
    const initiatives = await db.initiative.findMany({
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { initiatives });
  } catch (error) {
    console.error('Get all initiatives error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getInitiatives = async (req: Request, res: Response) => {
  try {
    const initiatives = await db.initiative.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { initiatives });
  } catch (error) {
    console.error('Get initiatives error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createInitiative = async (req: Request, res: Response) => {
  try {
    const { title, slug, description, imageUrl, stats, linkUrl, order, isActive } = req.body;

    if (!title || !slug || !description) {
      return sendError(res, 'Title, slug, and description are required fields.', 400);
    }

    // Check for duplicate slug
    const existing = await db.initiative.findUnique({ where: { slug } });
    if (existing) {
      return sendError(res, `An initiative with slug "${slug}" already exists. Please use a different slug.`, 400);
    }

    const initiative = await db.initiative.create({
      data: {
        title,
        slug,
        description,
        imageUrl: imageUrl || null,
        stats: stats || null,
        linkUrl: linkUrl || null,
        order: Number(order) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      }
    });
    sendSuccess(res, { initiative }, 'Initiative created successfully');
  } catch (error: any) {
    console.error('Create initiative error:', error);
    const message = error?.code === 'P2002'
      ? 'An initiative with this slug already exists.'
      : error?.message || 'Internal server error';
    sendError(res, message, 500);
  }
};

export const updateInitiative = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const initiative = await db.initiative.update({ where: { id }, data: updateData });
    sendSuccess(res, { initiative }, 'Initiative updated successfully');
  } catch (error) {
    console.error('Update initiative error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteInitiative = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.initiative.delete({ where: { id } });
    sendSuccess(res, null, 'Initiative deleted successfully');
  } catch (error) {
    console.error('Delete initiative error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
