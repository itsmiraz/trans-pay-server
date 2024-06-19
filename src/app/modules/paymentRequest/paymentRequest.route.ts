import { Router } from 'express';
import { PaymentRequestController } from './paymentRequest.controllers';

const router = Router();

router.post(
  '/create-payment-request',
  PaymentRequestController.createPaymentRequest,
);
router.get('/payment-intent/:id', PaymentRequestController.getPaymentRequest);
router.get('/payment-success', PaymentRequestController.confirmPayment);

export const PaymentRequestRoutes = router;
