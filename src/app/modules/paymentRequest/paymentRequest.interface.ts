export interface TPaymentRequest {
  user_id: number;
  user_email: string;
  user_name: string;
  amount: number;
  client_name: string;
  client_email: string;
  currency: string;
  status: {
    isCanceled: boolean;
    isCompleted: boolean;
    isProcessing: boolean;
  };
  client_country: string;
  paymentIntentId: string;
  clientSecret: string;
}
