export interface FoodItem {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category?: 'VEG' | 'NON_VEG' | 'BEVERAGE' | 'SNACK' | string;
  isAvailable?: boolean;
  imageUrl?: string;
  canteen?: any;
  canteenId?: number;
}
