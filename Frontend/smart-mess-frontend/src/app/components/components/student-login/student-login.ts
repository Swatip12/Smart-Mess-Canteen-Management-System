import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './student-login.html',
  styleUrl: './student-login.css'
})
export class StudentLogin {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  fillDemoCredentials(): void {
    this.email = 'paliwalswati603@gmail.com';
    this.password = '123456';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your student email and password.';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.cdr.markForCheck();

    const credentials = {
      email: this.email.trim(),
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:8080/api/students/login',
      credentials
    )
    .subscribe({
      next: (response) => {
        console.log('STUDENT LOGIN SUCCESS:', response);

        const studentId = response.studentId || response.id || 1;
        const studentName = response.name || 'Student';

        localStorage.setItem('studentId', studentId.toString());
        localStorage.setItem('userRole', 'STUDENT');
        localStorage.setItem('studentName', studentName);
        localStorage.setItem('student', JSON.stringify({
          id: studentId,
          name: studentName,
          email: response.email,
          rollNumber: response.rollNumber,
          department: response.department,
          hostelName: response.hostelName,
          roomNumber: response.roomNumber
        }));

        this.loading = false;
        this.cdr.markForCheck();
        this.router.navigate(['/student-dashboard']);
      },
      error: (error) => {
        console.error('STUDENT LOGIN ERROR:', error);
        this.loading = false;
        if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Invalid email or password. Please verify your student credentials.';
        } else {
          this.errorMessage = 'Unable to reach backend service. Check if server is running on port 8080.';
        }
        this.cdr.markForCheck();
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/student-register']);
  }

  goToAdminLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
