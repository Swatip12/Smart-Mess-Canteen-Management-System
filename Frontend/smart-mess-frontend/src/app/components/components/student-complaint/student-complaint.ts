import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-complaint.html',
  styleUrl: './student-complaint.css'
})
export class StudentComplaint {

  title: string = '';
  description: string = '';
  category: string = 'FOOD';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  categories = [
    'FOOD',
    'SERVICE',
    'HYGIENE',
    'BILLING',
    'OTHER'
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  submitComplaint(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    if (!this.title || !this.description) {
      this.errorMessage = 'Please provide both title and description';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.markForCheck();

    const complaint = {
      studentId: Number(studentId),
      student: { id: Number(studentId) },
      title: this.title,
      description: this.description,
      category: this.category
    };

    this.http.post<any>('http://localhost:8080/api/complaints', complaint).subscribe({
      next: (response) => {
        this.successMessage = 'Your complaint has been filed. Administration will review it shortly.';
        this.title = '';
        this.description = '';
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 4000);
      },
      error: (error) => {
        console.error('Error submitting complaint:', error);
        this.errorMessage = error.error?.message || 'Failed to file complaint. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
