export interface Subscription {
  id?: number;
  student?: any;
  studentId?: number;
  mess?: any;
  messId?: number;
  startDate?: string;
  endDate?: string;
  plan?: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | string;
  status?: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | string;
  amount?: number;
  createdAt?: string;
}
