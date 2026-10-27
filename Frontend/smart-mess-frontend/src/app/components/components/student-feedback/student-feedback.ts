import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-feedback.html',
  styleUrl: './student-feedback.css'
})
export class StudentFeedback {

  messes: any[] = [];
  selectedMess: number | null = null;
  rating: number = 5;
  comment: string = '';
  category: string = 'FOOD_QUALITY';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  categories = [
    'FOOD_QUALITY',
    'CLEANLINESS',
    'SERVICE',
    'TIMING'
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadMesses();
  }

  loadMesses(): void {
    this.http.get<any[]>('http://localhost:8080/api/messes').subscribe({
      next: (data) => {
        this.messes = data || [];
        if (this.messes.length > 0) {
          this.selectedMess = this.messes[0].id;
        }
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading messes:', error);
        this.errorMessage = 'Failed to load mess information';
        this.cdr.markForCheck();
      }
    });
  }

  setRating(rating: number): void {
    this.rating = rating;
    this.cdr.markForCheck();
  }

  submitFeedback(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    if (!this.comment) {
      this.errorMessage = 'Please provide a comment for your feedback';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.markForCheck();

    const feedback = {
      studentId: Number(studentId),
      student: { id: Number(studentId) },
      messId: Number(this.selectedMess),
      mess: { id: Number(this.selectedMess) },
      rating: this.rating,
      comments: this.comment,
      category: this.category
    };

    this.http.post<any>('http://localhost:8080/api/feedbacks', feedback).subscribe({
      next: (response) => {
        this.successMessage = 'Thank you! Your feedback has been submitted successfully.';
        this.comment = '';
        this.rating = 5;
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (error) => {
        console.error('Error submitting feedback:', error);
        this.errorMessage = error.error?.message || 'Failed to submit feedback. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
