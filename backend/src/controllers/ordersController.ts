import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay only if environment variables are available
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    })
  : null;

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!razorpay) {
      return sendError(res, 'Payment service not configured', 500);
    }

    const { items, userEmail } = req.body;
    
    // Calculate total amount
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const amountPaise = Math.round(total * 100);
    
    // Create Razorpay order
    const rzpOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    });
    
    // This would normally save order to database
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userEmail,
      amount: total,
      amountPaise,
      razorpayOrderId: rzpOrder.id,
      status: 'PENDING',
      createdAt: new Date(),
      items
    };
    
    sendSuccess(res, {
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID
    }, 'Order created successfully');
  } catch (error) {
    console.error('Create order error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    if (!razorpay) {
      return sendError(res, 'Payment service not configured', 500);
    }

    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: razorpayPaymentId, razorpay_signature: razorpaySignature } = req.body;
    
    // Verify signature
    const generated = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    
    if (generated !== razorpaySignature) {
      return sendError(res, 'Invalid payment signature', 400);
    }
    
    // This would normally update order status in database
    // TODO: Send order confirmation email
    
    sendSuccess(res, {
      orderId: Math.random().toString(36).substr(2, 9)
    }, 'Payment verified successfully');
  } catch (error) {
    console.error('Verify payment error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    // This would normally fetch from database
    const orders: any[] = []; // Mock empty array for now
    
    sendSuccess(res, { orders });
  } catch (error) {
    console.error('Get orders error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // This would normally fetch from database
    
    const order = {
      id,
      userEmail: 'customer@example.com',
      amount: 999,
      status: 'PAID',
      createdAt: new Date(),
      items: []
    };
    
    sendSuccess(res, { order });
  } catch (error) {
    console.error('Get order error:', error);
    sendError(res, 'Internal server error', 500);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // This would normally update order status in database
    
    sendSuccess(res, null, 'Order status updated successfully');
  } catch (error) {
    console.error('Update order status error:', error);
    sendError(res, 'Internal server error', 500);
  }
};
