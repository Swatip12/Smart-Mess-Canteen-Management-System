import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from '../../../../models/models/subscription.model';
import { SubscriptionService } from '../../../../services/services/subscription';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.css'
})
export class SubscriptionList implements OnInit {

  subscriptions: Subscription[] = [];
  loading: boolean = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.subscriptionService.getAll().subscribe({
      next: (data: Subscription[]) => {
        this.subscriptions = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading subscriptions:', error);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  addSubscription(): void {
    this.router.navigate(['/subscriptions/add']);
  }
}
