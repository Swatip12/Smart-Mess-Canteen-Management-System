import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notice } from '../../models/models/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private apiUrl = 'http://localhost:8080/api/notices';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Notice[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Notice>(`${this.apiUrl}/${id}`);
  }

  create(notice: Notice) {
    return this.http.post<Notice>(
      this.apiUrl,
      notice
    );
  }

  update(id: number, notice: Notice) {
    return this.http.put<Notice>(
      `${this.apiUrl}/${id}`,
      notice
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getActiveNotices() {
    return this.http.get<Notice[]>(
      `${this.apiUrl}/active`
    );
  }

  getByType(type: string) {
    return this.http.get<Notice[]>(
      `${this.apiUrl}/type?type=${type}`
    );
  }
}