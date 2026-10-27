import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  // GET ALL STUDENTS
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // GET STUDENT BY ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // ADD STUDENT
  create(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  // UPDATE STUDENT
  update(id: number, student: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      student
    );
  }

  // DELETE STUDENT
  delete(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${id}`
    );
  }

}