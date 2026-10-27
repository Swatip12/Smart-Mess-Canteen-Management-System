import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SubscriptionService } from '../../../services/services/subscription';
import { MessService } from '../../../services/services/mess';
import { Subscription } from '../../../models/models/subscription.model';
import { Mess } from '../../../models/models/mess.model';

@Component({
  selector: 'app-student-subscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-subscription.html',
  styleUrl: './student-subscription.css'
})
export class StudentSubscription implements OnInit {
  studentName = '';
  studentEmail = '';
  studentId: number | null = null;

  mySubscriptions: Subscription[] = [];
  activeSubscription: Subscription | null = null;
  messes: Mess[] = [];

  showRenewModal = false;
  renewForm: FormGroup;
  isSubmitting = false;
  message = '';
  messageType = 'success';

  constructor(
    private subscriptionService: SubscriptionService,
    private messService: MessService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.renewForm = this.fb.group({
      messId: ['', Validators.required],
      plan: ['MONTHLY', Validators.required],
      amount: [3000, [Validators.required, Validators.min(100)]]
    });
  }

  ngOnInit(): void {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      try {
        const student = JSON.parse(studentData);
        this.studentName = student.name || 'Student';
        this.studentEmail = student.email || '';
        this.studentId = student.id || null;
      } catch (e) {
        console.error('Error parsing student session', e);
      }
    } else {
      const rawId = localStorage.getItem('studentId');
      if (rawId) {
        this.studentId = parseInt(rawId, 10);
      }
    }

    this.loadMesses();
    this.loadSubscriptions();
  }

  loadMesses(): void {
    this.messService.getAll().subscribe({
      next: (data: Mess[]) => {
        this.messes = data || [];
        this.cdr.markForCheck();
      },
      error: (err: any) => console.error('Error loading messes:', err)
    });
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAll().subscribe({
      next: (subs: Subscription[]) => {
        if (this.studentId) {
          this.mySubscriptions = (subs || []).filter((s: Subscription) => {
            const sId = s.student?.id || s.studentId;
            return sId === this.studentId;
          });
        } else {
          this.mySubscriptions = subs || [];
        }

        this.activeSubscription =
          this.mySubscriptions.find((s: Subscription) => s.status === 'ACTIVE') || null;
        this.cdr.markForCheck();
      },
      error: (err: any) => console.error('Error loading subscriptions:', err)
    });
  }

  onPlanChange(event: any): void {
    const plan = event.target.value;
    if (plan === 'MONTHLY') {
      this.renewForm.patchValue({ amount: 3000 });
    } else if (plan === 'QUARTERLY') {
      this.renewForm.patchValue({ amount: 8500 });
    } else if (plan === 'ANNUAL') {
      this.renewForm.patchValue({ amount: 32000 });
    } else {
      this.renewForm.patchValue({ amount: 1000 });
    }
  }

  openRenewModal(): void {
    this.showRenewModal = true;
    this.message = '';
    if (this.messes.length > 0) {
      this.renewForm.patchValue({ messId: this.messes[0].id });
    }
    this.cdr.markForCheck();
  }

  closeRenewModal(): void {
    this.showRenewModal = false;
    this.cdr.markForCheck();
  }

  logout(): void {
    localStorage.removeItem('studentId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentName');
    localStorage.removeItem('student');
    this.router.navigate(['/student-login']);
  }

  submitSubscription(): void {
    this.submitRenew();
  }

  submitRenew(): void {
    if (this.renewForm.invalid || !this.studentId) return;

    this.isSubmitting = true;
    this.message = '';
    this.cdr.markForCheck();

    const formVal = this.renewForm.value;
    const now = new Date();
    const startDate = now.toISOString().split('T')[0];

    const endDateObj = new Date(now);
    if (formVal.plan === 'MONTHLY') {
      endDateObj.setDate(endDateObj.getDate() + 30);
    } else if (formVal.plan === 'QUARTERLY') {
      endDateObj.setDate(endDateObj.getDate() + 90);
    } else if (formVal.plan === 'ANNUAL') {
      endDateObj.setDate(endDateObj.getDate() + 365);
    } else {
      endDateObj.setDate(endDateObj.getDate() + 7);
    }
    const endDate = endDateObj.toISOString().split('T')[0];

    const newSub: any = {
      studentId: this.studentId,
      messId: Number(formVal.messId),
      plan: formVal.plan,
      amount: formVal.amount,
      startDate: startDate,
      endDate: endDate,
      status: 'ACTIVE'
    };

    this.subscriptionService.create(newSub).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.message = 'Subscription successfully activated!';
        this.messageType = 'success';
        this.closeRenewModal();
        this.loadSubscriptions();
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.message = err.error?.message || 'Failed to process subscription.';
        this.messageType = 'danger';
        this.cdr.markForCheck();
      }
    });
  }
}
