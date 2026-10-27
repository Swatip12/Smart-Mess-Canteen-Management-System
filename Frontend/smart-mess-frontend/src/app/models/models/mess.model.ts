export interface Mess {
  id?: number;
  name: string;
  location?: string;
  contactNumber?: string;
  capacity?: number;
  type?: 'VEG' | 'NON_VEG' | 'BOTH';
  admin?: any;
  createdAt?: string;
}