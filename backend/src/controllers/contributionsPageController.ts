import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { normalizeJsonContent, toPrismaJson } from '../utils/jsonContent';

const prisma = new PrismaClient();

function withNormalizedContent<T extends { content?: unknown }>(section: T) {
  return { ...section, content: normalizeJsonContent(section.content) };
}

// Get active contributions page sections (Public)
export const getContributionsPageSections = async (req: Request, res: Response) => {
  try {
    const sections = await prisma.contributionsPageSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    res.json({
      success: true,
      data: { sections: sections.map(withNormalizedContent) },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve contributions sections',
    });
  }
};

// Get all contributions page sections (Admin)
export const getAllContributionsPageSections = async (req: Request, res: Response) => {
  try {
    const sections = await prisma.contributionsPageSection.findMany({
      orderBy: { order: 'asc' },
    });
    res.json({
      success: true,
      data: { sections: sections.map(withNormalizedContent) },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to retrieve all contributions sections',
    });
  }
};

// Create a new contributions page section
export const createContributionsPageSection = async (req: Request, res: Response) => {
  try {
    const { key, title, content, order, isActive } = req.body;
    const section = await prisma.contributionsPageSection.create({
      data: {
        key,
        title,
        content: toPrismaJson(content),
        order: Number(order) || 0,
        isActive,
      },
    });
    res.status(201).json({
      success: true,
      data: { section: withNormalizedContent(section) },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create section',
    });
  }
};

// Update an existing contributions page section
export const updateContributionsPageSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, order, isActive } = req.body;

    const section = await prisma.contributionsPageSection.update({
      where: { id: id as string },
      data: {
        title,
        content: toPrismaJson(content),
        order: order !== undefined ? Number(order) : undefined,
        isActive,
      },
    });

    res.json({
      success: true,
      data: { section: withNormalizedContent(section) },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update section',
    });
  }
};

// Delete a contributions page section
export const deleteContributionsPageSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contributionsPageSection.delete({
      where: { id: id as string },
    });
    res.json({
      success: true,
      message: 'Section deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete section',
    });
  }
};
