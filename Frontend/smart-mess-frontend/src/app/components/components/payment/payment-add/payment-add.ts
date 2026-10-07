import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PaymentService } from '../../../../services/services/payment';
import { Payment } from '../../../../models/models/payment.model';

@Component({
  selector: 'app-payment-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-add.html',
  styleUrl: './payment-add.css'
})
export class PaymentAdd implements OnInit {

  paymentForm: FormGroup;

  paymentTypes: Array<'MESS_FEE' | 'CANTEEN_ORDER' | 'SUBSCRIPTION'> = [
    'MESS_FEE',
    'CANTEEN_ORDER',
    'SUBSCRIPTION'
  ];

  paymentStatuses: Array<'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'> = [
    'PENDING',
    'COMPLETED',
    'FAILED',
    'REFUNDED'
  ];

  paymentMethods: string[] = ['UPI', 'CASH', 'DEBIT_CARD', 'NET_BANKING'];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    const today = new Date().toISOString().substring(0, 10);

    this.paymentForm = this.fb.group({
      studentId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      type: ['MESS_FEE', Validators.required],
      status: ['COMPLETED', Validators.required],
      transactionId: [''],
      paymentMethod: ['UPI', Validators.required],
      paidAt: [today, Validators.required]
    });
  }

  ngOnInit(): void {}

  addPayment(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const formVal = this.paymentForm.value;

    const paymentPayload: Payment = {
      student: { id: formVal.studentId },
      amount: formVal.amount,
      type: formVal.type,
      status: formVal.status,
      transactionId: formVal.transactionId,
      paymentMethod: formVal.paymentMethod,
      paidAt: formVal.paidAt
    };

    this.paymentService.create(paymentPayload).subscribe({
      next: () => {
        alert('Payment recorded successfully!');
        this.router.navigate(['/payments']);
      },
      error: (error: any) => {
        console.error('Error creating payment:', error);
        alert('Failed to record payment.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/payments']);
  }
}