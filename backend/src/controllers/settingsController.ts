import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await (db as any).setting.findMany();
    
    // Transform to object key-value pairs grouped by group
    const formattedSettings = settings.reduce((acc: any, curr: any) => {
      if (!acc[curr.group]) acc[curr.group] = {};
      acc[curr.group][curr.key] = curr.value;
      return acc;
    }, {});

    sendSuccess(res, { settings: formattedSettings });
  } catch (error) {
    console.error('Get settings error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { settings } = req.body; // Expecting { group: { key: value } }
    
    if (!settings || typeof settings !== 'object') {
      return sendError(res, 'Invalid settings format', 400);
    }

    const updates = [];

    for (const group in settings) {
      for (const key in settings[group]) {
        updates.push(
          (db as any).setting.upsert({
            where: { key },
            update: { value: String(settings[group][key]), group },
            create: { key, value: String(settings[group][key]), group }
          })
        );
      }
    }

    await Promise.all(updates);
    
    sendSuccess(res, null, 'Settings updated successfully');
  } catch (error) {
    console.error('Update settings error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
