export interface Complaint {
  id?: number;
  student?: any;
  studentId?: number;
  title: string;
  description?: string;
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | string;
  category?: 'FOOD' | 'SERVICE' | 'HYGIENE' | 'BILLING' | 'OTHER' | string;
  resolution?: string;
  createdAt?: string;
  resolvedAt?: string;
}
