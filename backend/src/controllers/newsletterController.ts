import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const subscribe = async (req: Request, res: Response) => {
  try {
    const { email, name, whatsappOptIn, source } = req.body;
    
    // Validate required fields
    if (!email) {
      return sendError(res, 'Email is required', 400);
    }
    
    // Save to Newsletter table
    const subscription = await db.newsletter.upsert({
      where: { email },
      update: {
        name: name || undefined,
        whatsappOptIn: whatsappOptIn || undefined,
      },
      create: {
        email,
        name: name || '',
        whatsappOptIn: whatsappOptIn || false,
      }
    });

    // Also save as a Lead
    await db.lead.create({
      data: {
        name: name || 'Subscriber',
        email,
        phone: req.body.phone || null,
        source: source || 'newsletter',
        data: {
          whatsappOptIn: whatsappOptIn || false,
        }
      }
    });
    
    // TODO: Send welcome email
    
    sendSuccess(res, { subscription }, 'Successfully subscribed to newsletter');
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await db.newsletter.findMany({
      orderBy: { subscribedAt: 'desc' }
    });
    
    sendSuccess(res, { subscribers });
  } catch (error) {
    console.error('Get subscribers error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const exportSubscribers = async (req: Request, res: Response) => {
  try {
    // This would normally generate CSV from database
    const csvData = 'Email,Name,WhatsApp Opt In,Subscribed At\n'; // CSV header
    
    // TODO: Generate actual CSV data from database
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.send(csvData);
  } catch (error) {
    console.error('Export subscribers error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // This would normally remove from database
    
    sendSuccess(res, null, 'Successfully unsubscribed');
  } catch (error) {
    console.error('Unsubscribe error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
