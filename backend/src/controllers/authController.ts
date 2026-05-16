import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import { db } from '../utils/database';
import { EmailService } from '../services/emailService';

export const register = async (req: Request, res: Response) => {
  return sendError(res, 'Direct registration is disabled. Please purchase a product or register for an event to create an account.', 403);
  /*
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return sendError(res, 'User with this email already exists', 409);

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { name, email, passwordHash, role: 'CUSTOMER' }
    });

    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    sendSuccess(res, { accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, 'Registration successful');
  } catch (error) {
    console.error('Register error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) return sendError(res, 'Invalid credentials', 401);

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return sendError(res, 'Invalid credentials', 401);

    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    sendSuccess(res, { 
      accessToken, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  sendSuccess(res, null, 'Logged out successfully');
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return sendError(res, 'No refresh token provided', 401);

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    const user = await db.user.findUnique({ where: { id: decoded.id } });
    if (!user) return sendError(res, 'User not found', 401);

    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    sendSuccess(res, { 
      accessToken, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    sendError(res, 'Invalid refresh token', 401);
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await db.user.findUnique({ 
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true }
    });
    if (!user) return sendError(res, 'User not found', 404);
    sendSuccess(res, { user });
  } catch (error) {
    console.error('GetMe error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const verifyPasswordSetupToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!token) return sendError(res, 'Token is required', 400);

    const user = await db.user.findFirst({
      where: {
        passwordSetupToken: token as string,
        passwordSetupExpires: { gt: new Date() }
      }
    });

    if (!user) return sendError(res, 'Invalid or expired setup token', 400);

    sendSuccess(res, { email: user.email, name: user.name }, 'Token is valid');
  } catch (error) {
    console.error('Verify setup token error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return sendError(res, 'Token and password are required', 400);

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return sendError(res, 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 400);
    }

    const user = await db.user.findFirst({
      where: {
        passwordSetupToken: token,
        passwordSetupExpires: { gt: new Date() }
      }
    });

    if (!user) return sendError(res, 'Invalid or expired setup token', 400);

    const passwordHash = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordSetupToken: null,
        passwordSetupExpires: null
      }
    });

    // Send confirmation email
    await EmailService.sendPasswordSuccessEmail(user.email, user.name);

    sendSuccess(res, null, 'Password set successfully. You can now login.');
  } catch (error) {
    console.error('Set password error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
