import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  student: any = {};
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isEditing: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadStudentProfile();
  }

  loadStudentProfile(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any>(`http://localhost:8080/api/students/${studentId}`).subscribe({
      next: (data) => {
        this.student = { ...data };
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading student profile:', error);
        this.errorMessage = 'Failed to load profile details';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.markForCheck();
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.loadStudentProfile();
  }

  updateProfile(): void {
    this.saveProfile();
  }

  saveProfile(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.markForCheck();

    this.http.put<any>(`http://localhost:8080/api/students/${studentId}`, this.student).subscribe({
      next: (response) => {
        this.student = { ...response };
        this.isEditing = false;
        this.loading = false;
        this.successMessage = 'Profile updated successfully!';
        localStorage.setItem('studentName', this.student.name || 'Student');
        this.cdr.markForCheck();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
