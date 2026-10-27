export interface Student {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  rollNumber?: string;
  department?: string;
  hostelName?: string;
  roomNumber?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}
