import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { PaymentRequestServices } from './paymentRequest.services';

const createPaymentRequest = catchAsync(async (req, res) => {
  const payload = req.body;

  const result =
    await PaymentRequestServices.createPaymentRequestService(payload);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Payment Request Created SuccessFully',
    data: result,
  });
});
const getPaymentRequest = catchAsync(async (req, res) => {
  const payload = req.params.id;

  const result = await PaymentRequestServices.getClientSecretFromDb(payload);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Payment Request retrieved SuccessFully',
    data: result,
  });
});
const confirmPayment = catchAsync(async (req, res) => {
  const payload = req.query;

  await PaymentRequestServices.confirmPaymentIntoDb(payload);

  res.status(200).redirect(`${config.client_side_url}/payment-success`);
});
export const PaymentRequestController = {
  createPaymentRequest,
  getPaymentRequest,
  confirmPayment,
};
