import { Request, Response } from 'express';
import { db } from '../utils/database';

const mapArticle = (article: any) => ({
  ...article,
  thumbnail: article.imageUrl,
});

// Get all active press articles
export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await db.pressArticle.findMany({
      where: { isActive: true },
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: { articles: articles.map(mapArticle) }
    });
  } catch (error: any) {
    console.error('Get Articles Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch press articles' });
  }
};

// Get all press articles (for admin)
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await db.pressArticle.findMany({
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: { articles: articles.map(mapArticle) }
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
    const article = await db.pressArticle.findUnique({
      where: { id }
    });

    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }

    res.status(200).json({
      success: true,
      data: { article: mapArticle(article) }
    });
  } catch (error: any) {
    console.error('Get Article Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch article' });
  }
};

// Create new article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, source, thumbnail, imageUrl, url, date, isActive } = req.body;

    if (!title || !source || !url || !date) {
      return res.status(400).json({ success: false, error: 'Title, source, URL, and date are required.' });
    }

    const resolvedImageUrl = imageUrl || thumbnail;
    if (!resolvedImageUrl) {
      return res.status(400).json({ success: false, error: 'Article image is required.' });
    }

    const newArticle = await db.pressArticle.create({
      data: {
        title,
        source,
        imageUrl: resolvedImageUrl,
        url,
        date: new Date(date),
        isActive: isActive ?? true
      }
    });

    res.status(201).json({
      success: true,
      data: { article: mapArticle(newArticle) }
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
    const { title, source, thumbnail, imageUrl, url, date, isActive } = req.body;

    const resolvedImageUrl = imageUrl || thumbnail;

    const updatedArticle = await db.pressArticle.update({
      where: { id },
      data: {
        title,
        source,
        ...(resolvedImageUrl && { imageUrl: resolvedImageUrl }),
        url,
        ...(date && { date: new Date(date) }),
        isActive
      }
    });

    res.status(200).json({
      success: true,
      data: { article: mapArticle(updatedArticle) }
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

    await db.pressArticle.delete({
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
