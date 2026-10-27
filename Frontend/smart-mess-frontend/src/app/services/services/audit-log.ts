import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditLog } from '../../models/models/audit-log.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'http://localhost:8080/api/audit-logs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }

  getByEntity(entityName: string, entityId: number): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiUrl}/entity/${entityName}/${entityId}`);
  }
}
