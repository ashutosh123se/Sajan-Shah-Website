import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all active press articles
export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.pressArticle.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: { articles }
    });
  } catch (error: any) {
    console.error('Get Articles Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch press articles' });
  }
};

// Get all press articles (for admin)
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await prisma.pressArticle.findMany({
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: { articles }
    });
  } catch (error: any) {
    console.error('Get All Articles Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch press articles' });
  }
};

// Get single article
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const article = await prisma.pressArticle.findUnique({
      where: { id }
    });

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    res.status(200).json({
      success: true,
      data: { article }
    });
  } catch (error: any) {
    console.error('Get Article Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch article' });
  }
};

// Create new article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, source, thumbnail, url, date, isActive } = req.body;

    const newArticle = await prisma.pressArticle.create({
      data: {
        title,
        source,
        thumbnail,
        url,
        date: new Date(date),
        isActive: isActive ?? true
      }
    });

    res.status(201).json({
      success: true,
      data: { article: newArticle }
    });
  } catch (error: any) {
    console.error('Create Article Error:', error);
    res.status(500).json({ success: false, error: 'Failed to create article' });
  }
};

// Update article
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, source, thumbnail, url, date, isActive } = req.body;

    const updatedArticle = await prisma.pressArticle.update({
      where: { id },
      data: {
        title,
        source,
        thumbnail,
        url,
        ...(date && { date: new Date(date) }),
        isActive
      }
    });

    res.status(200).json({
      success: true,
      data: { article: updatedArticle }
    });
  } catch (error: any) {
    console.error('Update Article Error:', error);
    res.status(500).json({ success: false, error: 'Failed to update article' });
  }
};

// Delete article
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await prisma.pressArticle.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error: any) {
    console.error('Delete Article Error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete article' });
  }
};
