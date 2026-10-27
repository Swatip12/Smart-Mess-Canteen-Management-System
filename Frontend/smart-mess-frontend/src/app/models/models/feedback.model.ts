export interface Feedback {
  id?: number;
  student?: any;
  studentId?: number;
  mess?: any;
  messId?: number;
  rating?: number;
  comment?: string;
  category?: 'FOOD_QUALITY' | 'CLEANLINESS' | 'SERVICE' | 'TIMING' | string;
  createdAt?: string;
}
