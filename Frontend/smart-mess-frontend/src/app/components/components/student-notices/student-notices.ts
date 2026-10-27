import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-notices.html',
  styleUrl: './student-notices.css'
})
export class StudentNotices {

  notices: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadNotices();
  }

  loadNotices(): void {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any[]>('http://localhost:8080/api/notices/active').subscribe({
      next: (data) => {
        this.notices = (data || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading notices:', error);
        this.errorMessage = 'Failed to load notices';
        this.notices = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getNoticeTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      'GENERAL': '#4caf50',
      'URGENT': '#f44336',
      'MAINTENANCE': '#ff9800',
      'HOLIDAY': '#2196f3'
    };
    return typeColors[type] || '#666';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isNoticeValid(validUntil: string): boolean {
    if (!validUntil) return true;
    return new Date(validUntil).getTime() >= new Date().getTime();
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
