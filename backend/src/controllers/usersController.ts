import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return sendError(res, 'Email already in use', 400);

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role || 'CUSTOMER',
        isActive: true
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true, isActive: true }
    });

    sendSuccess(res, { user }, 'User created successfully');
  } catch (error) {
    console.error('Create user error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true, isActive: true }
    });
    sendSuccess(res, { users });
  } catch (error) {
    console.error('Get users error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const user = await db.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, createdAt: true, isActive: true }
    });
    if (!user) return sendError(res, 'User not found', 404);
    sendSuccess(res, { user });
  } catch (error) {
    console.error('Get user error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { role } = req.body;
    await db.user.update({ where: { id }, data: { role } });
    sendSuccess(res, null, 'User role updated successfully');
  } catch (error) {
    console.error('Update user role error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { isActive } = req.body;
    await db.user.update({ where: { id }, data: { isActive } });
    sendSuccess(res, null, 'User status updated successfully');
  } catch (error) {
    console.error('Update user status error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.user.delete({ where: { id } });
    sendSuccess(res, null, 'User deleted successfully');
  } catch (error) {
    console.error('Delete user error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
