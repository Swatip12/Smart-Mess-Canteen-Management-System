import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-attendance.html',
  styleUrl: './student-attendance.css'
})
export class StudentAttendance implements OnInit {

  attendance: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any[]>(`http://localhost:8080/api/attendance`).subscribe({
      next: (data) => {
        const sId = parseInt(studentId);
        this.attendance = (data || [])
          .filter(a => a.studentId === sId || a.student?.id === sId)
          .sort((a, b) => new Date(b.attendanceDate).getTime() - new Date(a.attendanceDate).getTime());
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
        this.errorMessage = 'Failed to load attendance records';
        this.attendance = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getPresentCount(): number {
    return this.attendance.filter(a => a.isPresent).length;
  }

  getAbsentCount(): number {
    return this.attendance.filter(a => !a.isPresent).length;
  }

  getAttendancePercentage(): number {
    if (this.attendance.length === 0) return 0;
    return Math.round((this.getPresentCount() / this.attendance.length) * 100);
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
