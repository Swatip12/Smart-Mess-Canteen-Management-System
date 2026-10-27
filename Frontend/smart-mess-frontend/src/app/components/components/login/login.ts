import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

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
    this.email = 'admin@smartmess.com';
    this.password = 'admin123';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both your email address and password.';
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
      'http://localhost:8080/api/admins/login',
      credentials
    )
    .subscribe({
      next: (response) => {
        console.log('LOGIN SUCCESS:', response);
        const adminId = response.adminId || response.id || 1;
        const adminName = response.name || 'Admin';
        localStorage.setItem('adminId', adminId.toString());
        localStorage.setItem('userRole', 'ADMIN');
        localStorage.setItem('adminName', adminName);
        this.loading = false;
        this.cdr.markForCheck();
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('LOGIN ERROR:', error);
        this.loading = false;
        if (error.status === 401 || error.status === 400) {
          this.errorMessage = 'Invalid email or password. Please verify your credentials.';
        } else {
          this.errorMessage = 'Unable to reach backend service. Check if Spring Boot is running on port 8080.';
        }
        this.cdr.markForCheck();
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToStudentLogin(): void {
    this.router.navigate(['/student-login']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
