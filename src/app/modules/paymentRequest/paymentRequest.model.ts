import { Schema, model } from 'mongoose';
import { TPaymentRequest } from './paymentRequest.interface';

const paymentRequestSchema = new Schema<TPaymentRequest>({
  user_id: { type: Number, required: true },
  user_email: { type: String, required: true },
  user_name: { type: String, required: true },
  amount: { type: Number, required: true },
  client_name: { type: String, required: true },
  client_email: { type: String, required: true },
  currency: { type: String, required: true },
  status: {
    isCanceled: { type: Boolean, required: true },
    isCompleted: { type: Boolean, required: true },
    isProcessing: { type: Boolean, required: true },
  },
  paymentIntentId: { type: String },
  clientSecret: { type: String },
  client_country: { type: String, required: true },
});

export const PaymentRequest = model<TPaymentRequest>(
  'paymentRequest',
  paymentRequestSchema,
);
