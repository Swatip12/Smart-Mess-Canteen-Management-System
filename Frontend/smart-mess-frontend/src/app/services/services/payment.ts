import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../../models/models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  create(payment: Payment) {
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  update(id: number, payment: Payment) {
    return this.http.put<Payment>(
      `${this.apiUrl}/${id}`,
      payment
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}