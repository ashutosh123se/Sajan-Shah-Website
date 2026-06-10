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
      if (content && Array.isArray(content.programs)) {
        totalPrograms = content.programs.length || 0;
      }
    }

    // Calculate revenue (sum of paid orders)
    const orders = await db.order.findMany({
      where: { status: { in: ['PROCESSING', 'SHIPPED', 'DELIVERED'] } as any },
      select: { amount: true }
    }) || [];
    const totalRevenue = orders.reduce((sum, order) => sum + (order?.amount || 0), 0);

    sendSuccess(res, {
      stats: {
        totalUsers: totalUsers || 0,
        totalOrders: totalOrders || 0,
        totalRevenue: totalRevenue || 0,
        totalProducts: totalProducts || 0,
        totalEvents: totalEvents || 0,
        totalPrograms: totalPrograms || 0,
        totalLeads: totalLeads || 0
      },
      recentActivity: (recentOrders || []).map(order => ({
        time: order?.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        action: `New order #${order?.id?.slice?.(-5) || ''} by ${order?.user?.name || 'Customer'}`
      }))
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
