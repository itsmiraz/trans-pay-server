import { Router } from 'express';
import { PaymentRequestRoutes } from '../modules/paymentRequest/paymentRequest.route';

const router = Router();

const ModuleRoutes = [
  {
    path: '/payment-request',
    route: PaymentRequestRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
