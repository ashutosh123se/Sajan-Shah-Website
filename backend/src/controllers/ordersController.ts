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
    
    // Get or Create User
    const { user, isNew, setupToken } = await getOrCreateUser(userEmail, userName || userEmail.split('@')[0]);

    // Calculate total amount
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const amountPaise = Math.round(total * 100);
    
    let rzpOrderId = null;
    let orderStatus: any = 'PENDING';

    if (paymentMethod === 'RAZORPAY') {
      const razorpay = await getRazorpayInstance();
      if (!razorpay) {
        return sendError(res, 'Payment service not configured', 500);
      }

      const rzpOrder = await razorpay.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
      });
      rzpOrderId = rzpOrder.id;
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
  } catch (error) {
    console.error('Create order error:', error);
    sendError(res, 'Internal server error', 500);
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
    
    const order = await db.order.update({
      where: { id: orderId },
      data: { status: 'PAID', paymentId: razorpayPaymentId },
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
