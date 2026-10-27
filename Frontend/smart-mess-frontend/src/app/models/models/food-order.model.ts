export interface FoodOrder {
  id?: number;
  student?: any;
  studentId?: number;
  canteen?: any;
  canteenId?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED' | string;
  totalAmount?: number;
  orderedAt?: string;
  orderItems?: any[];
}
