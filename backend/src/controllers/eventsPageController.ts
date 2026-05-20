import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';

import { Prisma } from '@prisma/client';

export const getEventsPageSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.eventsPageSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get events page sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllEventsPageSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.eventsPageSection.findMany({
      orderBy: { order: 'asc' }
    });
    sendSuccess(res, { sections });
  } catch (error) {
    console.error('Get all events page sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateEventsPageSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, order, isActive } = req.body;

    const section = await db.eventsPageSection.update({
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
    console.error('Update events page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createEventsPageSection: any = async (req: Request, res: Response) => {
  try {
    const { key, title, content, order, isActive } = req.body;

    const section = await db.eventsPageSection.create({
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
    console.error('Create events page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteEventsPageSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.eventsPageSection.delete({ where: { id: id as string } });
    sendSuccess(res, null, 'Section deleted successfully');
  } catch (error) {
    console.error('Delete events page section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
