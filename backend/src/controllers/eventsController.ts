import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

const enrichEvents = (events: any[], sortOrder: 'asc' | 'desc' = 'asc') => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const enriched = events.map(event => ({
    ...event,
    isPast: new Date(event.eventDate) < today
  }));

  return enriched.sort((a, b) => {
    const diff = new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    return sortOrder === 'desc' ? -diff : diff;
  });
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { filter, type, city } = req.query;

    let events = await db.event.findMany({
      where: { isActive: true }
    });

    events = enrichEvents(events, 'asc');

    if (filter === 'upcoming') {
      events = events.filter(e => !e.isPast);
    } else if (filter === 'past') {
      events = events.filter(e => e.isPast).sort(
        (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
      );
    }

    if (type) {
      events = events.filter(e => e.eventType === type);
    }

    if (city) {
      events = events.filter(e => e.city === city);
    }

    sendSuccess(res, { events });
  } catch (error) {
    console.error('Get events error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getAllEventsAdmin = async (req: Request, res: Response) => {
  try {
    const events = enrichEvents(await db.event.findMany(), 'desc');
    sendSuccess(res, { events });
  } catch (error) {
    console.error('Get all events error:', error);
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

    const isPast = new Date(event.eventDate) < new Date();

    sendSuccess(res, { event: { ...event, isPast } });
  } catch (error) {
    console.error('Get event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title, slug, description, posterUrl, homepageImageUrl,
      webinarUrl, eventDate, city, venue, eventType, isPast,
      isFree, price, capacity, isActive, buttonUrl
    } = req.body;

    if (!title?.trim()) {
      return sendError(res, 'Event title is required.', 400);
    }
    if (!eventDate) {
      return sendError(res, 'Event date and time are required.', 400);
    }

    const event = await db.event.create({
      data: {
        title: title.trim(),
        slug: slug || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${Date.now()}`,
        description,
        posterUrl: posterUrl || 'https://via.placeholder.com/800x600',
        homepageImageUrl,
        webinarUrl: webinarUrl || 'https://sol.sajanshah.com',
        eventDate: new Date(eventDate),
        city,
        venue,
        eventType,
        isPast: isPast || false,
        isFree: isFree ?? true,
        price: (price !== undefined && price !== null) ? parseFloat(price.toString()) : null,
        capacity: (capacity !== undefined && capacity !== null && capacity !== '') ? parseInt(capacity.toString()) : null,
        isActive: isActive ?? true,
        buttonUrl: buttonUrl || 'https://sol.sajanshah.com'
      }
    });
    sendSuccess(res, { event }, 'Event created successfully');
  } catch (error: any) {
    console.error('Create event error:', error);
    if (error?.code === 'P2002') {
      return sendError(res, 'An event with this slug already exists. Please use a different title.', 400);
    }
    sendError(res, 'Failed to save event. Please check all required fields.', 500);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const {
      title, slug, description, posterUrl, homepageImageUrl,
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
  } catch (error: any) {
    console.error('Update event error:', error);
    if (error?.code === 'P2002') {
      return sendError(res, 'An event with this slug already exists.', 400);
    }
    sendError(res, 'Failed to update event.', 500);
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
