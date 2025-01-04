import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { usePayment } from '../../hooks/usePayment';
import { LoaderCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  rideId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentForm({ amount, rideId, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, loading } = usePayment();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(amount, rideId);
        setClientSecret(clientSecret);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to initialize payment');
      }
    };

    initializePayment();
  }, [amount, rideId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (submitError) {
      onError(submitError.message ?? 'Payment failed');
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">Payment Details</h3>
          <p className="text-sm text-gray-600">
            Amount to pay: ${(amount / 100).toFixed(2)}
          </p>
        </div>

        {clientSecret ? (
          <PaymentElement />
        ) : (
          <div className="flex items-center justify-center py-4">
            <LoaderCircle className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <LoaderCircle className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </span>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
}