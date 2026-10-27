import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mess } from '../../models/models/mess.model';

@Injectable({
  providedIn: 'root'
})
export class MessService {

  private apiUrl = 'http://localhost:8080/api/messes';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Mess[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Mess>(`${this.apiUrl}/${id}`);
  }

  create(mess: Mess) {
    return this.http.post<Mess>(this.apiUrl, mess);
  }

  update(id: number, mess: Mess) {
    return this.http.put<Mess>(
      `${this.apiUrl}/${id}`,
      mess
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}