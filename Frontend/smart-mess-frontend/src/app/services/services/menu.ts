import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../../models/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:8080/api/menus';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  create(menu: Menu) {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  update(id: number, menu: Menu) {
    return this.http.put<Menu>(
      `${this.apiUrl}/${id}`,
      menu
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getByMessAndDate(messId: number, date: string) {
    return this.http.get<Menu[]>(
      `${this.apiUrl}/mess/${messId}/date/${date}`
    );
  }
}