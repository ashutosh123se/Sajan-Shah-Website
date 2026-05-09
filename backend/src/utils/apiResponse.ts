import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message?: string) => {
  return res.json({
    success: true,
    data,
    message
  });
};

export const sendError = (res: Response, error: string, statusCode: number = 400, details?: any) => {
  return res.status(statusCode).json({
    success: false,
    error,
    details
  });
};
