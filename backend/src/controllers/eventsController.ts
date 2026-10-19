import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

const enrichEvents = (events: any[], sortOrder: 'asc' | 'desc' = 'desc') => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const enriched = events.map(event => ({
    ...event,
    isPast: new Date(event.eventDate) < today
  }));

  return enriched.sort((a, b) => {
    const diff = new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    return sortOrder === 'asc' ? -diff : diff;
  });
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { filter, type, city, sort } = req.query;

    let events = await db.event.findMany({
      where: { isActive: true }
    });

    const sortOrder = (sort === 'asc' ? 'asc' : 'desc');
    events = enrichEvents(events, sortOrder);

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

const ensureUniqueEventSlug = async (rawSlugOrTitle: string, excludeId?: string): Promise<string> => {
  const base = (rawSlugOrTitle || 'event')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'event';

  const existing = await db.event.findFirst({
    where: {
      slug: base,
      ...(excludeId ? { id: { not: excludeId } } : {})
    }
  });

  if (!existing) {
    return base;
  }

  return `${base}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title, slug, description, posterUrl, homepageImageUrl,
      webinarUrl, eventDate, city, venue, venueAddress, eventType, isPast,
      isFree, price, capacity, isActive, showOnCard, buttonUrl
    } = req.body;

    if (!title?.trim()) {
      return sendError(res, 'Event title is required.', 400);
    }
    if (!eventDate) {
      return sendError(res, 'Event date and time are required.', 400);
    }

    const finalSlug = await ensureUniqueEventSlug(slug || title.trim());

    const event = await db.event.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        description,
        posterUrl: posterUrl || '/EVENT.png',
        homepageImageUrl,
        webinarUrl: webinarUrl || 'https://sol.sajanshah.com',
        eventDate: new Date(eventDate),
        city,
        venue,
        venueAddress: venueAddress || null,
        eventType,
        isPast: isPast || false,
        isFree: isFree ?? true,
        price: (price !== undefined && price !== null) ? parseFloat(price.toString()) : null,
        capacity: (capacity !== undefined && capacity !== null && capacity !== '') ? parseInt(capacity.toString()) : null,
        isActive: isActive ?? true,
        showOnCard: showOnCard === true || showOnCard === 'true',
        buttonUrl: buttonUrl || 'https://sol.sajanshah.com'
      }
    });
    sendSuccess(res, { event }, 'Event created successfully');
  } catch (error: any) {
    console.error('Create event error:', error);
    if (error?.code === 'P2002') {
      try {
        // Fallback retry with guaranteed unique slug
        const fallbackSlug = `${(req.body.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
        const event = await db.event.create({
          data: {
            title: req.body.title.trim(),
            slug: fallbackSlug,
            description: req.body.description,
            posterUrl: req.body.posterUrl || '/EVENT.png',
            homepageImageUrl: req.body.homepageImageUrl,
            webinarUrl: req.body.webinarUrl || 'https://sol.sajanshah.com',
            eventDate: new Date(req.body.eventDate),
            city: req.body.city,
            venue: req.body.venue,
            venueAddress: req.body.venueAddress || null,
            eventType: req.body.eventType,
            isPast: req.body.isPast || false,
            isFree: req.body.isFree ?? true,
            price: (req.body.price !== undefined && req.body.price !== null) ? parseFloat(req.body.price.toString()) : null,
            capacity: (req.body.capacity !== undefined && req.body.capacity !== null && req.body.capacity !== '') ? parseInt(req.body.capacity.toString()) : null,
            isActive: req.body.isActive ?? true,
            showOnCard: req.body.showOnCard === true || req.body.showOnCard === 'true',
            buttonUrl: req.body.buttonUrl || 'https://sol.sajanshah.com'
          }
        });
        return sendSuccess(res, { event }, 'Event created successfully');
      } catch (retryErr) {
        return sendError(res, 'Failed to save event.', 500);
      }
    }
    sendError(res, 'Failed to save event. Please check all required fields.', 500);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const {
      title, slug, description, posterUrl, homepageImageUrl,
      webinarUrl, eventDate, city, venue, venueAddress, eventType, isPast,
      isFree, price, capacity, isActive, showOnCard, buttonUrl
    } = req.body;

    let finalSlug: string | undefined = undefined;
    if (slug || title) {
      finalSlug = await ensureUniqueEventSlug(slug || title, id);
    }

    const data: Record<string, unknown> = {
      title,
      ...(finalSlug ? { slug: finalSlug } : {}),
      description,
      posterUrl,
      homepageImageUrl,
      webinarUrl,
      eventDate: eventDate ? new Date(eventDate) : undefined,
      city,
      venue,
      venueAddress: venueAddress !== undefined ? (venueAddress || null) : undefined,
      eventType,
      isPast,
      isFree,
      price: (price !== undefined && price !== null) ? parseFloat(price.toString()) : undefined,
      capacity: (capacity !== undefined && capacity !== null && capacity !== '') ? parseInt(capacity.toString()) : undefined,
      isActive,
      buttonUrl
    };

    if (showOnCard !== undefined) {
      data.showOnCard = showOnCard === true || showOnCard === 'true';
    }

    const event = await db.event.update({
      where: { id },
      data
    });
    sendSuccess(res, { event }, 'Event updated successfully');
  } catch (error: any) {
    console.error('Update event error:', error);
    if (error?.code === 'P2002') {
      try {
        const fallbackSlug = `${(req.body.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
        const event = await db.event.update({
          where: { id },
          data: { slug: fallbackSlug }
        });
        return sendSuccess(res, { event }, 'Event updated successfully');
      } catch (retryErr) {
        return sendError(res, 'Failed to update event.', 500);
      }
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
