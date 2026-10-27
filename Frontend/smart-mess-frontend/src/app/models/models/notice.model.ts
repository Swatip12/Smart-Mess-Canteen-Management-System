export interface Notice {
  id?: number;
  title: string;
  content?: string;
  type?: 'GENERAL' | 'URGENT' | 'MAINTENANCE' | 'HOLIDAY';
  admin?: any;
  validUntil?: string;
  isActive?: boolean;
  createdAt?: string;
}