import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { db } from '../utils/database';
import { generateSetupToken, getSetupTokenExpiry } from '../utils/authUtils';
import { EmailService } from '../services/emailService';
import { getPaymentConfig } from '../utils/config';

const getRazorpayInstance = async () => {
  const config = await getPaymentConfig();

  if (!config.keyId || !config.keySecret) return null;

  return new Razorpay({
    key_id: config.keyId,
    key_secret: config.keySecret
  });
};

const getOrCreateUser = async (email: string, name: string) => {
  let user = await db.user.findUnique({ where: { email } });
  let isNew = false;
  let setupToken = null;

  if (!user) {
    setupToken = generateSetupToken();
    user = await db.user.create({
      data: {
        email,
        name,
        passwordSetupToken: setupToken,
        passwordSetupExpires: getSetupTokenExpiry(),
        role: 'CUSTOMER'
      }
    });
    isNew = true;
  } else if (!user.passwordHash && !user.passwordSetupToken) {
    setupToken = generateSetupToken();
    user = await db.user.update({
      where: { email },
      data: {
        passwordSetupToken: setupToken,
        passwordSetupExpires: getSetupTokenExpiry()
      }
    });
    isNew = true;
  }

  return { user, isNew, setupToken };
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, userEmail, userName, paymentMethod = 'RAZORPAY', shippingAddress, phone } = req.body;

    if (!userEmail || typeof userEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return sendError(res, 'A valid email address is required to place an order.', 400);
    }
    if (!Array.isArray(items) || items.length === 0) {
      return sendError(res, 'Your cart is empty. Add at least one product before checkout.', 400);
    }
    for (const item of items) {
      if (!item?.productId) {
        return sendError(res, 'Each cart item must include a productId.', 400);
      }
      if (!item?.quantity || Number(item.quantity) < 1) {
        return sendError(res, 'Each cart item must have a quantity of at least 1.', 400);
      }
      if (item.price === undefined || item.price === null || Number(item.price) < 0) {
        return sendError(res, 'Each cart item must include a valid price.', 400);
      }
    }
    
    // Get or Create User
    const { user, isNew, setupToken } = await getOrCreateUser(userEmail, userName || userEmail.split('@')[0]);

    // Calculate total amount
    const total = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);
    if (!Number.isFinite(total) || total <= 0) {
      return sendError(res, 'Order total must be greater than zero.', 400);
    }
    const amountPaise = Math.round(total * 100);
    
    let rzpOrderId = null;
    let orderStatus: any = 'PENDING';

    if (paymentMethod === 'RAZORPAY') {
      const razorpay = await getRazorpayInstance();
      if (!razorpay) {
        return sendError(res, 'Online payment is not configured. Please use Cash on Delivery or contact support.', 503);
      }

      try {
        const rzpOrder = await razorpay.orders.create({
          amount: amountPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        });
        rzpOrderId = rzpOrder.id;
      } catch (rzpError: any) {
        console.error('Razorpay order create failed:', rzpError);
        const message =
          rzpError?.error?.description ||
          rzpError?.message ||
          'Razorpay could not create the payment order. Check API keys and try again.';
        return sendError(res, message, 502);
      }
    } else if (paymentMethod === 'COD') {
      orderStatus = 'PROCESSING'; // COD orders start as processing
      
      // For COD, if it's a new user, send setup email immediately
      if (isNew && setupToken) {
        await EmailService.sendPasswordSetupEmail(user.email, user.name, setupToken);
      }
    }
    
    const order = await db.order.create({
      data: {
        userEmail: user.email,
        amount: total,
        amountPaise,
        razorpayOrderId: rzpOrderId,
        status: orderStatus,
        paymentMethod,
        shippingAddress,
        phone,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    
    sendSuccess(res, {
      orderId: order.id,
      razorpayOrderId: rzpOrderId,
      amount: amountPaise,
      currency: 'INR',
      key: paymentMethod === 'RAZORPAY' ? (await getPaymentConfig()).keyId : null
    }, 'Order created successfully');
  } catch (error: any) {
    console.error('Create order error:', error);
    const message = error?.message || 'Internal server error';
    sendError(res, message.includes('Unique constraint') ? 'Unable to create order. Please try again.' : message, 500);
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const razorpay = await getRazorpayInstance();
    if (!razorpay) {
      return sendError(res, 'Payment service not configured', 500);
    }

    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: razorpaySignature, orderId } = req.body;
    
    // Verify signature
    const config = await getPaymentConfig();
    const secret = config.keySecret;
    
    if (!secret) return sendError(res, 'Payment secret not found', 500);

    const generated = crypto.createHmac('sha256', secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    
    if (generated !== razorpaySignature) {
      return sendError(res, 'Invalid payment signature', 400);
    }
    
    const order: any = await db.order.update({
      where: { id: orderId },
      data: { status: 'PAID' as any, paymentId: razorpayPaymentId },
      include: { user: true }
    });

    // If it's a new user (no password set), send setup email
    if (!order.user.passwordHash && order.user.passwordSetupToken) {
      await EmailService.sendPasswordSetupEmail(order.user.email, order.user.name, order.user.passwordSetupToken);
    }
    
    sendSuccess(res, { orderId }, 'Payment verified successfully');
  } catch (error) {
    console.error('Verify payment error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.order.findMany({ include: { items: true, user: true } });
    sendSuccess(res, { orders });
  } catch (error) {
    console.error('Get orders error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const order = await db.order.findUnique({ where: { id }, include: { items: true, user: true } });
    if (!order) return sendError(res, 'Order not found', 404);
    sendSuccess(res, { order });
  } catch (error) {
    console.error('Get order error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, trackingId, shippingNotes } = req.body;
    await db.order.update({ 
      where: { id }, 
      data: { status, trackingId, shippingNotes } 
    });
    sendSuccess(res, null, 'Order status updated successfully');
  } catch (error) {
    console.error('Update order status error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userEmail = (req as any).user.email;
    const orders = await db.order.findMany({
      where: { userEmail },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    sendSuccess(res, { orders });
  } catch (error) {
    console.error('Get my orders error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
