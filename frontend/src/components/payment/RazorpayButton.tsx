'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface RazorpayButtonProps {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  email?: string;
  contact?: string;
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  disabled?: boolean;
  className?: string;
}

export const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  currency = 'INR',
  name,
  description,
  email,
  contact,
  onSuccess,
  onFailure,
  disabled = false,
  className = '',
}) => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(script);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const openRazorpayCheckout = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay script
      await loadRazorpayScript();
      
      // Create Razorpay order from backend
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `receipt_${Date.now()}`,
          notes: {
            name,
            description,
            email,
            contact,
          },
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const { order } = orderData.data;

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: order.notes.name,
        description: order.notes.description,
        image: '/logo.png',
        order_id: order.receipt,
        handler: function (response: any) {
          // Verify payment on backend
          fetch('/api/orders/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          .then(verifyResponse => verifyResponse.json())
          .then(verifyData => {
            if (verifyData.success) {
              onSuccess(response);
            } else {
              onFailure(new Error(verifyData.error || 'Payment verification failed'));
            }
          })
          .catch(error => {
            onFailure(error);
          });
        },
        prefill: {
          name,
          email,
          contact,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      setLoading(false);
      onFailure(error);
    }
  };

  return (
    <Button
      onClick={openRazorpayCheckout}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </Button>
  );
};
