import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  role: string = 'ADMIN';

  loading: boolean = false;
  errorMessage: string = '';

  private apiUrl = 'http://localhost:8080/api/admins/register';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(): void {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.loading = true;

    const admin = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
      role: this.role
    };

    this.http.post<any>(
      this.apiUrl,
      admin
    ).subscribe({
      next: (response) => {
        console.log('REGISTER SUCCESS:', response);
        this.loading = false;
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('REGISTER ERROR:', error);
        this.loading = false;
        if (error.status === 409) {
          this.errorMessage = 'Email already registered. Please login.';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Please enter valid details.';
        } else {
          this.errorMessage = 'Unable to connect to server.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
