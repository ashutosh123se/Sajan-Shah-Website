import { Request, Response } from 'express';
import { db } from '../utils/database';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalEvents,
      totalLeads,
      recentOrders,
      catalogSection
    ] = await Promise.all([
      db.user.count(),
      db.order.count(),
      db.product.count(),
      db.event.count(),
      db.lead.count(),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } }
      }),
      db.speakingPageSection.findUnique({
        where: { key: 'catalog' }
      })
    ]);

    let totalPrograms = 0;
    if (catalogSection?.content) {
      const content = catalogSection.content as any;
      if (Array.isArray(content?.programs)) {
        totalPrograms = content.programs.length;
      }
    }

    // Calculate revenue (sum of paid orders)
    const orders = await db.order.findMany({
      where: { status: 'PAID' as any },
      select: { amount: true }
    });
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

    sendSuccess(res, {
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue,
        totalProducts,
        totalEvents,
        totalPrograms,
        totalLeads
      },
      recentActivity: recentOrders.map(order => ({
        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `New order #${order.id.slice(-5)} by ${order.user?.name || 'Customer'}`
      }))
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
