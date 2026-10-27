import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../../models/models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:8080/api/feedbacks';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`);
  }

  create(feedback: Feedback) {
    return this.http.post<Feedback>(
      this.apiUrl,
      feedback
    );
  }

  update(id: number, feedback: Feedback) {
    return this.http.put<Feedback>(
      `${this.apiUrl}/${id}`,
      feedback
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}