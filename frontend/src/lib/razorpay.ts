declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id?: string;
  status: string;
  attempts: number;
  notes: {
    name: string;
    description?: string;
    email?: string;
    contact?: string;
  };
  created_at: number;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export class RazorpayService {
  private static instance: any;

  static loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay SDK'));
      };
      document.body.appendChild(script);
    });
  }

  static async createOrder(orderData: {
    amount: number;
    currency?: string;
    receipt: string;
    notes: {
      name: string;
      description?: string;
      email?: string;
      contact?: string;
    };
  }): Promise<RazorpayOrder> {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create Razorpay order');
      }

      return data.data.order;
    } catch (error) {
      throw new Error((error as Error).message || 'Failed to create order');
    }
  }

  static async verifyPayment(paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/orders/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message || 'Payment verification failed');
    }
  }

  static async openCheckout(options: RazorpayOptions): Promise<void> {
    try {
      await this.loadScript();
      
      return new Promise<void>((resolve, reject) => {
        this.instance = new window.Razorpay({
          ...options,
          handler: (response: RazorpayResponse) => {
            options.handler(response);
            resolve();
          },
          modal: {
            ondismiss: () => {
              options.modal?.ondismiss?.();
              reject(new Error('Payment cancelled by user'));
            },
          },
        });

        this.instance.open();
      });
    } catch (error) {
      throw new Error((error as Error).message || 'Failed to open Razorpay checkout');
    }
  }

  static close(): void {
    if (this.instance) {
      this.instance.close();
    }
  }
}
