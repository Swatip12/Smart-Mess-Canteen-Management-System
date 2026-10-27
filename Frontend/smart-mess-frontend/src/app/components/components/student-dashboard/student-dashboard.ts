import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit {

  studentId: string | null = null;
  studentName: string = 'Student';
  studentRoll: string = '';
  activePlan: string = 'No Active Plan';
  totalOrders: number = 0;
  attendancePresent: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.studentId = localStorage.getItem('studentId');
    if (!this.studentId) {
      this.router.navigate(['/student-login']);
    } else {
      this.studentName = localStorage.getItem('studentName') || 'Student';
      const stored = localStorage.getItem('student');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          this.studentRoll = parsed.rollNumber || '';
        } catch (_) {}
      }
    }
  }

  ngOnInit(): void {
    if (this.studentId) {
      this.loadStudentSummary();
    }
  }

  loadStudentSummary(): void {
    const sId = parseInt(this.studentId!);

    // Load active subscription
    this.http.get<any[]>('http://localhost:8080/api/subscriptions').subscribe({
      next: (subs) => {
        const myActive = subs.find(s => (s.studentId === sId || s.student?.id === sId) && s.status === 'ACTIVE');
        if (myActive) {
          this.activePlan = `${myActive.plan || 'MONTHLY'} Pass`;
        }
        this.cdr.markForCheck();
      },
      error: () => {}
    });

    // Load student orders count
    this.http.get<any[]>(`http://localhost:8080/api/orders/student/${sId}`).subscribe({
      next: (orders) => {
        this.totalOrders = orders.length;
        this.cdr.markForCheck();
      },
      error: () => {}
    });

    // Load student attendance
    this.http.get<any[]>('http://localhost:8080/api/attendance').subscribe({
      next: (records) => {
        const myRecords = records.filter(a => a.studentId === sId || a.student?.id === sId);
        this.attendancePresent = myRecords.filter(a => a.isPresent).length;
        this.cdr.markForCheck();
      },
      error: () => {}
    });
  }

  logout(): void {
    localStorage.removeItem('studentId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentName');
    localStorage.removeItem('student');
    this.router.navigate(['/student-login']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
