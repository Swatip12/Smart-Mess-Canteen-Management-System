export interface Payment {
  id?: number;
  student?: any;
  studentId?: number;
  amount?: number;
  type?: 'MESS_FEE' | 'CANTEEN_ORDER' | 'SUBSCRIPTION' | string;
  status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | string;
  transactionId?: string;
  paymentMethod?: string;
  paidAt?: string;
}
