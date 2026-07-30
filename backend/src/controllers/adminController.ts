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
      recentOrders
    ] = await Promise.all([
      db.user.count(),
      db.order.count(),
      db.product.count({ where: { is_active: true } }),
      db.event.count({ where: { isActive: true } }),
      db.lead.count(),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } }
      })
    ]);

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
        totalLeads: totalLeads || 0
      },
      recentActivity: (recentOrders || []).map(order => ({
        time: order?.createdAt
          ? new Date(order.createdAt).toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: 'short'
            })
          : '',
        action: `New order #${order?.id?.slice?.(-5) || ''} by ${order?.user?.name || 'Customer'}`
      }))
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const reseedCmsContent = async (_req: Request, res: Response) => {
  try {
    const { forceSeedPageContent } = await import('../utils/ensurePageContent');
    const result = await forceSeedPageContent();
    sendSuccess(res, result, result.message);
  } catch (error) {
    console.error('Reseed CMS content error:', error);
    sendError(res, 'Failed to reseed CMS content', 500);
  }
};
