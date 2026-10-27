import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-orders.html',
  styleUrl: './student-orders.css'
})
export class StudentOrders {

  orders: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadOrders();
  }

  loadOrders(): void {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      this.router.navigate(['/student-login']);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.http.get<any[]>(`http://localhost:8080/api/orders/student/${studentId}`).subscribe({
      next: (data) => {
        this.orders = (data || []).sort((a, b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime());
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.errorMessage = 'Failed to load order history';
        this.orders = [];
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      'PENDING': '#ffa500',
      'CONFIRMED': '#4caf50',
      'PREPARING': '#17a2b8',
      'READY': '#2196f3',
      'DELIVERED': '#9c27b0',
      'CANCELLED': '#f44336'
    };
    return statusColors[status] || '#666';
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

  cancelOrder(orderId: number): void {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    const studentId = localStorage.getItem('studentId');
    this.http.put(`http://localhost:8080/api/orders/${orderId}/cancel?studentId=${studentId}`, {}).subscribe({
      next: () => {
        alert('Order cancelled successfully.');
        this.loadOrders();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to cancel order. Only PENDING orders can be cancelled.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/student-dashboard']);
  }
}
