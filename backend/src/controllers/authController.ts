import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import { db } from '../utils/database';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.userFindUnique({ email });
    if (existingUser) {
      return sendError(res, 'User with this email already exists', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await db.userCreate({ name, email, passwordHash });

    // Generate tokens
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    sendSuccess(res, { accessToken, user }, 'Registration successful');
  } catch (error) {
    console.error('Registration error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.userFindUnique({ email });
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Validate password
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Generate tokens
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    sendSuccess(res, { accessToken, user: userData }, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken');
    sendSuccess(res, null, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return sendError(res, 'No refresh token provided', 401);
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    
    // Find user
    const user = await db.userFindUnique({ email: decoded.email || '' });
    if (!user) {
      return sendError(res, 'User not found', 401);
    }

    // Generate new tokens
    const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id });

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    sendSuccess(res, { accessToken, user: userData }, 'Token refreshed successfully');
  } catch (error) {
    console.error('Refresh error:', error);
    sendError(res, 'Invalid refresh token', 401);
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await db.userFindUnique({ email: req.user.email });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, { user }, 'User retrieved successfully');
  } catch (error) {
    console.error('Get me error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
