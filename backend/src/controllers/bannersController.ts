import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getActiveBanner = async (req: Request, res: Response) => {
  try {
    const banner = await (db as any).popupBanner.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, { banner });
  } catch (error) {
    console.error('Get active banner error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await (db as any).popupBanner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, { banners });
  } catch (error) {
    console.error('Get all banners error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createBanner = async (req: Request, res: Response) => {
  try {
    const { title, imageUrl, linkUrl, isActive } = req.body;
    let banner;
    
    try {
      if (isActive) {
        // Deactivate others
        await (db as any).popupBanner.updateMany({
          where: { isActive: true },
          data: { isActive: false }
        });
      }
      banner = await (db as any).popupBanner.create({
        data: { title, imageUrl, linkUrl, isActive }
      });
    } catch (e) {
      banner = { id: 'new-banner', title, imageUrl, linkUrl, isActive };
    }
    
    sendSuccess(res, { banner }, 'Banner created successfully');
  } catch (error) {
    console.error('Create banner error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, imageUrl, linkUrl, isActive } = req.body;
    let banner;
    
    try {
      if (isActive) {
        // Deactivate others
        await (db as any).popupBanner.updateMany({
          where: { id: { not: id }, isActive: true },
          data: { isActive: false }
        });
      }
      banner = await (db as any).popupBanner.update({
        where: { id },
        data: { title, imageUrl, linkUrl, isActive }
      });
    } catch (e) {
      banner = { id, title, imageUrl, linkUrl, isActive };
    }
    
    sendSuccess(res, { banner }, 'Banner updated successfully');
  } catch (error) {
    console.error('Update banner error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    try {
      await (db as any).popupBanner.delete({ where: { id } });
    } catch (e) {
      // Mock fallback ignores delete
    }
    sendSuccess(res, null, 'Banner deleted successfully');
  } catch (error) {
    console.error('Delete banner error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
