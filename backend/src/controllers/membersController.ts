import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { db } from '../utils/database';
import { generateSetupToken, getSetupTokenExpiry } from '../utils/authUtils';
import { EmailService } from '../services/emailService';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const { tier, search, page = '1', limit = '12' } = req.query as Record<string, string>;
    const parsedPage = Math.max(parseInt(page || '1', 10), 1);
    const parsedLimit = Math.max(parseInt(limit || '12', 10), 1);
    const skip = (parsedPage - 1) * parsedLimit;

    const where: any = {};
    if (tier) where.tier = tier;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { bio: { contains: search } },
      ];
    }

    const [members, total] = await Promise.all([
      db.member.findMany({
        where,
        orderBy: { joinedAt: 'desc' },
        skip,
        take: parsedLimit,
      }),
      db.member.count({ where }),
    ]);

    sendSuccess(res, {
      members,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        totalPages: Math.max(Math.ceil(total / parsedLimit), 1),
        hasNextPage: skip + members.length < total,
        hasPrevPage: parsedPage > 1,
      },
    });
  } catch (error) {
    console.error('Get members error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const member = await db.member.findUnique({ where: { id } });
    if (!member) return sendError(res, 'Member not found', 404);
    sendSuccess(res, { member });
  } catch (error) {
    console.error('Get member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const memberData = {
      ...req.body,
      photoUrl: req.body.photoUrl || '/LOGO.png',
    };
    const member = await db.member.create({ data: memberData });
    sendSuccess(res, { member }, 'Member created successfully');
  } catch (error) {
    console.error('Create member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    const member = await db.member.update({ where: { id }, data: updateData });
    sendSuccess(res, { member }, 'Member updated successfully');
  } catch (error) {
    console.error('Update member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await db.member.delete({ where: { id } });
    sendSuccess(res, null, 'Member deleted successfully');
  } catch (error) {
    console.error('Delete member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const applyForMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, bio, whyJoin } = req.body;
    if (!name || !email || !bio || !whyJoin) {
      return sendError(res, 'All fields are required', 400);
    }
    const application = await (db as any).memberApplication.create({
      data: { name, email, phone, bio, whyJoin }
    });

    // Capture User / Account Creation logic
    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      const setupToken = generateSetupToken();
      user = await db.user.create({
        data: {
          email,
          name,
          phone,
          passwordSetupToken: setupToken,
          passwordSetupExpires: getSetupTokenExpiry(),
          role: 'CUSTOMER'
        }
      });
      
      // Send setup email
      await EmailService.sendPasswordSetupEmail(email, name, setupToken);
    } else if (!user.passwordHash && !user.passwordSetupToken) {
      // User exists but has no password (maybe from a previous purchase)
      const setupToken = generateSetupToken();
      await db.user.update({
        where: { email },
        data: {
          passwordSetupToken: setupToken,
          passwordSetupExpires: getSetupTokenExpiry()
        }
      });
      await EmailService.sendPasswordSetupEmail(email, name, setupToken);
    }

    // Also save as a Lead
    await db.lead.create({
      data: {
        name,
        email,
        phone,
        source: 'membership-application',
        data: JSON.stringify({ bio, whyJoin })
      }
    });

    sendSuccess(res, { application }, 'Application submitted successfully');
  } catch (error) {
    console.error('Apply for member error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
