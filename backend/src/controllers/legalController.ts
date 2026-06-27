import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getLegalPages = async (req: Request, res: Response) => {
  try {
    const legalPages = await db.legalPage.findMany({
      orderBy: { slug: 'asc' },
    });
    sendSuccess(res, { legalPages });
  } catch (error) {
    console.error('Get legal pages error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getLegalPageBySlug = async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

    const legalPage = await db.legalPage.findUnique({ where: { slug } });
    if (!legalPage) {
      return sendError(res, 'Legal page not found', 404);
    }

    sendSuccess(res, { legalPage });
  } catch (error) {
    console.error('Get legal page error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateLegalPage = async (req: Request, res: Response) => {
  try {
    const slugParam = req.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const { title, content } = req.body;

    if (!title || !content) {
      return sendError(res, 'Title and content are required', 400);
    }

    const legalPage = await db.legalPage.upsert({
      where: { slug },
      update: { title, content },
      create: { slug, title, content },
    });

    sendSuccess(res, { legalPage }, 'Legal page updated successfully');
  } catch (error) {
    console.error('Update legal page error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
