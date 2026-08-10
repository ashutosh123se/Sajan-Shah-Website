import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';
import { EmailService } from '../services/emailService';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, organization, email, phone, city, eventType, eventDate, audience, message, formType, honeypot } = req.body;
    
    // Check honeypot - if filled, silently discard
    if (honeypot) {
      return sendSuccess(res, null, 'Message submitted successfully');
    }
    
    // Validate required fields with specific messages
    if (!name?.trim()) {
      return sendError(res, 'Full name is required.', 400);
    }
    if (!email?.trim()) {
      return sendError(res, 'Email address is required.', 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return sendError(res, 'Please enter a valid email address.', 400);
    }
    if (!message?.trim()) {
      return sendError(res, 'Message or inquiry details are required.', 400);
    }
    
    // Save to database
    const contactSubmission = await db.contact.create({
      data: {
        name,
        organization,
        email,
        phone,
        city,
        eventType,
        eventDate: eventDate ? new Date(eventDate) : null,
        audience,
        message,
        formType: formType || 'inquiry'
      }
    });

    // Also save as a Lead
    await db.lead.create({
      data: {
        name,
        email,
        phone,
        source: formType || 'contact-form',
        data: {
          organization,
          city,
          eventType,
          eventDate,
          audience,
          message
        }
      }
    });
    
    // Send admin alert email
    try {
      await EmailService.sendContactNotification({
        name,
        email,
        phone,
        subject: `New ${formType || 'Inquiry'} from ${name}`,
        message
      });
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError);
      // Don't fail the request if email fails, as DB record is created
    }
    
    sendSuccess(res, { contactSubmission }, 'Message submitted successfully');
  } catch (error) {
    console.error('Submit contact error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await db.contact.findMany({
      orderBy: { receivedAt: 'desc' }
    });
    
    sendSuccess(res, { messages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.contact.update({
      where: { id },
      data: { isRead: true }
    });
    
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
    
    const originalMessage = await db.contact.findUnique({ where: { id } });
    if (!originalMessage) return sendError(res, 'Message not found', 404);

    // Send reply email
    await EmailService.sendEmail({
      to: originalMessage.email,
      subject: `Re: ${originalMessage.formType || 'Inquiry'} - Sajan Shah`,
      text: reply,
      html: `<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${originalMessage.name},</p>
        <p>${reply.replace(/\n/g, '<br>')}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">Original Message:</p>
        <blockquote style="border-left: 3px solid #eee; padding-left: 15px; color: #666; font-style: italic;">
          ${originalMessage.message}
        </blockquote>
      </div>`
    });
    
    sendSuccess(res, null, 'Reply sent successfully');
  } catch (error) {
    console.error('Reply to message error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
