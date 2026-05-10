import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, organization, email, phone, city, eventType, eventDate, audience, message, formType, honeypot } = req.body;
    
    // Check honeypot - if filled, silently discard
    if (honeypot) {
      return sendSuccess(res, null, 'Message submitted successfully');
    }
    
    // Validate required fields
    if (!name || !email || !message) {
      return sendError(res, 'Name, email, and message are required', 400);
    }
    
    // This would normally save to database and send emails
    const contactSubmission = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      organization,
      email,
      phone,
      city,
      eventType,
      eventDate,
      audience,
      message,
      formType: formType || 'inquiry',
      receivedAt: new Date(),
      isRead: false
    };
    
    // TODO: Send admin alert email
    // TODO: Send auto-reply to user
    
    sendSuccess(res, { contactSubmission }, 'Message submitted successfully');
  } catch (error) {
    console.error('Submit contact error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    // This would normally fetch from database
    const messages: any[] = []; // Mock empty array for now
    
    sendSuccess(res, { messages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // This would normally mark as read in database
    
    sendSuccess(res, null, 'Message marked as read');
  } catch (error) {
    console.error('Mark as read error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const replyToMessage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { reply } = req.body;
    
    // This would normally send email and update database
    
    sendSuccess(res, null, 'Reply sent successfully');
  } catch (error) {
    console.error('Reply to message error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
