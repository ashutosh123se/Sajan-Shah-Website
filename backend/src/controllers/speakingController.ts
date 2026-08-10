import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { normalizeJsonContent, toPrismaJson } from '../utils/jsonContent';

function withNormalizedContent<T extends { content?: unknown }>(section: T) {
  return { ...section, content: normalizeJsonContent(section.content) };
}

export const getSpeakingSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.speakingPageSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    sendSuccess(res, { sections: sections.map(withNormalizedContent) });
  } catch (error) {
    console.error('Get speaking sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllSpeakingSections: any = async (req: Request, res: Response) => {
  try {
    const sections = await db.speakingPageSection.findMany({
      orderBy: { order: 'asc' },
    });
    sendSuccess(res, { sections: sections.map(withNormalizedContent) });
  } catch (error) {
    console.error('Get all speaking sections error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateSpeakingSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, order, isActive } = req.body;

    const section = await db.speakingPageSection.update({
      where: { id: id as string },
      data: {
        title,
        content: toPrismaJson(content),
        order: order !== undefined ? Number(order) : undefined,
        isActive: isActive !== undefined ? Boolean(isActive) : undefined,
      },
    });

    sendSuccess(res, { section: withNormalizedContent(section) }, 'Section updated successfully');
  } catch (error) {
    console.error('Update speaking section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createSpeakingSection: any = async (req: Request, res: Response) => {
  try {
    const { key, title, content, order, isActive } = req.body;

    const section = await db.speakingPageSection.create({
      data: {
        key,
        title,
        content: toPrismaJson(content),
        order: order !== undefined ? Number(order) : 0,
        isActive: isActive ?? true,
      },
    });

    sendSuccess(res, { section: withNormalizedContent(section) }, 'Section created successfully');
  } catch (error) {
    console.error('Create speaking section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteSpeakingSection: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.speakingPageSection.delete({ where: { id: id as string } });
    sendSuccess(res, null, 'Section deleted successfully');
  } catch (error) {
    console.error('Delete speaking section error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
