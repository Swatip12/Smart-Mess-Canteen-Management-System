import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Canteen } from '../../models/models/canteen.model';

@Injectable({
  providedIn: 'root'
})
export class CanteenService {

  private apiUrl = 'http://localhost:8080/api/canteens';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Canteen[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Canteen>(`${this.apiUrl}/${id}`);
  }

  create(canteen: Canteen) {
    return this.http.post<Canteen>(this.apiUrl, canteen);
  }

  update(id: number, canteen: Canteen) {
    return this.http.put<Canteen>(
      `${this.apiUrl}/${id}`,
      canteen
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}