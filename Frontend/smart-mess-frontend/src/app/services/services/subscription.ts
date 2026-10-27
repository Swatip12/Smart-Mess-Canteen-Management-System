import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from '../../models/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`);
  }

  create(subscription: Subscription) {
    return this.http.post<Subscription>(
      this.apiUrl,
      subscription
    );
  }

  update(id: number, subscription: Subscription) {
    return this.http.put<Subscription>(
      `${this.apiUrl}/${id}`,
      subscription
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}