import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-register.html',
  styleUrl: './student-register.css'
})
export class StudentRegister {

  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  rollNumber: string = '';
  department: string = '';
  hostelName: string = '';
  roomNumber: string = '';

  loading: boolean = false;
  errorMessage: string = '';

  private apiUrl = 'http://localhost:8080/api/students/register';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  register(): void {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill all required fields (Name, Email, and Password).';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    const student = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      phone: this.phone.trim(),
      rollNumber: this.rollNumber.trim(),
      department: this.department.trim(),
      hostelName: this.hostelName.trim(),
      roomNumber: this.roomNumber.trim(),
      status: 'ACTIVE'
    };

    this.http.post<any>(
      this.apiUrl,
      student
    ).subscribe({
      next: (response) => {
        console.log('STUDENT REGISTER SUCCESS:', response);
        this.loading = false;
        this.cdr.markForCheck();
        alert('Student registration successful! Please login with your credentials.');
        this.router.navigate(['/student-login']);
      },
      error: (error) => {
        console.error('STUDENT REGISTER ERROR:', error);
        this.loading = false;
        if (error.status === 409) {
          this.errorMessage = 'This email is already registered. Please login instead.';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Please provide valid registration details.';
        } else {
          this.errorMessage = 'Unable to reach backend service. Please check connection.';
        }
        this.cdr.markForCheck();
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/student-login']);
  }

  goToAdminRegister(): void {
    this.router.navigate(['/register']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
