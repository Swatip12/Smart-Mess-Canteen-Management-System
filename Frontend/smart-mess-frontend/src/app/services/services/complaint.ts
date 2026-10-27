import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Complaint } from '../../models/models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = 'http://localhost:8080/api/complaints';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Complaint[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }

  create(complaint: Complaint) {
    return this.http.post<Complaint>(
      this.apiUrl,
      complaint
    );
  }

  update(id: number, complaint: Complaint) {
    return this.http.put<Complaint>(
      `${this.apiUrl}/${id}`,
      complaint
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getByStatus(status: string) {
    return this.http.get<Complaint[]>(
      `${this.apiUrl}/status?status=${status}`
    );
  }

  resolve(id: number, resolution: string) {
    return this.http.put<Complaint>(
      `${this.apiUrl}/${id}/resolve?resolution=${encodeURIComponent(resolution)}`,
      {}
    );
  }
}