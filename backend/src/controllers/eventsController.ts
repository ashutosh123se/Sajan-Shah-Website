import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { filter, type, city } = req.query;
    
    let events = await db.eventFindMany();
    
    // Auto-update past events
    const now = new Date();
    events = events.map(event => ({
      ...event,
      isPast: new Date(event.eventDate) < now
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
    const { id } = req.params;
    const events = await db.eventFindMany();
    const event = events.find(e => e.id === id);
    
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
    const eventData = req.body;
    sendSuccess(res, { event: { ...eventData, id: Math.random().toString(36).substr(2, 9) } }, 'Event created successfully');
  } catch (error) {
    console.error('Create event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    sendSuccess(res, { event: { ...updateData, id } }, 'Event updated successfully');
  } catch (error) {
    console.error('Update event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    sendSuccess(res, null, 'Event deleted successfully');
  } catch (error) {
    console.error('Delete event error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
