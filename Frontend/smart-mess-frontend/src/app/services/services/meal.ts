import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal } from '../../models/models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Meal>(`${this.apiUrl}/${id}`);
  }

  create(meal: Meal) {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  update(id: number, meal: Meal) {
    return this.http.put<Meal>(
      `${this.apiUrl}/${id}`,
      meal
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}