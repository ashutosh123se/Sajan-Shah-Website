import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { Prisma } from '@prisma/client';

export const getHomePageSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.homePageSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get home page sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllHomePageSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.homePageSection.findMany({
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get all home page sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateHomePageSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, order, isActive } = req.body;

    const section = await db.homePageSection.update({
      where: { id: id as string },
      data: {
        title,
        content: content as Prisma.InputJsonValue,
        order: order !== undefined ? Number(order) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined
      }
    });

    sendSuccess(res, { section }, 'Section updated successfully');
  } catch (error) {
    console.error('Update home page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createHomePageSection: any = async (req: Request, res: Response) => {
  try {
    const { key, title, content, order, isActive } = req.body;

    const section = await db.homePageSection.create({
      data: {
        key,
        title,
        content: content as Prisma.InputJsonValue,
        order: order !== undefined ? Number(order) : 0,
        isActive: isActive ?? true
      }
    });

    sendSuccess(res, { section }, 'Section created successfully');
  } catch (error) {
    console.error('Create home page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteHomePageSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.homePageSection.delete({ where: { id: id as string } });
    sendSuccess(res, null, 'Section deleted successfully');
  } catch (error) {
    console.error('Delete home page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
