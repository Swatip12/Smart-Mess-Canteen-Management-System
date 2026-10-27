import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendance } from '../../models/models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`);
  }

  create(attendance: Attendance) {
    return this.http.post<Attendance>(
      this.apiUrl,
      attendance
    );
  }

  update(id: number, attendance: Attendance) {
    return this.http.put<Attendance>(
      `${this.apiUrl}/${id}`,
      attendance
    );
  }

  delete(id: number) {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  getByStudentAndDateRange(
    studentId: number,
    from: string,
    to: string
  ) {
    return this.http.get<Attendance[]>(
      `${this.apiUrl}/student/${studentId}/range?from=${from}&to=${to}`
    );
  }

  countPresentByStudentAndMonth(
    studentId: number,
    month: number,
    year: number
  ) {
    return this.http.get<number>(
      `${this.apiUrl}/student/${studentId}/count?month=${month}&year=${year}`
    );
  }
}