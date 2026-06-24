import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { filter, type, city } = req.query;
    
    let events = await db.event.findMany();
    
    // Auto-update past events
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    events = events.map(event => ({
      ...event,
      isPast: new Date(event.eventDate) < today
    }));
    
    // Apply filters
    if (filter === 'upcoming') {
      events = events.filter(e => !e.isPast);
    } else if (filter === 'past') {
      events = events.filter(e => e.isPast);
    }
    
    if (type) {
      events = events.filter(e => e.eventType === type);
    }
    
    if (city) {
      events = events.filter(e => e.city === city);
    }
    
    // Sort by event date
    events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    
    sendSuccess(res, { events });
  } catch (error) {
    console.error('Get events error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = await db.event.findUnique({ where: { id } });
    
    if (!event) {
      return sendError(res, 'Event not found', 404);
    }
    
    // Check if event is past
    const isPast = new Date(event.eventDate) < new Date();
    
    sendSuccess(res, { event: { ...event, isPast } });
  } catch (error) {
    console.error('Get event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    console.log("CREATE EVENT REQ BODY: ", req.body);
    const {
      title, slug, description, posterUrl, homepageImageUrl, cloudinaryPublicId,
      webinarUrl, eventDate, city, venue, eventType, isPast,
      isFree, price, capacity, isActive, buttonUrl
    } = req.body;

    const event = await db.event.create({
      data: {
        title,
        slug: slug || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now()}`,
        description,
        posterUrl,
        homepageImageUrl,
        cloudinaryPublicId,
        webinarUrl,
        eventDate: new Date(eventDate),
        city,
        venue,
        eventType,
        isPast: isPast || false,
        isFree: isFree ?? true,
        price: (price !== undefined && price !== null) ? parseFloat(price.toString()) : null,
        capacity: (capacity !== undefined && capacity !== null && capacity !== '') ? parseInt(capacity.toString()) : null,
        isActive: isActive ?? true,
        buttonUrl
      }
    });
    sendSuccess(res, { event }, 'Event created successfully');
  } catch (error) {
    console.error('Create event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const {
      title, slug, description, posterUrl, homepageImageUrl, cloudinaryPublicId,
      webinarUrl, eventDate, city, venue, eventType, isPast,
      isFree, price, capacity, isActive, buttonUrl
    } = req.body;

    const event = await db.event.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        posterUrl,
        homepageImageUrl,
        cloudinaryPublicId,
        webinarUrl,
        eventDate: eventDate ? new Date(eventDate) : undefined,
        city,
        venue,
        eventType,
        isPast,
        isFree,
        price: (price !== undefined && price !== null) ? parseFloat(price.toString()) : undefined,
        capacity: (capacity !== undefined && capacity !== null && capacity !== '') ? parseInt(capacity.toString()) : undefined,
        isActive,
        buttonUrl
      }
    });
    sendSuccess(res, { event }, 'Event updated successfully');
  } catch (error) {
    console.error('Update event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.event.delete({ where: { id } });
    sendSuccess(res, null, 'Event deleted successfully');
  } catch (error) {
    console.error('Delete event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
