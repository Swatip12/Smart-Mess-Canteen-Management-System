import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemSetting } from '../../models/models/system-setting.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingService {
  private apiUrl = 'http://localhost:8080/api/settings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SystemSetting[]> {
    return this.http.get<SystemSetting[]>(this.apiUrl);
  }

  getByKey(key: string): Observable<SystemSetting> {
    return this.http.get<SystemSetting>(`${this.apiUrl}/${key}`);
  }

  saveOrUpdate(settingKey: string, settingValue: string, description?: string, category?: string): Observable<SystemSetting> {
    return this.http.post<SystemSetting>(this.apiUrl, { settingKey, settingValue, description, category });
  }
}
