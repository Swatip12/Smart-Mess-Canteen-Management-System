import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getDashboardSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard-summary`);
  }

  downloadPaymentsCsv(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/csv/payments`, { responseType: 'blob' });
  }

  downloadOrdersCsv(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/csv/orders`, { responseType: 'blob' });
  }
}
