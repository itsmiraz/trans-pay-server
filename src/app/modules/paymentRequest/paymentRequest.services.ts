import AppError from '../../errors/AppError';
import stripe from '../../utils/stripe';
import { TPaymentRequest } from './paymentRequest.interface';
import { PaymentRequest } from './paymentRequest.model';

const createPaymentRequestService = async (payload: TPaymentRequest) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payload.amount * 100, // Stripe expects amount in cents
    currency: payload.currency,
    metadata: { integration_check: 'accept_a_payment' },
    receipt_email: payload.client_email,
  });

  // Create the payment request in the database
  const paymentRequest = new PaymentRequest({
    ...payload,
    status: {
      isCanceled: false,
      isCompleted: false,
      isProcessing: true,
    },
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });

  const result = await paymentRequest.save();

  return result;
};

const getClientSecretFromDb = async (id: string) => {
  // console.log(id);
  const paymentRequest = await PaymentRequest.findById(id);

  // console.log(paymentRequest);
  return paymentRequest;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const confirmPaymentIntoDb = async (query: any) => {
  const { payment_intent, payment_intent_client_secret } = query;

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  if (paymentIntent.status === 'succeeded') {
    const updateData = {
      status: {
        isCanceled: false,
        isCompleted: true,
        isProcessing: false,
      },
    };
    await PaymentRequest.findOneAndUpdate(
      {
        paymentIntentId: payment_intent,
        clientSecret: payment_intent_client_secret,
      },
      updateData,
      {
        new: true,
      },
    );
  } else {
    throw new AppError(400, 'Payment Has not been completed');
  }
};

export const PaymentRequestServices = {
  createPaymentRequestService,
  getClientSecretFromDb,
  confirmPaymentIntoDb,
};
