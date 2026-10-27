import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Payment } from '../../../../models/models/payment.model';
import { PaymentService } from '../../../../services/services/payment';
import { ReportService } from '../../../../services/services/report';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-list.html',
  styleUrl: './payment-list.css'
})
export class PaymentList implements OnInit {

  payments: Payment[] = [];
  filteredPayments: Payment[] = [];

  selectedStudent: string = 'ALL';
  selectedStatus: string = 'ALL';

  students: any[] = [];

  statuses: string[] = [
    'PENDING',
    'COMPLETED',
    'FAILED',
    'REFUNDED'
  ];

  constructor(
    private paymentService: PaymentService,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAll().subscribe({
      next: (data: Payment[]) => {
        this.payments = (data || []).sort((a, b) => (b.id || 0) - (a.id || 0));
        this.filteredPayments = this.payments;
        this.loadStudents();
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading payments:', error);
        this.cdr.markForCheck();
      }
    });
  }

  loadStudents(): void {
    const map = new Map();
    this.payments.forEach(p => {
      if (p.student && p.student.id) {
        map.set(p.student.id, p.student);
      }
    });
    this.students = Array.from(map.values());
    this.cdr.markForCheck();
  }

  filterPayments(): void {
    let result = this.payments;

    if (this.selectedStudent !== 'ALL') {
      result = result.filter(p => p.student?.id === Number(this.selectedStudent));
    }

    if (this.selectedStatus !== 'ALL') {
      result = result.filter(p => p.status === this.selectedStatus);
    }

    this.filteredPayments = result;
    this.cdr.markForCheck();
  }

  exportCsv(): void {
    this.reportService.downloadPaymentsCsv().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payments_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Failed to download CSV')
    });
  }
}
