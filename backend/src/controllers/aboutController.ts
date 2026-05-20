import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';

import { Prisma } from '@prisma/client';

export const getAboutSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.aboutPageSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get about sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllAboutSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.aboutPageSection.findMany({
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get all about sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateAboutSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, order, isActive } = req.body;

    const section = await db.aboutPageSection.update({
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
    console.error('Update about section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createAboutSection: any = async (req: Request, res: Response) => {
  try {
    const { key, title, content, order, isActive } = req.body;

    const section = await db.aboutPageSection.create({
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
    console.error('Create about section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteAboutSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.aboutPageSection.delete({ where: { id: id as string } });
    sendSuccess(res, null, 'Section deleted successfully');
  } catch (error) {
    console.error('Delete about section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
