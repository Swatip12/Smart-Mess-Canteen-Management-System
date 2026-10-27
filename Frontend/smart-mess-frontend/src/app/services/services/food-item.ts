import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodItem } from '../../models/models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  private apiUrl = 'http://localhost:8080/api/food-items';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<FoodItem[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<FoodItem>(`${this.apiUrl}/${id}`);
  }

  create(foodItem: FoodItem) {
    return this.http.post<FoodItem>(this.apiUrl, foodItem);
  }

  update(id: number, foodItem: FoodItem) {
    return this.http.put<FoodItem>(
      `${this.apiUrl}/${id}`,
      foodItem
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getAvailableByCanteen(canteenId: number) {
    return this.http.get<FoodItem[]>(
      `${this.apiUrl}/canteen/${canteenId}/available`
    );
  }
}