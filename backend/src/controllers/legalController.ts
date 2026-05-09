import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getLegalPages = async (req: Request, res: Response) => {
  try {
    // This would normally fetch from database
    const legalPages = [
      {
        id: '1',
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        content: '<h1>Privacy Policy</h1><p>Content to be updated by admin via the admin panel.</p>',
        updatedAt: new Date()
      },
      {
        id: '2',
        slug: 'terms-and-conditions',
        title: 'Terms & Conditions',
        content: '<h1>Terms & Conditions</h1><p>Content to be updated by admin via the admin panel.</p>',
        updatedAt: new Date()
      }
    ];
    
    sendSuccess(res, { legalPages });
  } catch (error) {
    console.error('Get legal pages error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getLegalPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    // This would normally fetch from database
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const title = slugString.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    
    const legalPage = {
      id: '1',
      slug: slugString,
      title,
      content: `<h1>${title}</h1><p>Content to be updated by admin via the admin panel.</p>`,
      updatedAt: new Date()
    };
    
    sendSuccess(res, { legalPage });
  } catch (error) {
    console.error('Get legal page error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateLegalPage = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;
    
    // This would normally update legal page in database
    
    sendSuccess(res, { legalPage: { slug, title, content, updatedAt: new Date() } }, 'Legal page updated successfully');
  } catch (error) {
    console.error('Update legal page error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
