import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createPaymentIntent = async (amount: number, rideId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, rideId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentIntent: PaymentIntent = await response.json();
      return paymentIntent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPaymentIntent,
    loading,
    error,
  };
}