import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodOrder } from '../../models/models/food-order.model';

@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<FoodOrder[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<FoodOrder>(`${this.apiUrl}/${id}`);
  }

  create(order: FoodOrder) {
    return this.http.post<FoodOrder>(this.apiUrl, order);
  }

  update(id: number, order: FoodOrder) {
    return this.http.put<FoodOrder>(
      `${this.apiUrl}/${id}`,
      order
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getByStudent(studentId: number) {
    return this.http.get<FoodOrder[]>(
      `${this.apiUrl}/student/${studentId}`
    );
  }

  updateStatus(id: number, status: string) {
    return this.http.put<FoodOrder>(
      `${this.apiUrl}/${id}/status?status=${status}`,
      {}
    );
  }
}